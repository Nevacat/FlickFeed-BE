import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  content: string
  @ManyToOne(()=> Post, post=>post.comments)
  post: Post
  @ManyToOne(()=> User, user=>user.comments)
  author: User
}