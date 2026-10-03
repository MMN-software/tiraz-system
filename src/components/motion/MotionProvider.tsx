"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * MotionProvider — LazyMotion سبک (فقط domAnimation)
 * + MotionConfig برای احترام به prefers-reduced-motion
 */
export default function MotionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
