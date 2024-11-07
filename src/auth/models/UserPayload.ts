import { UserType } from "src/roles/enums/role.enum";

export interface UserPayload {
  sub: number;
  email: string;
  nome: string;
  type_user: UserType;
  iat?: number;
  exp?: number;
}
