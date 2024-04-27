import { z } from "zod";

export const vectorSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Vector = z.infer<typeof vectorSchema>;

export const partialVectorSchema = vectorSchema.partial();

export type PartialVector = z.infer<typeof partialVectorSchema>;
