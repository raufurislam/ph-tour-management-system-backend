import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { StatsService } from "./stats.service";
import { sendResponse } from "../../utils/sendResponse";

const getBookingStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getBookingStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking stats fetched successfully",
    data: stats,
  });
});

const getPaymentStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getPaymentStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment stats fetched successfully",
    data: stats,
  });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getUserStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User stats fetched successfully",
    data: stats,
  });
});

const getTourStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getTourStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour stats fetched successfully",
    data: stats,
  });
});
export const StatsController = {
  getBookingStats,
  getPaymentStats,
  getTourStats,
  getUserStats,
};
