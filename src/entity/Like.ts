import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
}
