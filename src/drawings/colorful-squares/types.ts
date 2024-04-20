import { z } from "zod";

export const colorfulSquaresOptionsSchema = z.object({
  delay: z.boolean().default(true),
  randomDelay: z.boolean().default(false),
  subdivisions: z.number().default(100),
});

export type colorfulSquaresOptions = z.infer<
  typeof colorfulSquaresOptionsSchema
>;

export const partialColorfulSquaresOptionsSchema =
  colorfulSquaresOptionsSchema.partial();

export type PartialColorfulSquaresOptions = z.infer<
  typeof partialColorfulSquaresOptionsSchema
>;
