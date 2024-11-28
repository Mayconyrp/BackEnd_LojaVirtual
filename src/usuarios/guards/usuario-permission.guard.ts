import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/roles/enums/role.enum';

@Injectable()
export class UsuarioPermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // ID do usuário autenticado
    const idParam = Number(request.params.id); // ID do usuário na URL
    
    // Verifica se o método permite alteração de dados do próprio usuário
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || roles.includes(UserType.User)) {
      if (userId !== idParam) {
        throw new ForbiddenException('Você não pode alterar ou excluir os dados de outro usuário.');
      }
    }

    return true;
  }
}
