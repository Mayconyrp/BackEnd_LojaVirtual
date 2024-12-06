import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar o ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar o Swagger
  const config = new DocumentBuilder()
    .setTitle('API E-Commerce')
    .setDescription(
      'Esta API foi desenvolvida para fins educacionais, proporcionando uma plataforma abrangente para o gerenciamento de usuários, categorias e produtos. Além disso, incorpora níveis de acesso, autenticação e segue um padrão de arquitetura moderno, permitindo uma imersão prática em conceitos fundamentais de desenvolvimento de software.',
    )
    .setVersion('1.0')
    .addTag('MyProfile')
    .addTag('auth', 'Endpoints para autenticar e receber o token.')
    .addTag('usuarios', 'Endpoints para cadastro e gerenciamento de usuários.')
    .addTag('categorias', 'Endpoints para gerenciar categorias de produtos.')
    .addTag(
      'produtos',
      'Endpoints para gerenciar produtos, incluindo criação, atualizações e recuperação.',
    )
    .addTag('enderecos', 'Endpoints para autenticação e autorização de usuários.')
    .addTag('correios')
    .addTag('melhor_envio')
    .addTag('compras')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'Authorization', // nome da chave para referência
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3001', // Permite requisições deste domínio específico
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir o uso de cookies/sessões
  });

  const port = 8080;
  await app.listen(port);
  console.log(`Porta Do Swagger: http://localhost:${port}/api`);
}
bootstrap();
