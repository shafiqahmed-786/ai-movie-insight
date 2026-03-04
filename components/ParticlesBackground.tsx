"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          color: { value: "#3b82f6" },
          opacity: { value: 0.3 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 0.5
          },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.2,
            color: "#6366f1"
          }
        }
      }}
    />
  );
}