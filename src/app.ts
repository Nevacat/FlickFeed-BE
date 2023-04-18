import express from 'express';
import { myDataBase } from './db';
import cors from 'cors';
import { upload } from './uploadS3';
import AuthRouter from './router/auth'

export const tokenList = {};

myDataBase
  .initialize()
  .then(() => {
    console.log('DataBase has been initialized!');
  })
  .catch((err) => {
    console.error('Error during DataBase initialization:', err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: true, // 모두 허용
  })
);
app.use('/auth',AuthRouter)

app.post(
  '/upload',
  upload.fields([
    { name: 'userImg', maxCount: 1 },
    { name: 'postImg', maxCount: 1 },
  ]),
  (req, res) => {
    res.json(req.file).send('파일이 정상적으로 업로드 되었습니다.');
  }
);

app.listen(3000, () => {
  console.log('Express server has started on port 3000');
});
