import { z } from "zod";
import { vectorSchema } from "../../libs/schemas/vector";
import { rgbSchema } from "../../libs/schemas/color";

export const pointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Point = z.infer<typeof pointSchema>;

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
