import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { EnderecosRepository } from './repositories/enderecos.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CorreiosModule } from 'src/correios/correios.module';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '30d' }, 
    }),
  CorreiosModule],
  controllers: [EnderecosController],
  providers: [EnderecosService,EnderecosRepository,PrismaService],
})
export class EnderecoModule {}
