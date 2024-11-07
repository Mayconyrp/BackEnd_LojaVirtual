import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasRepository } from './repositories/categorias.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  ],  controllers: [CategoriasController],
  providers: [CategoriasService, CategoriasRepository, PrismaService],
})
export class CategoriasModule {}
