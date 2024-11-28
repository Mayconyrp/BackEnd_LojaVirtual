import { Compra } from '@prisma/client'
export class CompraEntity implements Compra {
    id: number;
    notaFiscal: string;
    tipoPagamento: string;
    produtoId: number;
    usuarioId: number;
    dataCompra: Date;
    nomeTransportadora: string;
    precoFrete: number;
    tempoEntrega: string;
    empresaFrete: string;
    logoTransportadora: string;
}
