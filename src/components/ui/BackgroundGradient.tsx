"use client";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full bg-white dark:bg-black",
        containerClassName
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950" />
      <motion.div
        className={cn(
          "group/card relative h-full w-full",
          className
        )}
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)",
        }}
        animate={
          animate
            ? {
                "--mouse-x": mouseX.current,
                "--mouse-y": mouseY.current,
              }
            : {}
        }
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {children}
      </motion.div>
    </div>
  );
}; 