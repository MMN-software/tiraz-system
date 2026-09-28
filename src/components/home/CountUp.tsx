"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  end: number;
  duration?: number;
  suffix?: string;
  formatter?: (n: number) => string;
}

export function CountUp({
  end,
  duration = 1800,
  suffix = "",
  formatter = (n) => n.toLocaleString("fa-IR"),
}: Props) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // شروع انیمیشن وقتی در viewport دیده شد
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // انیمیشن شمارنده
  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="num">
      {formatter(count)}
      {suffix}
    </span>
  );
}
