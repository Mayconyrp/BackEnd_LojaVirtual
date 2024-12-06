import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecosDto } from './dto/create-enderecos.dto';
import { UpdateEnderecosDto } from './dto/update-enderecos.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { UserType } from 'src/roles/enums/role.enum';
import { EnderecoPermissionGuard } from './guards/endereco-permission.guard';  

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, EnderecoPermissionGuard)
  @Roles(UserType.User)
  @Post()
  create(@Request() req, @Body() createEnderecosDto: CreateEnderecosDto) {
    return this.enderecosService.create(createEnderecosDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Get('/me')
  async findAllByUser(@Request() req) {
    const usuarioId = req.user.id;
    return this.enderecosService.findAllByUsuarioId(usuarioId);
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get('/usuario/:id')
  async findAllByUserId(@Param('id') id: number) {
    return this.enderecosService.findAllByUsuarioId(id);
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, EnderecoPermissionGuard)  
  @Roles(UserType.User)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: number, @Body() updateEnderecosDto: UpdateEnderecosDto) {
    return this.enderecosService.update(id, updateEnderecosDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, EnderecoPermissionGuard) 
  @Roles(UserType.User)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    return this.enderecosService.remove(id);
  }
}

//Outras Querys
/*@ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Get()
  findAll(@Request() req) {
    return this.enderecosService.findAll();
  }

  /*@ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard, EnderecoPermissionGuard) 
  @Roles(UserType.User)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    return this.enderecosService.findOne(id);
  }
*/