// user.controller.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created Successfully",
      user,
    });
  } catch (err: any) {
    console.log(err);
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Something went wrong!! ${err.message}`,
      err,
    });
  }
};

export const UserController = {
  createUser,
};

// Route matching (app → index → user.route) → controller → service → model → DB
