import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const routes = Router()

routes.get('',UserController.allUser)
routes.put('',AuthMiddleware.verifyToken,UserController.updateUser)

export default routes