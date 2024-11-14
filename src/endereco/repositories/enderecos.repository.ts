import { CreateEnderecosDto } from '../dto/create-enderecos.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnderecosEntity } from 'src/endereco/entities/enderecos.entity';
import { UpdateEnderecosDto } from '../dto/update-enderecos.dto'; // Corrigir o nome do arquivo para minusculo

@Injectable()
export class EnderecosRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um novo endereco
  async create(createEnderecosDto: CreateEnderecosDto): Promise<EnderecosEntity> {
    return this.prisma.endereco.create({
      data: {
        ...createEnderecosDto,
      },
    });
  }

  // Método para encontrar todos os enderecos
  async findAll(): Promise<EnderecosEntity[]> {
    return this.prisma.endereco.findMany();
  }

  // Método para encontrar um único endereco pelo ID
  async findOne(id: number): Promise<EnderecosEntity> {
    const endereco = await this.prisma.endereco.findUnique({
      where: { id },
    });
    if (!endereco) {
      throw new NotFoundException(`endereco com ID ${id} não encontrado`);
    }
    return endereco;
  }

  // Método para atualizar um endereco existente
  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecosDto,
  ): Promise<EnderecosEntity> {
    const enderecoExistente = await this.findOne(id); // Verifica se o endereco existe
    return this.prisma.endereco.update({
      where: { id: enderecoExistente.id },
      data: updateEnderecoDto,
    });
  }

  // Método para remover/excluir um endereco
  async remove(id: number): Promise<EnderecosEntity> {
    const enderecoExistente = await this.findOne(id); // Verifica se o endereco existe
    return this.prisma.endereco.delete({
      where: { id: enderecoExistente.id },
    });
  }
}
