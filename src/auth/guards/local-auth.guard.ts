import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Adptando o passport para receber JSON
    const { email, senha } = request.body;
    request.body.username = email; // Mapeia email para username
    request.body.password = senha; // Mapeia senha para password

    console.log(`Email:${email}, Senha:${senha}`);
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message || 'Unauthorized');
    }

    return user;
  }
}
