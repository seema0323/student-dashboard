"use client";

import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: BarChart3, label: "Progress", href: "/progress" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed md:static top-0 left-0 h-screen w-64 md:w-56 lg:w-64 border-r border-zinc-800 bg-gradient-to-b from-zinc-950 via-black to-black z-40 flex flex-col transform transition-transform md:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-zinc-800 flex items-center gap-3">
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-2xl"
          >
            🚀
          </motion.div>
          <div>
            <h1 className="font-bold text-base md:text-lg">EduFlow</h1>
            <p className="text-xs text-zinc-500">Learning Hub</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 md:p-6 flex-1">
          <p className="text-xs font-semibold text-zinc-600 mb-4 uppercase tracking-widest">
            Navigation
          </p>
          <div className="space-y-1">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId={isActive ? "active-nav" : undefined}
                >
                  <button
                    onClick={() => {
                      setActiveIndex(i);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative group text-sm md:text-base ${
                      isActive
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bg"
                        className="absolute inset-0 bg-blue-500/10 rounded-lg -z-10"
                      />
                    )}
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-zinc-800 p-4 md:p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm md:text-base font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}