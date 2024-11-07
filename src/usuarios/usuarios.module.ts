import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuariosRepository } from './dto/repositories/usuarios.repository';
import { JwtModule } from '@nestjs/jwt';  // Importando o JwtModule

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosRepository, PrismaService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
