import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email } = createUsuarioDto;
    const hasEmail = await this.usuarioRepository.findOne({ email });

    if (hasEmail) {
      throw new BadGatewayException(
        `Já existe usuário com o email: ${email} !`,
      );
    }
    const data = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(data);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuarioEncontrado = await this.usuarioRepository.findOne({ id });

    if (!usuarioEncontrado) {
      throw new NotFoundException(`Usuário com o id: ${id} não encontrado!`);
    }

    return usuarioEncontrado;
  }

  async getByEmail(email: string) {
    return this.usuarioRepository.findOne({ email });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioEncontrado = await this.findOne(id);
    await this.usuarioRepository.update(usuarioEncontrado, {
      ...updateUsuarioDto,
    });

    const usuarioUpdated = this.usuarioRepository.create({
      ...usuarioEncontrado,
      ...updateUsuarioDto,
    });
    return usuarioUpdated;
  }

  async remove(id: number) {
    const usuarioEncontrado = await this.findOne(id);

    if (usuarioEncontrado) {
      await this.usuarioRepository.delete(id);

      return true;
    }

    return false;
  }
}
