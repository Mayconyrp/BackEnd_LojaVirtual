import { Produto } from '@prisma/client';

export class ProdutoEntity implements Produto {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  preco: number;
  tamanho: string;
  cor: string;
  estoque: number;
  disponivel: boolean;
  categoriaId: number;
}
