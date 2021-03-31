import { IsArray, IsNumber } from 'class-validator';

export class CreateSeguidoreDto {
  @IsNumber()
  usuario_id: number;

  @IsArray()
  lst_usuarios_seguidos: number[];
}
