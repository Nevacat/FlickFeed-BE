import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { myDataBase } from "../db";
import { JwtRequest } from "../middleware/AuthMiddleware";
import { User } from "../entity/User";
import { Like } from "../entity/Like";

interface MulterS3Request extends JwtRequest{
  file: Express.MulterS3.File
}

export class PostController{
  //게시물 작성
  static createPost = async(req:MulterS3Request, res:Response)=>{
    const {place = '', content,} = req.body
    const {location: postImg} = req.file
    console.log(postImg)
    const {id: userId} = req.decoded
    if(!postImg || !req.body){
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
      return res.status(201).json({message:"성공적으로 글이 작성되었습니다."})
    }catch(err){
      return console.error(err)
    }
  }
  // 모든 게시물 가져오기
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
      relations:["author","comments","comments.author","likes","likes.user"]
    })
    if(!posts || posts.length===0){
      return res.status(404).json({error:"게시물이 존재하지 않습니다."})
    }
    res.json(posts)
  }
  // 단일 게시물
  static getPost = async (req:Request, res:Response) => {
    const {id: postId} = req.params
    const comments = await myDataBase.getRepository(Post).findOne({
      where:{
        id: postId
      },
      relations:["comments","comments.author","likes","likes.user"]
    })
    if(!comments){
      return res.status(404).json({error:"존재하지 않습니다."})
    }
    res.status(200).json(comments)
  }
  // 사용자 게시물
  static getUserPost = async (req:JwtRequest, res:Response) => {
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
      }
    })
    if(!posts || posts.length===0){
      return res.status(404).json({error:"게시물이 존재하지 않습니다."})
    }
    res.json(posts)
  }
  // 좋아요
  static likePost =async (req:JwtRequest, res:Response) => {
    const {id:userId} = req.decoded
    const user = await myDataBase.getRepository(User).findOne({
      where:{
        id: userId
      }
    })
    const isExist = await myDataBase.getRepository(Like).findOne({
      where: {
        post: { id: req.params.id },
        user: { id: user.id }, // {id: 유저아이디} 가 요청 시에 필요
      },
    })
    if(!isExist){
      const post = await myDataBase.getRepository(Post).findOneBy({
        id: req.params.id
      })
      const like = new Like()
      like.post = post
      like.user = user
      await myDataBase.getRepository(Like).insert(like)
    }else{
      await myDataBase.getRepository(Like).remove(isExist)
    }
    return res.send({message:'success'})
  }
}