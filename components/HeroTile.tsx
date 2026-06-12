"use client";

import { motion } from "framer-motion";

interface HeroTileProps {
  name?: string;
  streak?: number;
  goalCompleted?: boolean;
  index?: number;
}

export default function HeroTile({
  name = "Seema",
  streak = 12,
  goalCompleted = true,
  index = 0,
}: HeroTileProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
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
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 md:p-8 overflow-hidden relative group h-full min-h-[300px]"
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-3xl font-bold">
          Welcome back, {name} 👋
        </h1>

        <p className="mt-4 text-zinc-400">
          🔥 {streak} Day Learning Streak
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Keep building. Keep growing.
        </p>

        {goalCompleted && (
          <div className="mt-6 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
            />
            <span className="text-sm text-zinc-400">
              Daily Goal Completed
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

