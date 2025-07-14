// user.route.ts
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

router.get(
  "/all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token found");
      }

      const verifiedToken = jwt.verify(accessToken, "secret");

      // if (!verifiedToken) {
      //   console.log(verifiedToken);
      //   throw new AppError(403, `You are not authorized ${verifiedToken}`);
      // }

      if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
        throw new AppError(403, "You are not permitted to view this route");
      }
      console.log(verifiedToken);
      next();
    } catch (error) {
      // console.log("Jwt error", error);
      next(error);
    }
  },
  UserControllers.getAllUsers
);

export const UserRoutes = router;
