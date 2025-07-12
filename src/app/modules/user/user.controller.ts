/* eslint-disable @typescript-eslint/no-unused-vars */
// user.controller.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
// import AppError from "../../errorHelpers/AppError";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new Error("Fake error");
//     // throw new AppError(httpStatus.BAD_REQUEST, "Fake error");
//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created Successfully",
//       user,
//     });
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();
    res.status(httpStatus.OK).json({
      success: true,
      message: "All users retrieve successfully",
      data: users,
    });
  }
);

// function → res-res function

export const UserController = {
  createUser,
  getAllUsers,
};

// Route matching (app → index → user.route) → controller → service → model → DB
