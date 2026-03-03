"use client";

import { motion } from "framer-motion";

export default function SentimentCard({
  sentiment,
}: {
  sentiment?: {
    classification: string;
    summary: string;
    keyThemes: string[];
  };
}) {
  if (!sentiment) return null;

  const color =
    sentiment.classification === "Positive"
      ? "bg-green-500/20 text-green-400"
      : sentiment.classification === "Negative"
      ? "bg-red-500/20 text-red-400"
      : "bg-yellow-500/20 text-yellow-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-3xl space-y-4"
    >
      <div className={`px-4 py-2 rounded-full inline-block ${color}`}>
        {sentiment.classification}
      </div>

      <p className="text-gray-300">{sentiment.summary}</p>

      <div className="flex flex-wrap gap-2">
        {sentiment.keyThemes?.map((theme, i) => (
          <span
            key={i}
            className="bg-white/10 px-3 py-1 rounded-full text-sm"
          >
            {theme}
          </span>
        ))}
      </div>
    </motion.div>
  );
}