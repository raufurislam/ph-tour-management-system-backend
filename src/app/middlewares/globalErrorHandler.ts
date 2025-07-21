/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { object } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  const errorSources: any = [
    // {
    //   path: "isDeleted",
    //   message: "Cast failed",
    // },
  ];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  // Duplicate error
  if (err.code === 11000) {
    console.log("Duplicate error", err.message);

    const matchedArray = (message = err.message.match(/"([^"]*)"/));
    console.log(matchedArray);

    statusCode = 400;
    message = `${matchedArray[1]} Already Exist!`;
  }

  // CastError
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid id";
  }

  // ZodError
  else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Zod Error";
    err.issues.forEach((issue: any) => {
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        // task nested for example: path: "nickname inside lastname inside name"
        // array join
        message: issue.message,
      });
    });
    console.log(err.issues);
  }

  // ValidationError
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObject: any) =>
      errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
    message = "Validation Error";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
