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
    .setTitle('API de E-Commerce para Estudos')
    .setDescription(
      'Esta API foi desenvolvida para fins educacionais, proporcionando uma plataforma abrangente para o gerenciamento de usuários, categorias e produtos. Além disso, incorpora níveis de acesso, autenticação e segue um padrão de arquitetura moderno, permitindo uma imersão prática em conceitos fundamentais de desenvolvimento de software.',
    )
    .setVersion('1.0')
    .addTag('usuarios', 'Endpoints para gerenciamento de usuários.')
    .addTag('categorias', 'Endpoints para gerenciar categorias de produtos.')
    .addTag(
      'produtos',
      'Endpoints para gerenciar produtos, incluindo criação, atualizações e recuperação.',
    )
    .addTag('auth', 'Endpoints para autenticação e autorização de usuários.')
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

  const port = 3000;
  await app.listen(port);
  console.log(`Porta Do Swagger: http://localhost:${port}/api`);
}
bootstrap();
