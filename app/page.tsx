"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import CastList from "@/components/CastList";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { MovieData } from "@/types/movie";


export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidId = (id: string) => /^tt\d{7,8}$/.test(id);

  const fetchMovie = async (idOverride?: string) => {
    const idToUse = idOverride || imdbId;

    if (!idToUse) {
      toast.error("Please enter IMDb ID");
      return;
    }

    if (!isValidId(idToUse)) {
      toast.error("Invalid IMDb ID format (e.g., tt0133093)");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`/api/movie?id=${idToUse}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error);
      }

      setData(result);
      setImdbId(idToUse);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const trending = [
    { title: "The Matrix", id: "tt0133093" },
    { title: "Inception", id: "tt1375666" },
    { title: "Interstellar", id: "tt0816692" },
    { title: "Avengers: Endgame", id: "tt4154796" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen px-6 md:px-16 py-16 overflow-hidden max-w-6xl mx-auto"
    >
      <Toaster />

      {/* Cinematic Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />

      {/* Hero Title */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center mb-12 tracking-tight"
      >
        🎬 AI Movie Insight Builder
      </motion.h1>

      {/* Search Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter IMDb ID (e.g., tt0133093)"
            className={`px-4 py-2 rounded-lg w-72 ${
              imdbId && !isValidId(imdbId)
                ? "border border-red-500 text-red-500"
                : "text-black"
            }`}
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchMovie();
            }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchMovie()}
            className="bg-blue-600 px-6 py-2 rounded-lg font-semibold"
          >
            Search
          </motion.button>
        </div>

        {/* Trending */}
        <div className="flex justify-center gap-3 flex-wrap mt-4">
          {trending.map((movie) => (
            <button
              key={movie.id}
              onClick={() => fetchMovie(movie.id)}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
            >
              {movie.title}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Results Section */}
      {data && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-14 max-w-4xl mx-auto space-y-10"
        >
          <motion.div variants={item}>
            <MovieCard movie={data} />
          </motion.div>

          <motion.div variants={item}>
            <CastList cast={data.cast || []} />
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}