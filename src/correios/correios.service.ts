import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReturnCep } from './dto/return-cep.dto';

const URL_CORREIOS = 'https://viacep.com.br/ws/{CEP}/json/';

@Injectable()
export class CorreiosService {

  constructor(private readonly httpService: HttpService) { }

  procurarPeloCep(cep: string): Promise<ReturnCep> {
    const url = URL_CORREIOS.replace('{CEP}', cep);

    console.log(`Consultando CEP na URL: ${url}`);

    return this.httpService.axiosRef
      .get(url)
      .then((result) => {
        console.log('Resposta da API:', result.data);

        if (result.data.erro) {
          console.log('CEP inválido:', cep);
          throw new BadRequestException('CEP inválido ou não encontrado.');
        }

        return new ReturnCep(result.data);
      })
      .catch((error: AxiosError) => {
        console.error('Erro ao consultar o CEP:', error.message);
        throw new BadRequestException(`Erro na requisição de CEP: ${error.message}`);
      });
  }

}