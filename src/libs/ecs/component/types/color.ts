import { RGBA } from "@schemas";

export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  constructor(color: RGBA) {
    this.red = color.red;
    this.green = color.green;
    this.blue = color.blue;
    this.alpha = color.alpha;
  }
}
