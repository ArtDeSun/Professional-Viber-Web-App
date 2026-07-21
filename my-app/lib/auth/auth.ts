import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { initializeUserBoard } from "../init-user-board";

const client = new MongoClient(process.env.MONGODB_URI!);

//Avoid hardcoding in the future: MONGODB_DB_NAME
//process.env.MONGODB_DB_NAME
const db = client.db("job-board");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  database: mongodbAdapter(db, { client }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      /* mapProfileToUser: (profile) => ({
        email: profile.email ?? `facebook-${profile.id}@placeholder.local`,
      }), */
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id, {
              name: user.name,
              email: user.email,
            });
          }
        },
      },
    },
  },
});

export async function getSession() {
  const result = await auth.api.getSession({ headers: await headers() });

  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({ headers: await headers() });
  /* if (result.success) {
    redirect("/sign-in");
  } */
}
