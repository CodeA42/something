import { Canvas } from "../../elements/canvas";
import { sleep } from "../../utils/sleep";
import {
  PartialColorfulSquaresOptions,
  ColorfulSquaresOptions,
  colorfulSquaresOptionsSchema,
} from "./types";

export async function colorfullSquaresLoop(canvas: Canvas) {}

export async function colorfullSquares(
  canvas: Canvas,
  unvalidatedOptions: PartialColorfulSquaresOptions
) {
  const validationResult = await colorfulSquaresOptionsSchema.safeParseAsync(
    unvalidatedOptions
  );

  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  const options = validationResult.data;

  if (options.canvasOptions?.imageRendering) {
    canvas.HTMLElement.style.imageRendering =
      options.canvasOptions.imageRendering;
  }

  if (options.loopOptions) {
    if (options.loopOptions.renderWholeSceneFirstTime) {
      render(canvas, options, true);
    }

    while (true) {
      await sleep(options.loopOptions.startRenderLoopEveryMilliseconds);
      render(canvas, options, false);
    }
  } else {
    render(canvas, options, false);
  }

  async function render(
    canvas: Canvas,
    options: ColorfulSquaresOptions,
    isFirstRender: boolean
  ) {
    const w = canvas.HTMLElement.width;
    const h = canvas.HTMLElement.height;

    const subdivisions = options.subdivisions;

    const pw = w / subdivisions;
    const ph = h / subdivisions;

    for (let i = 0; i <= subdivisions; i++) {
      for (let j = 0; j <= subdivisions; j++) {
        const context = canvas.HTMLElement.getContext("2d");
        if (
          options.loopOptions?.pixelRenderDelayMilliseconds &&
          !isFirstRender
        ) {
          await sleep(1);
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
}
