// user.controller.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
// import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new Error("Fake error");
    // throw new AppError(httpStatus.BAD_REQUEST, "Fake error");
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created Successfully",
      user,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const UserController = {
  createUser,
};

// Route matching (app → index → user.route) → controller → service → model → DB
