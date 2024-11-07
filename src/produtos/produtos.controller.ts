import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { UserType } from 'src/roles/enums/role.enum';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
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
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtosService.remove(id);
  }
}
