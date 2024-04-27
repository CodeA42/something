import { z } from "zod";
import { isWholeNumber } from "./is-whole-number";

export const rgbSchema = z.object({
  red: z.number().min(0).max(255).refine(isWholeNumber),
  green: z.number().min(0).max(255).refine(isWholeNumber),
  blue: z.number().min(0).max(255).refine(isWholeNumber),
});

export type RGB = z.infer<typeof rgbSchema>;

export const partialRgbSchema = rgbSchema.partial();

export type PartialRGB = z.infer<typeof partialRgbSchema>;

export const rgbaSchema = rgbSchema.extend({
  alpha: z.number().min(0).max(1),
});

export type RGBA = z.infer<typeof rgbaSchema>;

export const partialRgbaSchema = rgbaSchema.partial();

export type PartialRGBA = z.infer<typeof partialRgbaSchema>;
