import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UserType } from 'src/roles/enums/role.enum';

@ApiTags('compras')

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

@IsPublic()
  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }
@IsPublic()
  @Get()
  findAll() {
    return this.comprasService.findAll();
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(+id);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(+id, updateCompraDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comprasService.remove(+id);
  }
}
