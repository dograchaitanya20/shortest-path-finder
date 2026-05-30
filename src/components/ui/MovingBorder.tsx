"use client";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        otherProps.className
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          rx,
          ry,
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
            backgroundSize: "400% 400%",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            rx,
            ry,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 