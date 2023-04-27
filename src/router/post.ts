import { Router } from "express";
import { PostController } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { upload } from "../uploadS3";

const routes = Router()

routes.post('', AuthMiddleware.verifyToken,upload.single("postImg") ,PostController.createPost)
routes.get('', PostController.getPosts)
routes.get('/me',AuthMiddleware.verifyToken ,PostController.getUserPost)
routes.get('/:id', PostController.getPost)
routes.post('/:id', AuthMiddleware.verifyToken, PostController.likePost)
routes.delete('/:id', AuthMiddleware.verifyToken, PostController.deletePost)

export default routes