import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seguidore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column('simple-json')
  lst_usuarios_seguidos: number[];
}
