import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { UserType } from 'src/roles/enums/role.enum';
import { CompraPermissionGuard } from './guards/compra-permission.guard';

@ApiTags('compras')
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}
  
  @ApiBearerAuth('Authorization')
  @Roles(UserType.User)
  @UseGuards(RolesGuard, CompraPermissionGuard)
  @Post()
  create(@Request() req, @Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Get('/me')
  async findAllByUser(@Request() req) {
    const usuarioId = req.user.id; 
    return this.comprasService.findByUserId(usuarioId); 
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get('/usuario/:id')
  async findAllByUserId(@Param('id') id: number) {
    return this.comprasService.findOne(id);
  }

  //Outras Querys

  /*@ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, CompraPermissionGuard)
  @Roles(UserType.User)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: number, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(id, updateCompraDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, CompraPermissionGuard)
  @Roles(UserType.User)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    return this.comprasService.remove(id);
  }
    */
}
