import { Stream } from 'src/streams/entities/stream.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Stream, (stream) => stream.user)
  @JoinColumn({ name: 'stream_key' })
  stream: Stream;

  @Column({
    name: 'user_id',
    length: 10,
    unique: true,
  })
  userId: string;

  @Column({
    name: 'oauth_id',
    length: 10,
    unique: true,
  })
  oauthId: string;

  @Column({
    name: 'oauth_type',
    length: 10,
  })
  oauthType: string;

  @Column({
    length: 10,
    unique: true,
    nullable: false,
  })
  nickname: string;

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
