import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UsuarioEntity } from './usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from './auth/decorators/is-public.decorator';

@ApiTags('MyProfile')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiBearerAuth('Authorization')
  @Get('Me')
  getMe(@CurrentUser() user: UsuarioEntity) {
    return user;
  }
}
