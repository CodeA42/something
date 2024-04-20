import { colorfullSquares } from "./drawings/colorful-squares/colorfull-squares";
import { Canvas, Canvases } from "./elements/canvas";

async function main() {
  const canvas = Canvas.getInstance(Canvases.drawingBoard);

  canvas.drawRectangle(
    0,
    0,
    canvas.HTMLElement.width,
    canvas.HTMLElement.height
  );
  colorfullSquares(canvas, { delay: false });
}

main();
