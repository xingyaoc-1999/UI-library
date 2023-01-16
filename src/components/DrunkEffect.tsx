import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";
import { DrunkProps } from "./Drunk";

const fragmentShader = /*glsl*/ `
uniform float frequency;
uniform float amplitude;
void mainUv(inout vec2 uv){
  uv
}


`;
export default class DrunkEffect extends Effect {
  constructor({
    frequency,
    amplitude,
    blendFunction = BlendFunction.DARKEN,
  }: Partial<DrunkProps>) {
    super("DrunkEffect", fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ["frequency", new Uniform(frequency)],
        ["amplitude", new Uniform(amplitude)],
      ]),
    });
  }
}
