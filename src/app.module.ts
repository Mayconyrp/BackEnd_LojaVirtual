import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { EnderecoModule } from './endereco/enderecos.module';
import { CorreiosModule } from './correios/correios.module';
import { MelhorEnvioModule } from './melhor_envio/melhor_envio.module';

@Module({
  imports: [UsuariosModule, CategoriasModule, ProdutosModule, AuthModule, EnderecoModule, CorreiosModule, MelhorEnvioModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
