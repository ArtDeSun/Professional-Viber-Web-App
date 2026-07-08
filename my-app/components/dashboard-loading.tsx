// components/dashboard-loading.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MoreVertical, Plus } from "lucide-react";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md bg-neutral-800
        before:absolute before:inset-y-0 before:left-[-45%]
        before:w-[45%]
        before:skew-x-[-18deg]
        before:animate-shimmer
        before:bg-gradient-to-r
        before:from-transparent before:via-neutral-600/35 before:to-transparent
        ${className}
      `}
    />
  );
}

function JobApplicationCardSkeleton() {
  return (
    <Card className="bg-neutral-900 py-5 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <SkeletonBox className="mb-1 h-5 w-36" />
            <SkeletonBox className="mb-2 h-4 w-28" />
            <SkeletonBox className="mb-2 h-4 w-32" />

            <div className="mb-2 flex flex-wrap gap-1">
              <SkeletonBox className="h-5 w-10 rounded-full" />
              <SkeletonBox className="h-5 w-12 rounded-full" />
              <SkeletonBox className="h-5 w-10 rounded-full" />
            </div>

            <SkeletonBox className="mt-1 h-3 w-3" />
          </div>

          <Button
            size="icon"
            className="h-6 w-6 bg-neutral-800 hover:bg-neutral-800"
          >
            <MoreVertical className="h-4 w-4 text-neutral-700" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ColumnSkeleton({ color }: { color: string }) {
  return (
    <Card className="min-w-[300px] flex-shrink-0 overflow-hidden rounded-b-lg bg-neutral-950 p-0 shadow-md">
      <CardHeader className={`${color} pb-3 pt-3 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* real icon: h-4 w-4 */}
            <Calendar className="h-4 w-4 text-white/45" />

            {/* real CardTitle: text-base = 16px font, 24px line-height */}
            <CardTitle className="text-base font-semibold">
              <SkeletonBox className="h-6 w-24 bg-white/25 before:via-white/20" />
            </CardTitle>
          </div>

          {/* real column menu button: h-6 w-6 */}
          <Button size="icon" className="h-6 w-6 bg-white/10 hover:bg-white/10">
            <MoreVertical className="h-4 w-4 text-white/35" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="min-h-[400px] space-y-2 bg-neutral-950/90 pt-4">
        <JobApplicationCardSkeleton />
        <JobApplicationCardSkeleton />
        <JobApplicationCardSkeleton />

        {/* real Add Job button classes copied from CreateJobApplicationDialog */}
        <Button
          variant="outline"
          className="
            w-full
            justify-start
            border-2
            border-dashed
            border-neutral-700
            bg-neutral-900
            hover:border-neutral-700
            hover:bg-neutral-900
          "
        >
          <Plus className="mr-2 h-4 w-4 text-neutral-500" />
          <SkeletonBox className="h-5 w-16 bg-neutral-700 before:via-neutral-400/40" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  const colors = [
    "bg-cyan-500/35",
    "bg-purple-500/35",
    "bg-green-500/35",
    "bg-yellow-500/35",
    "bg-red-500/35",
  ];

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">Loading ...</h1>

          {/* Track Your Applications */}
          <SkeletonBox className="mt-2 h-5 w-48" />
        </div>

        <div className="flex items-end">
          {/* Dialog Trigger */}
          <Button className="bg-neutral-800">
            <Plus className="h-4 w-4 text-neutral-500" />
            <SkeletonBox className="h-4 w-24" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-hidden pb-4">
        {colors.map((color, index) => (
          <ColumnSkeleton key={index} color={color} />
        ))}
      </div>
    </div>
  );
}
