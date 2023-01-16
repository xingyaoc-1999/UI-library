import { useState } from "react";
import { useEventListener } from "./useEventListener";

const initState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN,
};

export const useMouse = (target?: any) => {
  const [state, setState] = useState(initState);

  useEventListener("mousemove", (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
    const newState = {
      screenX,
      screenY,
      clientX,
      clientY,
      pageX,
      pageY,
      elementX: NaN,
      elementY: NaN,
      elementH: NaN,
      elementW: NaN,
      elementPosX: NaN,
      elementPosY: NaN,
    };
    setState(newState);
  });

  return state;
};
