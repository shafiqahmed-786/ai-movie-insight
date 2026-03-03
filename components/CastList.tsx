"use client";

import { motion } from "framer-motion";

export default function CastList({ cast }: { cast: string[] }) {
  if (!cast?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6"
    >
      <h3 className="text-2xl font-semibold mb-6">Cast</h3>

      <div className="flex flex-wrap gap-3">
        {cast.map((actor, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
          >
            {actor}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}