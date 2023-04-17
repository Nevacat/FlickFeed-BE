import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {tokenList} from '../app'

export const generatePassword =async (pw:string) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pw, salt)
  return password
}

export const generateAccessToken = (id: number, username: string, email:string) => {
  return jwt.sign(
    {id: id, username: username, email:email},
    process.env.SECRET_ATOKEN,
    {
      expiresIn:'1h'
    }
  )
}
export const generateRefreshToken = (id: number, username: string, email:string) => {
  return jwt.sign(
    {id: id, username: username, email:email},
    process.env.SECRET_ATOKEN,
    {
      expiresIn:'30d'
    }
  )
}
export const registerToken = (refreshToken: string, accessToken: string)=>{
  tokenList[refreshToken]={
    status: 'loggedin',
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}
export const removeToken = (refreshToken: string)=>{
  delete tokenList[refreshToken]
}