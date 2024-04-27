import { ImageRendering } from "../../libs/mdn-types/canvas";
import { z } from "zod";

export const canvasOptionsSchema = z.object({
  imageRendering: z.nativeEnum(ImageRendering).optional(),
});

const loopOptionsSchema = z.object({
  startRenderLoopEveryMilliseconds: z.number().min(1).default(1000),
  pixelRenderDelayMilliseconds: z.number().min(1).default(1),
  renderWholeSceneFirstTime: z.boolean().default(true),
});

export enum ColorSchema {
  gradientRandom,
  gradiendGreenBlue,
  random,
}

export const colorfulSquaresOptionsSchema = z.object({
  delay: z.boolean().default(true),
  randomDelay: z.boolean().default(false),
  subdivisions: z.number().default(100),
  subdivideFullResolution: z.boolean().default(false),
  canvasOptions: canvasOptionsSchema.optional(),
  loopOptions: loopOptionsSchema.optional(),
  colorScheme: z.nativeEnum(ColorSchema).default(ColorSchema.random),
});

export type ColorfulSquaresOptions = z.infer<
  typeof colorfulSquaresOptionsSchema
>;

export const partialColorfulSquaresOptionsSchema =
  colorfulSquaresOptionsSchema.partial();

export type PartialColorfulSquaresOptions = z.infer<
  typeof partialColorfulSquaresOptionsSchema
>;
