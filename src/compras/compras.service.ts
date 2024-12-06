import { Injectable } from '@nestjs/common';
import { ComprasRepository } from './repositories/compras.repository';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { NotaFiscalService } from './utils/nota-fiscal.service';

@Injectable()
export class ComprasService {
  constructor(
    private readonly comprasRepository: ComprasRepository,
    private readonly notaFiscalService: NotaFiscalService,
  ) {}

  create(createCompraDto: CreateCompraDto) {
    const notaFiscal = this.notaFiscalService.gerarNotaFiscal();
    return this.comprasRepository.create(createCompraDto, notaFiscal);
  }

  findAll() {
    return this.comprasRepository.findAll();
  }

  findOne(id: number) {
    return this.comprasRepository.findOne(id);
  }

  findByUserId(usuarioId: number) {
    return this.comprasRepository.findByUserId(usuarioId); 
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return this.comprasRepository.update(id, updateCompraDto);
  }

  remove(id: number) {
    return this.comprasRepository.remove(id);
  }
}
