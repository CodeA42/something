import { colorfullSquares } from "./drawings/colorful-squares/colorfull-squares";
import { ColorSchema, ImageRendering } from "./drawings/colorful-squares/types";
import { tree } from "./drawings/tree/tree";
import { Canvas, Canvases } from "./elements/canvas";

async function main() {
  const canvas = Canvas.getInstance(Canvases.backgroundBoard);

  await colorfullSquares(canvas, {
    delay: false,
    canvasOptions: { imageRendering: ImageRendering.crispEdges },
    subdivisions: 1000,
    colorScheme: ColorSchema.gradiendGreenBlue,
  });

  // const treeCanvas = Canvas.getInstance(Canvases.trees);

  // await tree(treeCanvas, { trunkColor: { red: 255, green: 0, blue: 0 } });
}

main();
