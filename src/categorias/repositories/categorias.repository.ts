import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaEntity } from 'src/Categorias/entities/Categoria.entity';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriasRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar uma nova categoria
  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaEntity> {
    return this.prisma.categoria.create({
      data: {
        ...createCategoriaDto,
      },
    });
  }

  // Método para encontrar todas as categorias
  async findAll(): Promise<CategoriaEntity[]> {
    return this.prisma.categoria.findMany();
  }
  // Método para encontrar uma categoria pelo ID com seus produtos relacionados
  async findCategoriaWithProdutosById(id: number): Promise<CategoriaEntity> {
    return this.prisma.categoria.findUnique({
      where: { id }, // Filtra pelo ID da categoria
      include: {
        produtos: true, // Inclui os produtos relacionados à categoria
      },
    });
  }
  // Método para encontrar uma única categoria pelo ID
  async findOne(id: number): Promise<CategoriaEntity> {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  // Método para atualizar uma categoria existente
  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaEntity> {
    return this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  // Método para remover/excluir uma categoria
  async remove(id: number): Promise<CategoriaEntity> {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
