"use client";

import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay: number): T {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef<number>(Date.now());
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => {
      setThrottled(value);
      lastRan.current = Date.now();
    };

    const remaining = delay - (Date.now() - lastRan.current);
    if (remaining <= 0) {
      handler();
    } else {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(handler, remaining);
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return throttled;
}

