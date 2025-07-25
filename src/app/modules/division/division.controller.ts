import { Request, Response } from "express";
import { catchAsync } from "./../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  // console.log({file: req.file, body: req.body});

  const payload: IDivision = {
    ...req.body,
    thumbnail: req.file?.path,
  };
  const result = await DivisionService.createDivision(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division created",
    data: result,
  });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await DivisionService.getAllDivisions(
    query as Record<string, string>
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Divisions retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await DivisionService.getSingleDivision(slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Divisions retrieved",
    data: result.data,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DivisionService.updateDivision(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division updated",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.deleteDivision(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division deleted",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
