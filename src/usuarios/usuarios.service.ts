import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './dto/repositories/usuarios.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly repository: UsuariosRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    const usuario = {
      ...createUsuarioDto,
      
      senha: hashedPassword,
    };
    return this.repository.create(usuario);
  }
  findEmail(email: string) {
    return this.repository.findEmail(email);
  }
  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.repository.update(id, updateUsuarioDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
