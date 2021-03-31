import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Usuario } from './../../usuario/entities/usuario.entity';

export class CreateTweetDto {
  @IsNumber()
  usuario: Usuario;

  @IsString()
  @MinLength(1)
  @MaxLength(140)
  texto: string;
}
