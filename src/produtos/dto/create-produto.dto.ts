import { IsString, IsInt, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  imagem: string;

  @IsString()
  @IsOptional()
  descricao?: string; 

  @IsNumber()
  preco: number;

  @IsString()
  @IsOptional()
  cor?: string; 

  @IsInt()
  estoque: number;

  @IsBoolean()
  disponivel: boolean;

  @IsInt()
  categoriaId: number;

  @IsInt()
  height: number;

  @IsInt()
  width: number;

  @IsInt()
  length: number;

  @IsInt()
  weight: number;
}
