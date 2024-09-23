import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  imagem: string;

  @IsString()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsString()
  tamanho: string;

  @IsString()
  cor: string;

  @IsInt()
  estoque: number;

  @IsBoolean()
  disponivel: boolean;

  @IsInt()
  categoriaId: number;
}
