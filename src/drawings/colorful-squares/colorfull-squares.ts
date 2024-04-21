import { Canvas } from "../../elements/canvas";
import { getRandomNumber } from "../../utils/get-random-number";
import { sleep } from "../../utils/sleep";
import {
  PartialColorfulSquaresOptions,
  ColorfulSquaresOptions,
  colorfulSquaresOptionsSchema,
  ColorSchema,
} from "./types";

type ColorModifier = ((x: number, y: number) => number) | undefined;

type ColorModifiers = {
  red: ColorModifier;
  green: ColorModifier;
  blue: ColorModifier;
};

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
    let redModifier: ColorModifier;
    let greenModifier: ColorModifier;
    let blueModifier: ColorModifier;
    const colorModifiers: ColorModifiers = {
      red: redModifier,
      green: greenModifier,
      blue: blueModifier,
    };

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
          context.fillStyle = generateColor(
            canvas,
            options,
            pw * x,
            ph * y,
            colorModifiers
          );
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
  y: number,
  colorModifiers: ColorModifiers
) {
  if (
    [ColorSchema.gradientRandom, ColorSchema.gradiendGreenBlue].includes(
      options.colorScheme
    )
  ) {
    return generateGradientColor(canvas, options, x, y, colorModifiers);
  }
  return generateRandomColor();
}

function generateGradientColor(
  canvas: Canvas,
  options: ColorfulSquaresOptions,
  x: number,
  y: number,
  colorModifiers: ColorModifiers
): string {
  if (colorModifiers.red && colorModifiers.green && colorModifiers.blue) {
    const red = colorModifiers.red(x, y);
    const green = colorModifiers.green(x, y);
    const blue = colorModifiers.blue(x, y);
    return `rgb(${red},${green},${blue})`;
  } else if (options.colorScheme === ColorSchema.gradiendGreenBlue) {
    colorModifiers.red = modifierFactory(canvas, 0);
    colorModifiers.green = modifierFactory(canvas, 50);
    colorModifiers.blue = modifierFactory(canvas, 10);

    const red = colorModifiers.red(x, y);
    const green = colorModifiers.green(x, y);
    const blue = colorModifiers.blue(x, y);

    return `rgb(${red},${green},${blue})`;
  } else {
    const getRandomModifier = () =>
      modifierFactory(canvas, getRandomNumber(100));

    colorModifiers.red = getRandomModifier();
    colorModifiers.green = getRandomModifier();
    colorModifiers.blue = getRandomModifier();

    const red = colorModifiers.red(x, y);
    const green = colorModifiers.green(x, y);
    const blue = colorModifiers.blue(x, y);

    return `rgb(${red},${green},${blue})`;
  }
}

function modifierFactory(canvas: Canvas, relevanAxis: number) {
  const xAxis = canvas.HTMLElement.width;
  const yAxis = canvas.HTMLElement.height;
  const axisModifier = (point: number, axis: number) => (255 * point) / axis;
  const randomModifier = () => getRandomNumber(255);
  return (x: number, y: number) => {
    if (relevanAxis > 0 && relevanAxis < 10) {
      return randomModifier();
    } else if (relevanAxis >= 10 && relevanAxis < 50) {
      return axisModifier(x, xAxis);
    } else if (relevanAxis >= 50 && relevanAxis < 90) {
      return axisModifier(y, yAxis);
    } else {
      return 0;
    }
  };
}

function generateRandomColor(): string {
  return `rgb(
    ${Math.random() * 255}
    ${Math.random() * 255}
    ${Math.random() * 255})`;
}
