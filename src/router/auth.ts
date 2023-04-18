import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const routes = Router()

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)
routes.post('/me',AuthMiddleware.verifyToken,AuthController.me)
routes.post('/logout',AuthController.logout)