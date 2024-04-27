import { Vector } from "@schemas";
import { Position } from "./types/position";

export function position(vector: Vector) {
  return new Position(vector);
}
