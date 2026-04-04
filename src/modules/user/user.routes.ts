import { Router } from "express";
import validate from "../../middleware/validate.middleware.ts";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./user.controller.ts";
import { createUserSchema, getUsersQuerySchema, updateUserSchema, userIdParamSchema } from "./user.schema.ts";

const userRouter = Router();

userRouter.post("/", validate(createUserSchema), createUser);
userRouter.get("/", validate(getUsersQuerySchema, "query"), getUsers);
userRouter.get("/:id", validate(userIdParamSchema, "params"), getUserById);
userRouter.patch("/:id", validate(updateUserSchema), updateUser);
userRouter.delete("/:id", validate(userIdParamSchema, "params"), deleteUser);

export default userRouter;
