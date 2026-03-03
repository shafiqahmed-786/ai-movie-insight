"use client";

import { motion } from "framer-motion";
import { MovieData } from "@/types/movie";

export default function MovieCard({ movie }: { movie: MovieData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-3xl p-8 grid md:grid-cols-3 gap-10"
    >
      {/* Poster */}
      <div className="flex justify-center">
        <motion.img
          src={movie.poster || "/placeholder.png"}
          alt={movie.title}
          className="w-64 rounded-2xl object-cover glow-blue"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </div>

      {/* Content */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            {movie.title}
          </h2>
          <p className="text-gray-400 mt-1">
            {movie.year} • {movie.runtime} • {movie.genre}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-4">
          <div className="px-5 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold text-lg">
            ⭐ {movie.imdbRating}
          </div>
          <span className="text-gray-400 text-sm">
            {movie.imdbVotes} votes
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed text-lg">
          {movie.plot}
        </p>

        <p className="text-sm text-gray-400">
          Directed by <span className="text-white">{movie.director}</span>
        </p>
      </div>
    </motion.div>
  );
}