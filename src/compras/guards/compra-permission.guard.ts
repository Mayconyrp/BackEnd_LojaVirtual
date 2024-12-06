import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ComprasService } from '../compras.service';

@Injectable()
export class CompraPermissionGuard implements CanActivate {
  constructor(private readonly comprasService: ComprasService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuarioId = request.user.id;
    const isCreating = request.method === 'POST';
    const isUpdating = request.method === 'PATCH';

    if (isCreating) {
      const { usuarioId: bodyUsuarioId } = request.body;

      if (bodyUsuarioId && bodyUsuarioId !== usuarioId) {
        throw new ForbiddenException('Você não pode criar uma compra para outro usuário.');
      }
    } else {
      const compraId = Number(request.params.id);
      if (isNaN(compraId)) {
        throw new BadRequestException('O ID da compra deve ser um número válido.');
      }

      const compra = await this.comprasService.findOne(compraId);
      if (!compra) {
        throw new BadRequestException('Compra não encontrado.');
      }

      if (compra.usuarioId !== usuarioId) {
        throw new ForbiddenException('Você não tem permissão para acessar ou modificar essa compra.');
      }

      if (isUpdating) {
        const { usuarioId: bodyUsuarioId } = request.body;

        if (bodyUsuarioId && bodyUsuarioId !== usuarioId) {
          throw new ForbiddenException('Você não pode alterar o usuário associado a esta compra.');
        }
      }
    }

    return true;
  }
}
