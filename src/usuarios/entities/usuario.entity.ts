import { Usuario } from '@prisma/client';

export class UsuarioEntity implements Usuario {
  id: number;
  cpf: string;
  email: string;
  name: string;
  senha: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
