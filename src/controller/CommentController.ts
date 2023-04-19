import { Request, Response } from 'express';
import { JwtRequest } from '../middleware/AuthMiddleware';
import { myDataBase } from '../db';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import { Comment } from '../entity/Comment';

export class CommentController {
  static createComment = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded;
    const user = await myDataBase.getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
    const { postId, content } = req.body;
    const post = await myDataBase.getRepository(Post).findOneBy({
      id: postId,
    });

    const comment = new Comment();
    comment.content = content;
    comment.post = post;
    comment.author = user;

    try {
      const result = await myDataBase.getRepository(Comment).insert(comment);
      return res.status(201).send({ message: '성공적으로 댓글이 달렸습니다.' });
    } catch (err) {
      console.error(err);
    }
  };
}
