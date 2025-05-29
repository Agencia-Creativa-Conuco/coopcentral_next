"use client";

import { useState, useEffect } from "react";

export function useClientReady() {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // Esperar a que el componente se monte completamente
    const timer = setTimeout(() => {
      setIsClientReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return isClientReady;
}

export function useIntersectionObserver(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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
