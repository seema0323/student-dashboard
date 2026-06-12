import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import CourseCard from "@/components/CourseCard";
import ActivityTile from "@/components/ActivityTile";
import HeroTile from "@/components/HeroTile";
import { Suspense } from "react";
import {
  HeroSkeleton,
  CourseSkeleton,
  ActivitySkeleton,
} from "@/components/Skeletons";
import { Course } from "@/types";

async function CoursesList() {
  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return (
        <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-red-800/30 bg-red-950/20 p-6">
          <p className="text-red-400">
            Failed to load courses. Please try again later.
          </p>
        </div>
      );
    }

    if (!courses || courses.length === 0) {
      return (
        <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <p className="text-zinc-400">
            No courses available yet. Check back soon!
          </p>
        </div>
      );
    }

    return (
      <>
        {courses.map((course: Course, index: number) => (
          <CourseCard key={course.id} course={course} index={index + 1} />
        ))}
      </>
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-red-800/30 bg-red-950/20 p-6">
        <p className="text-red-400">
          An unexpected error occurred. Please refresh the page.
        </p>
      </div>
    );
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-zinc-400">Welcome to your learning journey</p>
          </div>

          {/* Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-max">
            {/* Hero Tile - Spans 2x2 */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
              <Suspense fallback={<HeroSkeleton />}>
                <HeroTile index={0} />
              </Suspense>
            </div>

            {/* Course Cards */}
            <Suspense fallback={<>
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
            </>}>
              <CoursesList />
            </Suspense>

            {/* Activity Tile - Spans 2x2 */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
              <Suspense fallback={<ActivitySkeleton />}>
                <ActivityTile />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}