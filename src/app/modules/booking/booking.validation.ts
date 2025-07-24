import z from "zod";

export const createBookingZodSchema = z.object({
  tour: z.string(),
  guestCount: z.number().int().positive(),
});

export const UpdateBookingZodSchema = z.object({
  tour: z.string(),
  guestCount: z.number().int().positive(),
});
