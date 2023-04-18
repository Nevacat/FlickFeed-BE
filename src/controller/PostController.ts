import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { myDataBase } from "../db";
import { JwtRequest } from "../middleware/AuthMiddleware";
import { User } from "../entity/User";

export class PostController{
  static createPost = async(req:JwtRequest, res:Response)=>{
    const {place = '', postImg, content,} = req.body
    const {id: userId} = req.decoded
    if(!postImg){
      res.status(400).json({error:"게시물 이미지가 존재하지 않습니다."})
    }
    const user = await myDataBase.getRepository(User).findOne({
      where:{
        id:userId
      }
    })
    const newPost = new Post
    newPost.place = place
    newPost.postImg = postImg
    newPost.content = content
    newPost.author = user
    try{
      const createdPost = await myDataBase.getRepository(Post).insert(newPost)
      res.status(201).send({message:"성공적으로 글이 작성되었습니다."})
    }catch(err){
      console.error(err)
    }
  }
}