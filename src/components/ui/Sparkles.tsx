"use client";
import React from "react";
import { motion } from "framer-motion";

export const Sparkles = ({
  children,
  background,
  minSize,
  maxSize,
  speed,
  opacity,
  particleDensity,
  particleColor,
  className,
}: {
  children: React.ReactNode;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  opacity?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
}) => {
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < (particleDensity || 50); i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = (speed || 0.01) + Math.random() * 0.02;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [particleDensity, speed]);

  return (
    <div className={className}>
      <div className="relative">
        {children}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [
                  particle.x,
                  particle.x + Math.cos(particle.time) * particle.factor,
                ],
                y: [
                  particle.y,
                  particle.y + Math.sin(particle.time) * particle.factor,
                ],
                z: [
                  particle.z,
                  particle.z + Math.sin(particle.time) * particle.factor,
                ],
              }}
              transition={{
                duration: particle.speed * 100,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * (maxSize || 4) + (minSize || 2),
                height: Math.random() * (maxSize || 4) + (minSize || 2),
                background: particleColor || "#fff",
                borderRadius: "50%",
                opacity: opacity || 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 