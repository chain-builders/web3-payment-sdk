"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface AppSelectProps {
  apps: string[];
  selected: string | null;
  onSelect: (app: string) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({ apps, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-64">
      <button
        className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all font-clash-display text-gray-700"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selected || "All Apps"}</span>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            {apps.map((app) => (
              <li
                key={app}
                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors ${
                  selected === app ? "bg-purple-100 font-bold text-purple-700" : ""
                }`}
                onClick={() => {
                  onSelect(app);
                  setOpen(false);
                }}
              >
                {app}
                {selected === app && <Check className="ml-auto text-purple-600" size={18} />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};