"use client";

import { m } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   useInView — IntersectionObserver دوطرفه
   - هر بار که عنصر وارد view می‌شود → true
   - هر بار که خارج می‌شود → false
------------------------------------------------------------------- */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------
   Reveal — انیمیشن ورود/خروج با اسکرول (دوطرفه)
------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/* ------------------------------------------------------------------
   RevealGroup — ظرف ساده (بدون logic)
------------------------------------------------------------------- */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/* ------------------------------------------------------------------
   RevealItem — یک کارت با تأخیر پله‌ای
------------------------------------------------------------------- */
export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <Reveal className={className} delay={index * 0.08}>
      {children}
    </Reveal>
  );
}
