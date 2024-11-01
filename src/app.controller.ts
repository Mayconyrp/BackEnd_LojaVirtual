import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UsuarioEntity } from './usuarios/entities/usuario.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiBearerAuth('Authorization')
  @Get('me')
  getMe(@CurrentUser() user: UsuarioEntity) {
    return user;
  }
}
