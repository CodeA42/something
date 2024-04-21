import { z } from "zod";
import { isWholeNumber } from "../../utils/validation/is-whole-number";

export const rgbSchema = z.object({
  red: z.number().min(0).max(255).refine(isWholeNumber),
  green: z.number().min(0).max(255).refine(isWholeNumber),
  blue: z.number().min(0).max(255).refine(isWholeNumber),
});

export type RGB = z.infer<typeof rgbSchema>;

export const rgbaSchema = rgbSchema.extend({
  alpha: z.number().min(0).max(1),
});

export type RGBA = z.infer<typeof rgbaSchema>;

export const pointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Point = z.infer<typeof pointSchema>;

export const vectorSchema = z.object({
  a: z.number(),
  b: z.number(),
});

export type Vector = z.infer<typeof vectorSchema>;

export const treeOptionsSchema = z.object({
  trunkColor: rgbSchema.default({ red: 255, green: 255, blue: 255 }),
  startPoint: pointSchema.optional(),
  growthDirector: vectorSchema.optional(),
});

export type TreeOptions = z.infer<typeof treeOptionsSchema>;

export const partialTreeOptionsSchema = treeOptionsSchema.partial();

export type PartialTreeOptions = z.infer<typeof partialTreeOptionsSchema>;

export const colorsSchema = z.object({
  red: rgbSchema,
  green: rgbSchema,
  blue: rgbSchema,
});

export type ColorsType = z.infer<typeof colorsSchema>;

export const colors: ColorsType = {
  red: { red: 255, green: 0, blue: 0 },
  green: { red: 0, green: 255, blue: 0 },
  blue: { red: 0, green: 0, blue: 255 },
};
