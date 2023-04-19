import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CommentController } from "../controller/CommentController";

const routes = Router()

routes.post('/comment',AuthMiddleware.verifyToken, CommentController.createComment)

export default routes