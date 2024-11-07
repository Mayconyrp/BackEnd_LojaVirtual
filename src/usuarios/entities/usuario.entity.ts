import { UserType, Usuario } from '@prisma/client';

export class UsuarioEntity implements Usuario {
  id: number;
  cpf: string;
  email: string;
  name: string;
  senha: string;
  type_user: UserType;
  criadoEm: Date;
  atualizadoEm: Date;
}
