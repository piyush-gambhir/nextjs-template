'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  sync?: boolean; // sync state across tabs via storage events
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse as (v: string) => T,
    sync = true,
  } = options;
  const isFirstLoad = useRef(true);

  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item == null) {
        return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      }
      return deserializer(item);
    } catch (error) {
      console.error(error);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    try {
      const serialized = serializer(storedValue);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue, serializer]);

  useEffect(() => {
    if (!sync) return;
    const handler = (e: StorageEvent) => {
      if (e.key !== key) return;
      if (e.newValue === null) return;
      try {
        const next = deserializer(e.newValue);
        // Avoid setting twice on the tab that originated the change
        if (!isFirstLoad.current) setStoredValue(next);
      } catch (err) {
        console.error(err);
      }
    };
    window.addEventListener('storage', handler);
    isFirstLoad.current = false;
    return () => window.removeEventListener('storage', handler);
  }, [key, deserializer, sync]);

  const remove = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setStoredValue, remove];
}
