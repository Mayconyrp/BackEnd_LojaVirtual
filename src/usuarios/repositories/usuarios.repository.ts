import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuariosRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um novo usuário
  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    return this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        type_user: 'User',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    });
  }

  // Método para encontrar todos os usuários
  async findAll(): Promise<UsuarioEntity[]> {
    return this.prisma.usuario.findMany();
  }

  // Método para encontrar um único usuário pelo ID
  async findOne(id: number): Promise<UsuarioEntity> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }
  async findEmail(email: string): Promise<UsuarioEntity> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }
  // Método para atualizar um usuário existente
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  // Método para remover/excluir um usuário
  async remove(id: number): Promise<UsuarioEntity> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
