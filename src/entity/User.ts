import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Like } from "./Like";

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({unique: true})
  username: string
  @Column({unique: true})
  email: string
  @Column()
  password: string
  @Column()
  userImg:  string
  @Column()
  userInfo: string
  @OneToMany(()=>Post, post=>post.author)
  posts: User[]
  @OneToMany(()=>Comment, comment=>comment.author)
  comments: Comment[]
  @OneToMany(()=>Like, like=>like.user)
  likes: Like[]
  @CreateDateColumn()
  createAt : Date
  @CreateDateColumn()
  updateAt : Date
}