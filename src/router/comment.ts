import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CommentController } from "../controller/CommentController";

const routes = Router()

routes.post('',AuthMiddleware.verifyToken, CommentController.createComment)
routes.delete('/:id',AuthMiddleware.verifyToken, CommentController.deleteComment)

export default routes