'use client';

import { useCallback, useRef } from 'react';

export function useEventCallback<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const ref = useRef(fn);
  ref.current = fn;

  const stableCallback = useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref.current(...args),
    [],
  );

  return stableCallback as T;
}
