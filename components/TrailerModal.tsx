"use client";

import { motion } from "framer-motion";

export default function TrailerModal({
  videoKey,
  onClose,
}: {
  videoKey: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative w-[90%] md:w-[70%] aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          className="w-full h-full rounded-xl"
          allowFullScreen
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/20 px-3 py-1 rounded-lg"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}