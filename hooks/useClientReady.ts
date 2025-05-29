"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// Hook para verificar si el componente está montado en el cliente
export function useClientReady(): boolean {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return isClientReady;
}

// Hook para intersection observer
export function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, threshold]);

  return { isVisible, setElement };
}

// Hook para focus cuando un elemento está visible
export function useFocusEffect(ref: RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.focus();
    }
  }, [isActive, ref]);
}
