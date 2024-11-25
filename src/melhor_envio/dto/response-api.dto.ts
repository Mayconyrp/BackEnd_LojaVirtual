import { IsString, IsNumber, IsOptional } from 'class-validator';

export class RespostaAPIDTO {
  @IsString()
  name: string;

  @IsString() 
  price: string | number;

  @IsString()
  currency: string;

  @IsNumber()
  delivery_time: number;

  company: {
    name: string;

    picture: string;
  };

  @IsOptional()
  @IsString()
  error?: string;
}
