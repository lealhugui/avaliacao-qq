import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { UpdateSeguidoreDto } from './dto/update-seguidore.dto';
import { Seguidore } from './entities/seguidore.entity';

@Injectable()
export class SeguidoresService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Seguidore)
    private seguidoresRepository: Repository<Seguidore>,
  ) {}

  findAll() {
    return this.seguidoresRepository.find();
  }

  async findOne(id: number) {
    const seguidorEncontrado = await this.seguidoresRepository.findOne({
      usuario_id: id,
    });

    if (!seguidorEncontrado) {
      this.logger.log(seguidorEncontrado);
      return undefined;
    }

    return seguidorEncontrado;
  }

  async criarSeguidor(updateSeguidoreDto: UpdateSeguidoreDto) {
    const data = await this.seguidoresRepository.create(updateSeguidoreDto);
    return this.seguidoresRepository.save(data);
  }

  async seguir(id_usuario: number, updateSeguidoreDto: UpdateSeguidoreDto) {
    const encontrado = await this.findOne(id_usuario);

    if (!encontrado) {
      return this.criarSeguidor(updateSeguidoreDto);
    }
    const seguidoresUpdated = await this.seguidoresRepository.query(
      `UPDATE seguidore SET lst_usuarios_seguidos = '${JSON.stringify(
        updateSeguidoreDto.lst_usuarios_seguidos,
      )}' WHERE usuario_id = ${id_usuario}`,
    );

    if (seguidoresUpdated.changedRows) {
      return updateSeguidoreDto;
    }

    return {};
  }

  async deixar_de_seguir(
    id_usuario: number,
    updateSeguidoreDto: UpdateSeguidoreDto,
  ) {
    const encontrado = await this.findOne(id_usuario);

    if (!encontrado) {
      return this.criarSeguidor(updateSeguidoreDto);
    }

    const seguidoresAtualizados = _.xor(
      encontrado.lst_usuarios_seguidos,
      updateSeguidoreDto.lst_usuarios_seguidos,
    );
    updateSeguidoreDto.lst_usuarios_seguidos = seguidoresAtualizados;

    const seguidoresUpdated = await this.seguidoresRepository.query(
      `UPDATE seguidore SET lst_usuarios_seguidos = '${JSON.stringify(
        seguidoresAtualizados,
      )}' WHERE usuario_id = ${id_usuario}`,
    );

    if (seguidoresUpdated.changedRows) {
      return updateSeguidoreDto;
    }

    return {};
  }

  remove(id: number) {
    return `This action removes a #${id} seguidore`;
  }
}
