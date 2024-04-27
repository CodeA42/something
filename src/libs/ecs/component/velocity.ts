import { Vector } from "@schemas";
import { Velocity } from "./types/velocity";

export function velocity(vector: Vector) {
  return new Velocity(vector);
}
