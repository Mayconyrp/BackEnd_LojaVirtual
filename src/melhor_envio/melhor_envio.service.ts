import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CalcularPrecoDto } from './dto/calcular-preco.dto';
import { RespostaAPIDTO } from './dto/response-api.dto'; // Usando o DTO original
import { ReturnFreteMelhorEnvioDto } from './dto/return-frete.dto'; // Novo DTO de resposta transformada
import { map } from 'rxjs';

const dadosFixos = {
  cepOrigem: '50030-230', //Cep do Porto Digital, Recife - PE
  altura: 10, 
  largura: 20,
  comprimento: 30, 
  peso: 5,
};

@Injectable()
export class MelhorEnvioService {

  constructor(private readonly httpService: HttpService) { }

  calcularFrete(calcularPrecoDto: CalcularPrecoDto): Promise<ReturnFreteMelhorEnvioDto[]> {
    const token = process.env.MELHOR_ENVIO_TOKEN;
    const URL_MELHOR_ENVIO = process.env.MELHOR_ENVIO_URL;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      from: { postal_code: dadosFixos.cepOrigem }, 
      to: { postal_code: calcularPrecoDto.cepDestino },
      package: {
        height: dadosFixos.altura, 
        width: dadosFixos.largura, 
        length: dadosFixos.comprimento, 
        weight: dadosFixos.peso,
      },
    };

    return this.httpService.post<RespostaAPIDTO[]>(URL_MELHOR_ENVIO, body, { headers })
      .pipe(
        map((response) => response.data.map((frete) => ({
          nomeTransportadora: frete.name,
          preco: typeof frete.price === 'string' ? parseFloat(frete.price) : frete.price,
          moeda: frete.currency,
          tempo_de_entrega: frete.delivery_time,
          empresa: frete.company.name,
          logoTransportadora: frete.company.picture,
          erro: frete.error ? frete.error : undefined,
        })))
      )
      .toPromise()
      .catch((error: any) => {
        console.error('Erro ao calcular frete:', error.response?.data || error);
        throw new Error('Erro ao calcular frete');
      });
  }
}
