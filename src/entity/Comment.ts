import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  content: string
  @ManyToOne(()=> Post, post=>post.comments, { onDelete: 'CASCADE' })
  post: Post
  @ManyToOne(()=> User, user=>user.comments, { onDelete: 'CASCADE' })
  author: User
}