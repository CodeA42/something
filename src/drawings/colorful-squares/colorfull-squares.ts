import { Canvas } from "../../elements/canvas";
import { sleep } from "../../utils/sleep";
import {
  PartialColorfulSquaresOptions,
  ColorfulSquaresOptions,
  colorfulSquaresOptionsSchema,
  ColorScheme,
} from "./types";

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

    const pw = Math.ceil(w / subdivisions);
    const ph = Math.ceil(h / subdivisions);

    for (let x = 0; x <= subdivisions; x++) {
      for (let y = 0; y <= subdivisions; y++) {
        const context = canvas.HTMLElement.getContext("2d");
        if (options.loopOptions && !isFirstRender) {
          if (options.loopOptions?.pixelRenderDelayMilliseconds) {
            await sleep(options.loopOptions?.pixelRenderDelayMilliseconds);
          } else {
            await sleep(1);
          }
        }

        if (context) {
          context.fillStyle = generateColor(canvas, options, pw * x, ph * y);
        }
        canvas.drawRectangle(pw * x, ph * y, pw, ph);
      }
    }
  }
}

function generateColor(
  canvas: Canvas,
  options: ColorfulSquaresOptions,
  x: number,
  y: number
) {
  if (options.colorScheme == ColorScheme.gradient) {
    return generateGradientColor(canvas, x, y);
  }
  return generateRandomColor();
}

function generateGradientColor(canvas: Canvas, x: number, y: number): string {
  const red = (255 * x) / canvas.HTMLElement.width;
  const green = (255 * y) / canvas.HTMLElement.height;
  const blue = 0;

  return `rgb(${red},${green},${blue})`;
}

function generateRandomColor(): string {
  return `rgb(
    ${Math.random() * 255}
    ${Math.random() * 255}
    ${Math.random() * 255})`;
}
