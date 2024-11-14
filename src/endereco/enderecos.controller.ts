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
import { EnderecosService } from './enderecos.service';
import { CreateEnderecosDto } from './dto/create-enderecos.dto';
import { UpdateEnderecosDto } from './dto/update-enderecos.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guards';
import { UserType } from 'src/roles/enums/role.enum';

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Post()
  create(@Body() createEnderecosDto: CreateEnderecosDto) {
    return this.enderecosService.create(createEnderecosDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enderecosService.findOne(id);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEnderecosDto: UpdateEnderecosDto) {
    return this.enderecosService.update(id, updateEnderecosDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(RolesGuard)
  @Roles(UserType.User)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enderecosService.remove(id);
  }
}
