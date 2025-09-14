'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatch = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState<boolean>(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
