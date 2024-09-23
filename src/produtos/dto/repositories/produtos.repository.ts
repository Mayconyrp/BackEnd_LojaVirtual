import { CreateProdutoDto } from '../create-produto.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoEntity } from 'src/produtos/entities/produto.entity';
import { UpdateProdutoDto } from '../update-produto.dto'; // Corrigir o nome do arquivo para minusculo

@Injectable()
export class ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um novo produto
  async create(createProdutoDto: CreateProdutoDto): Promise<ProdutoEntity> {
    return this.prisma.produto.create({
      data: {
        ...createProdutoDto,
      },
    });
  }

  // Método para encontrar todos os produtos
  async findAll(): Promise<ProdutoEntity[]> {
    return this.prisma.produto.findMany();
  }

  // Método para encontrar um único produto pelo ID
  async findOne(id: number): Promise<ProdutoEntity> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  // Método para atualizar um produto existente
  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<ProdutoEntity> {
    const produtoExistente = await this.findOne(id); // Verifica se o produto existe
    return this.prisma.produto.update({
      where: { id: produtoExistente.id },
      data: updateProdutoDto,
    });
  }

  // Método para remover/excluir um produto
  async remove(id: number): Promise<ProdutoEntity> {
    const produtoExistente = await this.findOne(id); // Verifica se o produto existe
    return this.prisma.produto.delete({
      where: { id: produtoExistente.id },
    });
  }
}
