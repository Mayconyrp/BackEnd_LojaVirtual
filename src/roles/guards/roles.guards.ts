import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/auth/models/UserPayload';
import { UserType } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector, 
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // Se não houver roles exigidas, permite o acesso
        }

        const { authorization } = context.switchToHttp().getRequest().headers;
        
        if (!authorization) {
            throw new ForbiddenException('Authorization header is missing');
        }

        const token = authorization.split(' ')[1]; // Extrai o token após "Bearer "
        if (!token) {
            throw new ForbiddenException('Token is missing');
        }

        try {
            const userPayload: UserPayload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

            if (!userPayload) {
                throw new ForbiddenException('Invalid token');
            }

            // Valida o type_user do payload contra os requiredRoles
            if (!requiredRoles.includes(userPayload.type_user)) {
                throw new ForbiddenException('You do not have permission to access this resource');
            }

            return true; // Permite o acesso se o tipo de usuário for válido
        } catch (error) {
            console.error("JWT Verification failed:", error);
            throw new ForbiddenException('Token is invalid or expired');
        }
    }
}
