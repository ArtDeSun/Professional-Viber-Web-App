import connectDB from "@/lib/db";
import "@/lib/models";
import { Board, Column, JobApplication } from "@/lib/models";

// Update userId from MongoDB Atlas as needed
const USER_ID = "6a34509488eb8601635ea085";

const ADDITIONAL_JOB_COUNT = 13;

const SAMPLE_JOBS = [
  {
    company: "Test Company 1",
    position: "Test Position 1",
    location: "Test Location 1",
    tags: ["tag1"],
    description: "Test Description 1",
    jobUrl: "https://example.com/jobs/1",
    salary: "$100k",
  },
  {
    company: "Test Company 2",
    position: "Test Position 2",
    location: "Test Location 2",
    tags: ["tag1", "tags2"],
    description: "Test Description 2",
    jobUrl: "https://example.com/jobs/2",
    salary: "$150k",
  },
];

const additionalJobs = Array.from({ length: ADDITIONAL_JOB_COUNT }, (_, i) => {
  const jobNumber = i + SAMPLE_JOBS.length + 1;

  return {
    company: `Test Company ${jobNumber}`,
    position: `Test Position ${jobNumber}`,
    location: `Test Location ${jobNumber}`,
    tags: Array.from(
      { length: jobNumber },
      (_, tagIndex) => `tag${tagIndex + 1}`,
    ),
    description: `Test Description ${jobNumber}`,
    jobUrl: `https://example.com/jobs/${jobNumber}`,
    salary: `$${100 + (jobNumber - 1) * 50}k`,
  };
});

SAMPLE_JOBS.push(...additionalJobs);

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ Error: SEED_USER_ID environment variable is required");
    console.log("Usage: SEED_USER_ID=your-user-id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🌱 Starting seed process...");
    console.log(`📋 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️  Board not found. Creating board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Board created");
    } else {
      console.log("✅ Board found");
    }

    // Get all columns
    const columns = await Column.find({ boardId: board._id }).sort({
      order: 1,
    });

    /* for (const column of columns) {
      if (!column.userId) {
        column.userId = USER_ID;
        await column.save();
      }
    } */

    console.log(`✅ Found ${columns.length} columns`);

    if (columns.length === 0) {
      // Create default columns
      const defaultColumns = await Promise.all(
        DEFAULT_COLUMNS.map((col) =>
          Column.create({
            name: col.name,
            order: col.order,
            userId: USER_ID,
            boardId: board._id,
            jobApplications: [],
          }),
        ),
      );
      board.columns = defaultColumns.map((col) => col._id);
      await board.save();

      /* console.error(
        "❌ No columns found. Please ensure the board has default columns.",
      );
      process.exit(1); */
    }

    // Map column names to column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingJobs.length} existing job applications...`,
      );
      await JobApplication.deleteMany({ userId: USER_ID });

      /* await Column.updateMany(
        { boardId: board._id }, //or { userId: USER_ID },
        {
          $set: {
            jobApplications: [],
          },
        },
      ); */

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs evenly across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "Wish List": SAMPLE_JOBS.slice(0, 3),
      Applied: SAMPLE_JOBS.slice(3, 6),
      Interviewing: SAMPLE_JOBS.slice(6, 9),
      Offer: SAMPLE_JOBS.slice(9, 12),
      Rejected: SAMPLE_JOBS.slice(12, 15),
    };

    let totalCreated = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      //First method
      const columnId = columnMap[columnName];
      if (!columnId) {
        console.warn(`⚠️  Column "${columnName}" not found, skipping...`);
        continue;
      }

      //Second method: Might be redundant
      const column = columns.find((c) => c.name === columnName);
      if (!column) continue;

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          tags: jobData.tags,
          description: jobData.description,
          jobUrl: jobData.jobUrl,
          salary: jobData.salary,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: columnName.toLowerCase().replace(" ", "-"),
          order: i * 100,
        });

        column.jobApplications.push(jobApplication._id);
        totalCreated++;
      }

      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to "${columnName}" column`);
    }

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`📊 Created ${totalCreated} job applications`);
    console.log(`📋 Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
