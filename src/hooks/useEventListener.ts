import { useEffect, useRef } from "react";

export const useEventListener = (
  event: string,
  handler: (...e: any) => void,
  target: any = window
) => {
  const handlerRef = useRef(handler);
  useEffect(() => {
    // const targetElement = "current" in target ? target.current : window;
    let targetElement: any;
    if (!target) {
      targetElement = window;
    } else if ("current" in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    if (!targetElement?.addEventListener) return;
    const useEventListener = (event: Event) => {
      return handlerRef.current(event);
    };
    targetElement.addEventListener(event, useEventListener);
    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event, target]);
};
