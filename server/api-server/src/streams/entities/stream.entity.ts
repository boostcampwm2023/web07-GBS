import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn('uuid', { name: 'stream_key' })
  streamKey: string;

  @OneToOne(() => User, (user) => user.stream)
  user: User;

  @Column({
    length: 10,
    nullable: true,
  })
  title: string;

  @Column({
    length: 20,
    nullable: true,
  })
  desc: string;

  @Column({
    length: 20,
    nullable: true,
  })
  category: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: string;
}
