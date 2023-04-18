import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { upload } from "../uploadS3";

const routes = Router()

routes.post('/register',upload.single('userImg') ,AuthController.register)
routes.post('/login', AuthController.login)
routes.post('/me',AuthMiddleware.verifyToken,AuthController.me)
routes.post('/logout',AuthController.logout)

export default routes