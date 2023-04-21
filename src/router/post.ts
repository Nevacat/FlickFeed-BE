import { Router } from "express";
import { PostController } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { upload } from "../uploadS3";

const routes = Router()

routes.post('/posts', AuthMiddleware.verifyToken,upload.single("postImg") ,PostController.createPost)
routes.get('/posts', PostController.getPosts)
routes.get('/posts/me', PostController.getUserPost)
routes.get('/posts/:id', PostController.getPost)
routes.post('/posts/:id', AuthMiddleware.verifyToken, PostController.likePost)
export default routes