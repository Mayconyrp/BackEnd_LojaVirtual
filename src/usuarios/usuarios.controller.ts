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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UserType } from 'src/roles/enums/role.enum';
import { RolesGuard } from 'src/roles/guards/roles.guards';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @IsPublic()
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get('/email/:email')
  findEmail(@Param('email') email: string) {
    return this.usuariosService.findEmail(email);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
/*
  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get('/admin/rotaAdmin')
  getRotaAdmin(): string {
    return "Rota Admin";
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Get('/user/rotaUser')
  getRotaUser(): string {
    return "Rota User";
  }
    */
}
