import { IsString } from 'class-validator';

export class CalcularPrecoDto {

  @IsString()
  cepDestino: string;

}
