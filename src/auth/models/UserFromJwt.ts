import { UserType } from "src/roles/enums/role.enum";

export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
  type_user: UserType;
  
}
