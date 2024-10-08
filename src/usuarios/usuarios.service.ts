import { UsuariosRepository } from './dto/repositories/usuarios.repository';
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly repository: UsuariosRepository) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.repository.create(createUsuarioDto);
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
