"use client";

import { motion } from "framer-motion";

export default function RatingMeter({ rating }: { rating: string }) {
  const value = parseFloat(rating) * 10;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1 text-gray-400">
        <span>IMDb Score</span>
        <span>{rating}/10</span>
      </div>

      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
        />
      </div>
    </div>
  );
}