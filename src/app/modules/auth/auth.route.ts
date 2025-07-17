// auth.route.ts
import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.credentialLogin);
router.post("/refresh-token", authController.getNewAccessToken);

export const AuthRoute = router;
