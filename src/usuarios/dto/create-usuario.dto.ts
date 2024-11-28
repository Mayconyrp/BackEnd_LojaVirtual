import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, e um número ou caractere especial.',
  })
  senha: string;
    
  /* @IsDate()
  criadoEm: Date;

  @IsDate()
  atualizadoEm: Date;
  */
}
/*
{
  "cpf": "111.333.222-45",
  "email": "teste@gmail.com",
  "name": "Tenente",
  "senha": "Testando@123"
}
  */
