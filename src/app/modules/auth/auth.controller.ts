// auth.controller.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Logged In successfully",
      data: loginInfo,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const refreshToken = req.cookies.refreshToken;
    // const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    const refreshToken = req.headers.authorization;
    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "something",
      data: tokenInfo,
    });
  }
);

export const authController = {
  credentialLogin,
  getNewAccessToken,
};
