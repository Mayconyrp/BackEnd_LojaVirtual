import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CalcularPrecoDto } from './dto/calcular-preco.dto';
import { RespostaAPIDTO } from './dto/response-api.dto'; 
import { ReturnFreteMelhorEnvioDto } from './dto/return-frete.dto'; 
import { map } from 'rxjs';
import { ProdutosService } from 'src/produtos/produtos.service';

const dadosFixos = {
  cepOrigem: '50030-230', //Cep do Porto Digital, Recife - PE
};

@Injectable()
export class MelhorEnvioService {

  constructor(private readonly httpService: HttpService, private readonly produtoService: ProdutosService) { }

  async calcularFrete(produtoId: number, calcularPrecoDto: CalcularPrecoDto): Promise<ReturnFreteMelhorEnvioDto[]> {
    const token = process.env.MELHOR_ENVIO_TOKEN;
    const URL_MELHOR_ENVIO = process.env.MELHOR_ENVIO_URL;

    const produto = await this.produtoService.findOne(produtoId); 

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      from: { postal_code: dadosFixos.cepOrigem },
      to: { postal_code: calcularPrecoDto.cepDestino },
      package: {
        height: produto.height,
        width: produto.width,
        length: produto.length,
        weight: produto.weight,
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
