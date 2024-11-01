import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
