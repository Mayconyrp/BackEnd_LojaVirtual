import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompraDto } from '../dto/create-compra.dto';
import { UpdateCompraDto } from '../dto/update-compra.dto';
import { Compra } from '@prisma/client';

@Injectable()
export class ComprasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCompraDto, notaFiscal: string): Promise<Compra> {
    console.log('Criando compra com os dados:', data); // Logando os dados recebidos

    return this.prisma.compra
      .create({
        data: {
          ...data,
          notaFiscal, // Adicionando nota fiscal ao registro
        },
      })
      .then((compra) => {
        console.log('Compra criada com sucesso:', compra);
        return compra;
      })
      .catch((error) => {
        console.error('Erro ao criar a compra:', error); // Logando o erro completo
        if (error.code === 'P2003') {
          if (error.meta?.target?.includes('produtoId')) {
            throw new NotFoundException(`Produto com ID ${data.produtoId} não encontrado.`);
          } else if (error.meta?.target?.includes('usuarioId')) {
            throw new NotFoundException(`Usuário com ID ${data.usuarioId} não encontrado.`);
          }
        }
        throw new BadRequestException('Erro ao criar a compra. Verifique os dados fornecidos.');
      });
  }

  findAll(): Promise<Compra[]> {
    return this.prisma.compra
      .findMany()
      .then((compras) => {
        console.log('Compras encontradas:', compras);
        return compras;
      })
      .catch((error) => {
        console.error('Erro ao recuperar as compras:', error);
        throw new BadRequestException('Erro ao recuperar as compras.');
      });
  }

  findOne(id: number): Promise<Compra> {
    return this.prisma.compra
      .findUnique({
        where: { id },
      })
      .then((compra) => {
        if (!compra) {
          console.error(`Compra com ID ${id} não encontrada.`);
          throw new NotFoundException(`Compra com ID ${id} não encontrada.`);
        }
        console.log('Compra encontrada:', compra);
        return compra;
      })
      .catch((error) => {
        console.error('Erro ao recuperar a compra:', error);
        throw new BadRequestException('Erro ao recuperar a compra.');
      });
  }
  
  findByUserId(usuarioId: number): Promise<Compra[]> {
    return this.prisma.compra
      .findMany({
        where: {
          usuarioId: usuarioId, // Filtra as compras pelo ID do usuário
        },
      })
      .then((compras) => {
        console.log('Compras encontradas para o usuário:', compras);
        return compras;
      })
      .catch((error) => {
        console.error('Erro ao recuperar as compras do usuário:', error);
        throw new BadRequestException('Erro ao recuperar as compras do usuário.');
      });
  }

  update(id: number, data: UpdateCompraDto): Promise<Compra> {
    console.log(`Atualizando compra com ID ${id} com os dados:`, data);

    return this.prisma.compra
      .update({
        where: { id },
        data,
      })
      .then((compraAtualizada) => {
        console.log('Compra atualizada com sucesso:', compraAtualizada);
        return compraAtualizada;
      })
      .catch((error) => {
        console.error('Erro ao atualizar a compra:', error);
        throw new BadRequestException('Erro ao atualizar a compra.');
      });
  }

  remove(id: number): Promise<Compra> {
    return this.findOne(id) // Verifica se a compra existe
      .then((compraExistente) => {
        console.log('Deletando a compra com ID:', compraExistente.id);
        return this.prisma.compra
          .delete({
            where: { id: compraExistente.id },
          })
          .then((compraDeletada) => {
            console.log('Compra deletada com sucesso:', compraDeletada);
            return compraDeletada;
          })
          .catch((error) => {
            console.error('Erro ao deletar a compra:', error);
            throw new BadRequestException('Erro ao deletar a compra.');
          });
      })
      .catch((error) => {
        console.error(`Compra com ID ${id} não encontrada para exclusão.`, error);
        throw new NotFoundException('Compra não encontrada para exclusão.');
      });
  }
}
