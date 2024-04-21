import { z } from "zod";
import { Canvas } from "../../elements/canvas";
import { ColorSchema, ImageRendering } from "../colorful-squares/types";
import {
  PartialTreeOptions,
  RGB,
  RGBA,
  colors,
  rgbSchema,
  treeOptionsSchema,
} from "./types";

export async function tree(
  canvas: Canvas,
  unvalidatedOptions?: PartialTreeOptions
) {
  const validationResult = await treeOptionsSchema.safeParseAsync(
    unvalidatedOptions
  );

  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  const options = validationResult.data;

  const x = canvas.HTMLElement.width;
  const y = canvas.HTMLElement.height;

  const context = canvas.HTMLElement.getContext("2d");
  canvas.HTMLElement.style.imageRendering = ImageRendering.crispEdges;

  if (context) {
    context.lineWidth = 1;
    context.beginPath();
    context.strokeStyle = rgba({ red: 0, green: 0, blue: 0, alpha: 1 });
    context.fillStyle = rgb(colors.red);
    context.moveTo(x / 2 + 0.5, y);
    context.lineTo(x / 2 + 0.5, 0);
    context.lineTo(x, y / 2);
    context.stroke();
  }

  function render(canvas: Canvas, options: PartialTreeOptions) {}
}

function rgb({ red, green, blue }: RGB): string {
  return `rgb(${red}, ${green}, ${blue})`;
}

function rgba({ red, green, blue, alpha }: RGBA): string {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
