import { ThreeElements } from "@react-three/fiber";
import { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";
import { BlendFunction } from "postprocessing";

export interface DrunkProps {
  frequency: number;
  amplitude: number;
  blendFunction: BlendFunction;
}

export const Drunk = forwardRef<ThreeElements, Partial<DrunkProps>>(
  (props, ref) => {
    const effect = new DrunkEffect(props);
    return (
      <primitive
        object={effect}
        ref={ref}
      />
    );
  }
);
