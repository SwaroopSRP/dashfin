import { Router } from "express";
import healthCheckRouter from "./modules/healthcheck/healthcheck.routes.ts";
import userRouter from "./modules/user/user.routes.ts";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/health", healthCheckRouter);

export default apiRouter;
