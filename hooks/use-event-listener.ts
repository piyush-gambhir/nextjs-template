'use client';

import { useEffect, useRef } from 'react';

// Overloads for better typing on window, document and elements
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Window,
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document,
): void;
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement,
>(eventName: K, handler: (event: HTMLElementEventMap[K]) => void, element: T): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: Window | Document | HTMLElement,
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element ?? (typeof window !== 'undefined' ? window : undefined);
    const isSupported = !!target && 'addEventListener' in target;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current(event);

    (target as any).addEventListener(eventName, eventListener);
    return () => {
      (target as any).removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
