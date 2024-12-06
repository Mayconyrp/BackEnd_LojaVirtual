import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EnderecosService } from '../enderecos.service';

@Injectable()
export class EnderecoPermissionGuard implements CanActivate {
  constructor(private readonly enderecosService: EnderecosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuarioId = request.user.id; 
    const isCreating = request.method === 'POST';
    const isUpdating = request.method === 'PATCH';

    if (isCreating) {
      const { usuarioId: bodyUsuarioId } = request.body;

      if (bodyUsuarioId && bodyUsuarioId !== usuarioId) {
        throw new ForbiddenException('Você não pode criar um endereço para outro usuário.');
      }
    } else {
      // Para atualizações ou exclusões
      const enderecoId = Number(request.params.id);
      if (isNaN(enderecoId)) {
        throw new BadRequestException('O ID do endereço deve ser um número válido.');
      }

      const endereco = await this.enderecosService.findOne(enderecoId);
      if (!endereco) {
        throw new BadRequestException('Endereço não encontrado.');
      }

      if (endereco.usuarioId !== usuarioId) {
        throw new ForbiddenException('Você não tem permissão para acessar ou modificar este endereço.');
      }

      // Validação adicional para updates
      if (isUpdating) {
        const { usuarioId: bodyUsuarioId } = request.body;

        if (bodyUsuarioId && bodyUsuarioId !== usuarioId) {
          throw new ForbiddenException('Você não pode alterar o usuário associado a este endereço.');
        }
      }
    }

    return true;
  }
}
