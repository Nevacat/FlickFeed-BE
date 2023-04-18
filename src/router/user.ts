import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const routes = Router()

routes.get('/users',UserController.allUser)
routes.put('/users',AuthMiddleware.verifyToken,UserController.updateUser)

export default routes