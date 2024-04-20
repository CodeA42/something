import { z } from "zod";

export enum ImageRendering {
  auto = "auto",
  smooth = "smooth",
  highQuality = "high-quality",
  crispEdges = "crisp-edges",
  pixelated = "pixelated",
}

export const canvasOptionsSchema = z.object({
  imageRendering: z.nativeEnum(ImageRendering).optional(),
});

const loopOptionsSchema = z.object({
  loopTimes: z.number().min(1).default(10),
  startRenderLoopEveryMilliseconds: z.number().min(1).default(1000),
  pixelRenderDelayMilliseconds: z.number().min(1).default(1),
  renderWholeSceneFirstTime: z.boolean().default(true),
});

export const colorfulSquaresOptionsSchema = z.object({
  delay: z.boolean().default(true),
  randomDelay: z.boolean().default(false),
  subdivisions: z.number().default(100),
  canvasOptions: canvasOptionsSchema.optional(),
  loopOptions: loopOptionsSchema.optional(),
});

export type ColorfulSquaresOptions = z.infer<
  typeof colorfulSquaresOptionsSchema
>;

export const partialColorfulSquaresOptionsSchema =
  colorfulSquaresOptionsSchema.partial();

export type PartialColorfulSquaresOptions = z.infer<
  typeof partialColorfulSquaresOptionsSchema
>;
