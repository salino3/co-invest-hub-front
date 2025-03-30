import { useState, useEffect, useRef, MutableRefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  Dimensions
] {
  const ref = useRef<T | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, dimensions];
}

// Usage example:  const [divRef, dimensions] = useResizeObserver<HTMLDivElement>();
