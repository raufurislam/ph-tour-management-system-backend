import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionSchema } from "./division.validation";
import { DivisionController } from "./division.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);

router.get("/", DivisionController.getAllDivisions);

export const DivisionRoutes = router;
