// src/compras/compras.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { NotaFiscalService } from '../compras/utils/nota-fiscal.service'; 

@Injectable()
export class ComprasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notaFiscalService: NotaFiscalService, 
  ) {}

  async create(createCompraDto: CreateCompraDto) {
    const notaFiscal = this.notaFiscalService.gerarNotaFiscal(); 

    const compra = await this.prisma.compra.create({
      data: {
        notaFiscal,
        tipoPagamento: createCompraDto.tipoPagamento,
        produtoId: createCompraDto.produtoId,
        usuarioId: createCompraDto.usuarioId,
        dataCompra: createCompraDto.dataCompra,
        nomeTransportadora: createCompraDto.nomeTransportadora,
        precoFrete: createCompraDto.precoFrete,
        tempoEntrega: createCompraDto.tempoEntrega,
        empresaFrete: createCompraDto.empresaFrete,
        logoTransportadora: createCompraDto.logoTransportadora,
      },
    });
    return compra;
  }

  async findAll() {
    return this.prisma.compra.findMany();
  }

  async findOne(id: number) {
    return this.prisma.compra.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    return this.prisma.compra.update({
      where: { id },
      data: updateCompraDto,
    });
  }

  async remove(id: number) {
    return this.prisma.compra.delete({
      where: { id },
    });
  }
}
