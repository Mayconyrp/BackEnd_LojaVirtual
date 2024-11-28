import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ForbiddenException, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UserType } from 'src/roles/enums/role.enum';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { UsuarioPermissionGuard } from './guards/usuario-permission.guard'; // Importando o guard

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post('/admin')
  createAdmin(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createAdmin(createUsuarioDto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiBearerAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiBearerAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get('/email/:email')
  findEmail(@Param('email') email: string) {
    return this.usuariosService.findEmail(email);
  }

  @ApiBearerAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @ApiBearerAuth('Authorization')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard, UsuarioPermissionGuard) 
  @Roles(UserType.User)
  @Patch(':id')
  update(@Request() req, @Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @ApiBearerAuth('Authorization')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard, UsuarioPermissionGuard)
  @Roles(UserType.User)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
