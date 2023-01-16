import { useEffect, useRef } from "react";

export const useTimeout = (fn: () => void, delay?: number): void => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (!delay || delay < 0) return;
    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
};
