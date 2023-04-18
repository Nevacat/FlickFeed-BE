import express from 'express';
import { myDataBase } from './db';
import cors from 'cors';
import { upload } from './uploadS3';
import AuthRouter from './router/auth'
import UserRouter from './router/user'

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
app.use('/',UserRouter)
app.listen(3000, () => {
  console.log('Express server has started on port 3000');
});
