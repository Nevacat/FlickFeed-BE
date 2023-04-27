import express from 'express'
import { myDataBase } from './db';
import cors from 'cors';
import AuthRouter from './router/auth'
import UserRouter from './router/user'
import PostRouter from './router/post'
import CommentRouter from './router/comment'
import dotenv from 'dotenv'
dotenv.config()

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
    origin: [/^http:\/\/localhost(?::\d+)?$/,'http://myfron-env.eba-uvx9t8hw.ap-northeast-2.elasticbeanstalk.com'],
    credentials: true
  })
);

app.use('/auth',AuthRouter)
app.use('/users',UserRouter)
app.use('/posts',PostRouter)
app.use('/comment',CommentRouter)

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Express server has started on ' + port);
});
