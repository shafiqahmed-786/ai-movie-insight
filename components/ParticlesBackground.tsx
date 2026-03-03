"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5 },
          opacity: { value: 0.3 },
          color: { value: "#3b82f6" },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.2,
            color: "#6366f1",
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}