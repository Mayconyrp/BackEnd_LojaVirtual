import { Module } from '@nestjs/common';
import { MelhorEnvioService } from './melhor_envio.service';
import { MelhorEnvioController } from './melhor_envio.controller';
import { HttpModule } from '@nestjs/axios';
import { ProdutosModule } from 'src/produtos/produtos.module';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
  ProdutosModule
  ],
  controllers: [MelhorEnvioController],
  providers: [MelhorEnvioService],


})
export class MelhorEnvioModule { }
