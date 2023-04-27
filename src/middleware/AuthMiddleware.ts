import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export interface TokenPayload {
  email: string,
  username: string,
  id:string,
}

export interface JwtRequest extends Request {
  decoded?: TokenPayload
}

export class AuthMiddleware {
  static verifyToken = (req:JwtRequest, res:Response, next: NextFunction)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split(' ')[1]
    if(!token){
      return res.status(403).send('토큰이 없습니다.')
    }
    try{
      const decoded = verify(token, process.env.SECRET_ATOKEN) as TokenPayload
      req.decoded = decoded
    } catch(error){
      return res.status(401).send('유효하지 않은 토큰입니다.')
    }
    return next()
  }
}