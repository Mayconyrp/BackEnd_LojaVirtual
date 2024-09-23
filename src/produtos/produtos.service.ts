import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutosRepository } from './dto/repositories/produtos.repository';

@Injectable()
export class ProdutosService {
  constructor(private readonly repository: ProdutosRepository) {}
  create(createprodutoDto: CreateProdutoDto) {
    return this.repository.create(createprodutoDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }
  update(id: number, updateprodutoDto: UpdateProdutoDto) {
    return this.repository.update(id, updateprodutoDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
