import { Produto } from '@prisma/client';

export class ProdutoEntity implements Produto {
  id: number;
  imagem: string;
  nome: string;
  descricao: string | null;
  preco: number;
  cor: string | null;
  estoque: number;
  disponivel: boolean;
  categoriaId: number;

  height: number;
  width: number;
  length: number;
  weight: number;
}
