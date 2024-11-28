import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ProdutosRepository } from './repositories/produtos.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutosRepository, PrismaService],
  exports: [ProdutosService], 

  
})
export class ProdutosModule {}
