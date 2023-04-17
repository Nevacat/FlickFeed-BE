import { Request, Response } from 'express';
import { myDataBase } from '../db';
import { User } from '../entity/User';
import { generateAccessToken, generatePassword, generateRefreshToken } from '../util/Auth';
import { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface MulterS3Request extends Request {
  file: Express.MulterS3.File;
}

export class UserController {
  static register = async (req: MulterS3Request, res: Response) => {
    // 유저가 입력한 정보를 빼오자.
    const { username, email, password, userInfo } = req.body;
    const { location } = req.file;
    // 유저의 정보에서 중복되는 사항이 없는지 확인하자
    const existUser = await myDataBase.getRepository(User).findOne({
      where: [{ username }, { email }],
    });
    // 중복에러 반환
    if (existUser) {
      return res.status(400).json({ error: '이미 존재하는 이름 또는 이메일 입니다.' });
    }
    // 유저 생성
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await generatePassword(password);
    user.userImg = location;
    user.userInfo = userInfo;
    const newUser = await myDataBase.getRepository(User).save(user);
    // 토큰 생성
    const accessToken = generateAccessToken(newUser.id, newUser.username, newUser.email);
    const refreshToken = generateRefreshToken(newUser.id, newUser.username, newUser.email);
    // 토큰 복호화
    const decoded = verify(accessToken, process.env.SECRET_ATOKEN);
    // 토큰 쿠키 옵션
    res.cookie('refreshToken', refreshToken, { path: '/', httpOnly: true, maxAge: 3000 * 24 * 30 * 1000 });
    res.send({ content: decoded, accessToken, refreshToken });
  };
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await myDataBase.getMongoRepository(User).findOne({
      where: { email },
    });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword) {
      return res.status(400).json({ error: '아이디 또는 비밀번호를 확인해주세요.' });
    }
    const accessToken = generateAccessToken(user.id, user.username, user.email);
    const refreshToken = generateRefreshToken(user.id, user.username, user.email);
    const decoded = verify(accessToken, process.env.SECRET_ATOKEN )
    res.cookie('refreshToken', refreshToken,{path:'/', httpOnly:true,maxAge:3600*24*30*1000})
    res.send({content: decoded, accessToken})
  };
}
