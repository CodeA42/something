import { Canvas } from "../../elements/canvas";
import { sleep } from "../../utils/sleep";
import {
  PartialColorfulSquaresOptions,
  colorfulSquaresOptionsSchema,
} from "./types";

export async function colorfullSquaresLoop(canvas: Canvas) {
  colorfullSquares(canvas, { delay: false });
  while (true) {
    await sleep(1000);
    colorfullSquares(canvas, { delay: true, randomDelay: true });
  }
}

export async function colorfullSquares(
  canvas: Canvas,
  unvalidatedOptions: PartialColorfulSquaresOptions
) {
  const validationResult = await colorfulSquaresOptionsSchema.safeParseAsync(
    unvalidatedOptions
  );
  if (!validationResult.success)
    throw new Error(validationResult.error.message);

  const options = validationResult.data;

  const w = canvas.HTMLElement.width;
  const h = canvas.HTMLElement.height;

  const subdivisions = validationResult.data.subdivisions;

  const pw = w / subdivisions;
  const ph = h / subdivisions;

  for (let i = 0; i <= subdivisions; i++) {
    for (let j = 0; j <= subdivisions; j++) {
      const context = canvas.HTMLElement.getContext("2d");
      if (options.delay) {
        if (options.randomDelay) {
          await sleep(Math.random() * 5);
        } else {
          await sleep(1);
        }
      }

      if (context) {
        context.fillStyle = `rgb(
					${Math.random() * 255}
					${Math.random() * 255}
					${Math.random() * 255})`;
      }
      canvas.drawRectangle(pw * i, ph * j, pw, ph);
    }
  }
}
