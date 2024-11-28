import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotaFiscalService } from './utils/nota-fiscal.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  ],
  controllers: [ComprasController],
  providers: [ComprasService, PrismaService, NotaFiscalService],
})
export class ComprasModule {}
