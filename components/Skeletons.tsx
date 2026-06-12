"use client";

import { motion } from "framer-motion";

export function HeroSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 lg:col-span-2 space-y-4"
    >
      <div className="h-8 w-1/2 bg-zinc-800 rounded animate-pulse" />
      <div className="h-4 w-1/3 bg-zinc-800 rounded animate-pulse" />
      <div className="h-3 w-2/3 bg-zinc-800 rounded animate-pulse" />
      <div className="h-2 w-1/4 bg-zinc-800 rounded animate-pulse mt-6" />
    </motion.div>
  );
}

export function CourseSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div className="w-8 h-8 bg-zinc-800 rounded animate-pulse" />
        <div className="w-10 h-6 bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse" />
      <div className="h-2 w-full bg-zinc-800 rounded-full animate-pulse" />
      <div className="h-3 w-1/3 bg-zinc-800 rounded animate-pulse" />
    </motion.div>
  );
}

export function ActivitySkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 lg:col-span-2 space-y-4"
    >
      <div className="h-6 w-1/3 bg-zinc-800 rounded animate-pulse" />
      <div className="h-3 w-1/2 bg-zinc-800 rounded animate-pulse" />
      <div className="flex items-end gap-1 h-24">
        {[...Array(21)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-zinc-800 rounded-t animate-pulse"
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}
