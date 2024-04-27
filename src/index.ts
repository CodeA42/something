import { ImageRendering } from "./libs/mdn-types/canvas";
import { colorfullSquares } from "./drawings/colorful-squares/colorfull-squares";
import { ColorSchema } from "./drawings/colorful-squares/types";
import { tree } from "./drawings/tree/tree";
import { Canvas, Canvases } from "./elements/canvas";

async function main() {
  const canvas = Canvas.getInstance(Canvases.backgroundBoard);

  await colorfullSquares(canvas, {
    delay: false,
    canvasOptions: { imageRendering: ImageRendering.crispEdges },
    subdivideFullResolution: true,
    colorScheme: ColorSchema.gradientRandom,
  });

  const treeCanvas = Canvas.getInstance(Canvases.trees);

  await tree(treeCanvas, { trunkColor: { red: 255, green: 0, blue: 0 } });
}

main();
