import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuariosRepository } from './dto/repositories/usuarios.repository';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosRepository, PrismaService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
