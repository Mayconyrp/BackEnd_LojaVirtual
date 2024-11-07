import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UserType } from 'src/roles/enums/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  login(usuario: UsuarioEntity): UserToken {
    const payload: UserPayload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.name,
      type_user: usuario.type_user as UserType

    };

    const jwtToken = this.jwtService.sign(payload);
    
    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuariosService.findEmail(email);
    console.log("Informacao do Usuario no ValidateUser",usuario)
    if (usuario) {
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
      if (isPasswordValid) {
        return {
          ...usuario,
          
          senha: undefined,
        };
      }
    }
    throw new Error('Erro.');
  }
}
