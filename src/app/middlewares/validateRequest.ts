import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (ZodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Old body", req.body);
      req.body = await ZodSchema.parseAsync(req.body);
      console.log("new body", req.body);
      // next();
    } catch (error) {
      next(error);
    }
  };
