import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './../../usuario/entities/usuario.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Usuario,
    usuario => usuario.tweet
  )
  @JoinColumn()
  usuario: Usuario;

  @Column({
    length: 140,
  })
  texto: string;
}
