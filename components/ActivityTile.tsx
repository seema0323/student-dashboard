"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { springTransition, springHoverTransition, chartBarSpringTransition } from "@/lib/motion";

interface ActivityTileProps {
  index?: number;
}

export default function ActivityTile({ index = 4 }: ActivityTileProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...springTransition,
        delay: index * 0.1,
      },
    },
  };

  // Generate consistent random data using a seed to avoid hydration mismatch
  const activityDays = useMemo(() => {
    return [...Array(21)].map((_, i) => {
      // Use index as seed for consistent "random" values
      const seed = (i + 1) * 12345;
      const activity = Math.abs(Math.sin(seed) * 100);
      return {
        day: i,
        activity: Math.round(activity),
      };
    });
  }, []);

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: springHoverTransition,
      }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 md:p-8 overflow-hidden relative group h-full min-h-[300px]"
    >
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-2">
          Activity Graph
        </h2>
        <p className="text-xs text-zinc-500 mb-6">
          Last 3 weeks of learning activity
        </p>

        <div className="flex items-end gap-1 h-24">
          {activityDays.map((item, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(item.activity / 100) * 100}%` }}
              transition={{
                ...chartBarSpringTransition,
                duration: 0.8,
                delay: i * 0.03,
              }}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.2)",
              }}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-cyan-400 min-h-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              title={`Activity: ${item.activity}%`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>3 weeks ago</span>
          <span>Today</span>
        </div>
      </div>
    </motion.article>
  );
}