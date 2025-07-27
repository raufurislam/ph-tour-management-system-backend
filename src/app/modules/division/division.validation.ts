import z from "zod";

export const createDivisionSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export const updateDivisionSchema = z.object({
  name: z.string().min(1).optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});
