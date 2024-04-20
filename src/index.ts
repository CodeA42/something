import { colorfullSquares } from "./drawings/colorful-squares/colorfull-squares";
import { ImageRendering } from "./drawings/colorful-squares/types";
import { Canvas, Canvases } from "./elements/canvas";

async function main() {
  const canvas = Canvas.getInstance(Canvases.drawingBoard);

  colorfullSquares(canvas, {
    delay: false,
    canvasOptions: { imageRendering: ImageRendering.pixelated },
    subdivisions: 500,
  });
}

main();
