import { Request, Response } from "express";
import { User } from "../entity/User";
import { myDataBase } from "../db";
import { JwtRequest } from "../middleware/AuthMiddleware";

export class UserController {
  // 모든 유저 조회
  static allUser = async (req: Request, res: Response) => {
    try {
      const users = await myDataBase.getRepository(User).find({
        select: ['username', 'userImg'],
      });
      if (!users || users.length === 0) {
        return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
      }
      res.status(200).json({ users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '사용자 정보를 가져올 수 없습니다.' });
    }
  };
  static updateUser =async (req:JwtRequest, res:Response) => {
    const {username, userInfo} = req.body
    const {id: userId} = req.decoded
    const user = await myDataBase.getRepository(User).findOne({
      where:{id: userId}
    })
    if(!user){
      return res.status(404).json({error:"유효한 사용자가 아닙니다."})
    }
    const updateUser = {...user,username,userInfo}
    try{
      const updatedUser = await myDataBase.getRepository(User).save(updateUser)
      delete updateUser.password
      res.status(200).json(updatedUser)
    }catch(err){
      console.error(err)
    }
  }
}
