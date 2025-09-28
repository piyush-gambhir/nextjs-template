'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export interface UseFetchOptions<T> {
  init?: RequestInit;
  parser?: (response: Response) => Promise<T>;
  deps?: unknown[];
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (err: unknown) => void;
}

export function useFetch<T = unknown>(url: string, options: UseFetchOptions<T> = {}) {
  const { init, parser, deps = [], immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<unknown>(null);
  const abortRef = useRef<AbortController | null>(null);

  const parseFn = useMemo<NonNullable<UseFetchOptions<T>['parser']>>(
    () => parser ?? (async (res: Response) => (await res.json()) as T),
    [parser],
  );

  const doFetch = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { ...(init || {}), signal: controller.signal });
      const result = await parseFn(response);
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const isAbortError =
        err instanceof DOMException
          ? err.name === 'AbortError'
          : typeof err === 'object' &&
            err !== null &&
            'name' in err &&
            (err as { name: string }).name === 'AbortError';
      if (isAbortError) return;
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) void doFetch();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, immediate, ...deps, init]);

  return { data, loading, error, refetch: doFetch } as const;
}
