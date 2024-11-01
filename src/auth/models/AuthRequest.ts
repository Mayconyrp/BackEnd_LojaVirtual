import { Request } from 'express';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';

export interface AuthRequest extends Request {
  user: UsuarioEntity;
}
