import { RGBA } from "@schemas";
import { Color } from "./types/color";

export function color(vector: RGBA) {
  return new Color(vector);
}
