import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { myDataBase } from "../db";
import { JwtRequest } from "../middleware/AuthMiddleware";
import { User } from "../entity/User";

interface MulterS3Request extends JwtRequest{
  file: Express.MulterS3.File
}

export class PostController{
  static createPost = async(req:MulterS3Request, res:Response)=>{
    const {place = '', content,} = req.body
    const {location: postImg} = req.file
    console.log(postImg)
    const {id: userId} = req.decoded
    if(!postImg || req.body){
      return res.status(400).json({error:"이미지 또는 게시글을 확인해주세요."})
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
      return res.status(201).send({message:"성공적으로 글이 작성되었습니다."})
    }catch(err){
      return console.error(err)
    }
  }
  static getPosts = async (req:Request, res:Response) => {
    const posts = await myDataBase.getRepository(Post).find({
      select:{
        author:{
          id: true,
          username:true,
          email:true,
          userImg: true,
        },
        comments:{
          id:true,
          content:true,
          author:{
            id:true,
            username:true
          }
        }
      },
      relations:["author","comments","comments.author"]
    })
    if(!posts || posts.length===0){
      return res.status(404).send({error:"게시물이 존재하지 않습니다."})
    }
    res.send(posts)
  }
  static getPost = async (req:JwtRequest, res:Response) => {
    const {id: userId} = req.decoded
    const posts = await myDataBase.getRepository(Post).find({
      where:{
        author:{
          id: userId
        }
      },
      select:{
        author:{
          id: true,
          username:true,
          email:true,
        },
      },
      relations:{
        author: true,
        comments: true
      }
    })
    if(!posts || posts.length===0){
      return res.status(404).send({error:"게시물이 존재하지 않습니다."})
    }
    res.send(posts)
  }
}