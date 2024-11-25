// dto/resposta-frete-transformada.dto.ts
export class ReturnFreteMelhorEnvioDto {
    nomeTransportadora: string;
    preco: number;
    moeda: string;
    tempo_de_entrega: number;
    empresa: string;
    logoTransportadora: string;
    erro?: string;  
  }
  