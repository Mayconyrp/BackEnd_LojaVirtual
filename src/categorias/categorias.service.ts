import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriasRepository } from './repositories/categorias.repository';

@Injectable()
export class CategoriasService {
  constructor(private readonly repository: CategoriasRepository) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.repository.create(createCategoriaDto);
  }

  findAll() {
    return this.repository.findAll();
  }
  findCategoriaWithProdutosById(id: number) {
    return this.repository.findCategoriaWithProdutosById(id);
  }
  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.repository.update(id, updateCategoriaDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
