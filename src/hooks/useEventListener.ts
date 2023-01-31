import { useEffect, useRef } from "react";

export const useEventListener = (
  event: string,
  handler: (...e: any) => void,
  target: any = window
) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    let targetElement: HTMLElement = null!;
    if ("current" in target) {
      targetElement = target.current;
    }
    const useEventListener = (event: any) => {
      return handlerRef.current(event);
    };
    targetElement.addEventListener(event, useEventListener);
    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event, target]);
};
