import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotaFiscalService } from './utils/nota-fiscal.service';
import { JwtModule } from '@nestjs/jwt';
import { ComprasRepository } from './repositories/compras.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  ],
  controllers: [ComprasController],
  providers: [ComprasService, PrismaService, NotaFiscalService,ComprasRepository],
})
export class ComprasModule {}
