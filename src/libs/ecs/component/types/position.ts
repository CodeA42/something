import { Vector } from "@schemas";

export class Position {
  x: number;
  y: number;
  constructor(vector: Vector) {
    this.x = vector.x;
    this.y = vector.y;
  }
}
