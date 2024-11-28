
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotaFiscalService {
  // Função para gerar a nota fiscal aleatória
  gerarNotaFiscal(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let notaFiscal = '';
    for (let i = 0; i < 4; i++) {
      notaFiscal += Array(5)
        .fill('')
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
      if (i < 3) notaFiscal += '-'; 
    }
    return notaFiscal;
  }
}
