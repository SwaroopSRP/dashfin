import { Router } from "express";
// import { authLimiter, registerLimiter } from "../../middleware/rateLimit.middleware.ts";
import validate from "../../middleware/validate.middleware.ts";
import asyncHandler from "../../utils/asyncHandler.ts";
import { loginController, registerController } from "./auth.controller.ts";
import { loginSchema, registerSchema } from "./auth.schema.ts";

const authRouter = Router();

authRouter.post(
    "/register",
    // registerLimiter,
    validate(registerSchema),
    asyncHandler(registerController)
);

authRouter.post(
    "/login",
    // authLimiter,
    validate(loginSchema),
    asyncHandler(loginController)
);

export default authRouter;
