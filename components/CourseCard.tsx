"use client";

import { motion, type Variants } from "framer-motion";
import { Course } from "@/types";
import * as Icons from "lucide-react";
import { useMemo } from "react";

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  // Dynamically get icon from lucide-react
  const Icon = useMemo(() => {
    const iconMap: { [key: string]: any } = {
      BookOpen: Icons.BookOpen,
      Code: Icons.Code,
      Zap: Icons.Zap,
      Brain: Icons.Brain,
      Rocket: Icons.Rocket,
      GitBranch: Icons.GitBranch,
      Database: Icons.Database,
      Cpu: Icons.Cpu,
      Palette: Icons.Palette,
      BarChart3: Icons.BarChart3,
    };
    return iconMap[course.icon_name] || Icons.BookOpen;
  }, [course.icon_name]);

 const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  delay: index * 0.1,
},
    },
  };

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 overflow-hidden relative group h-full min-h-[200px]"
    >
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/30 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Icon className="w-8 h-8 text-blue-400" />
          <span className="text-xs font-medium text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
            {course.progress}%
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-4 line-clamp-2">
          {course.title}
        </h3>

        {/* Animated progress bar */}
        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              duration: 1.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1 + 0.3,
            }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        <p className="text-xs text-zinc-500 mt-2">
          {course.progress === 100 ? "Completed" : "In Progress"}
        </p>
      </div>
    </motion.article>
  );
}