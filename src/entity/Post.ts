import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity()
export class Post{
  @PrimaryGeneratedColumn('uuid')
  id:string
  @Column()
  place: string
  @Column()
  content: string
  @Column()
  postImg: string
  @ManyToOne(()=>User, user=>user.posts)
  author: User
  @OneToMany(()=>Comment, comment=>comment.post)
  comments: Comment[]
  @OneToMany(()=>Like, like=>like.post)
  likes: Like[]
  @CreateDateColumn()
  createAt : Date
  @CreateDateColumn()
  updateAt : Date
}