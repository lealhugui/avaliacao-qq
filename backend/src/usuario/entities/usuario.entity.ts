import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './../../tweet/entities/tweet.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  pass: string;

  @OneToMany(
    type => Tweet,
    tweet => tweet.usuario,
    { eager: true },
  )
  tweet: Tweet[];
}
