// create-endereco.dto.ts
import { IsInt, IsNotEmpty, IsString, Length, Max, Matches, IsOptional } from 'class-validator';

export class CreateEnderecosDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$/, { message: 'CEP must be in the format XXXXX-XXX' })
  cep: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  rua: string;

  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  cidade: string;
 
  @IsString()
  @IsOptional()
  complemento: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 2) // Limite a 2 caracteres para estados brasileiros
  estado: string;

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;
}
