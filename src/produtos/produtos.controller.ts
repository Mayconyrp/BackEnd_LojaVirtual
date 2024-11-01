import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}
  @ApiBearerAuth('Authorization')
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }
  @IsPublic()
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtosService.findOne(id);
  }
  @ApiBearerAuth('Authorization')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }
  @ApiBearerAuth('Authorization')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtosService.remove(id);
  }
}
