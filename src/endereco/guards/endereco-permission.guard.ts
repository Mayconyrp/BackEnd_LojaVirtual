import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EnderecosService } from '../enderecos.service';

@Injectable()
export class EnderecoPermissionGuard implements CanActivate {
  constructor(private readonly enderecosService: EnderecosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usuarioId = request.user.id; 
    const isCreating = request.method === 'POST';  

    if (!isCreating) {
      const enderecoId = Number(request.params.id); 

      if (isNaN(enderecoId)) {
        throw new BadRequestException('O ID do endereço deve ser um número válido.');
      }

      const endereco = await this.enderecosService.findOne(enderecoId);
      if (endereco.usuarioId !== usuarioId) {
        throw new ForbiddenException('Você não tem permissão para acessar ou modificar este endereço.');
      }
    }

    return true; 
  }
}
