import { Injectable } from '@nestjs/common';
import { CreateEnderecosDto } from './dto/create-enderecos.dto';
import { UpdateEnderecosDto } from './dto/update-enderecos.dto';
import { EnderecosRepository } from './repositories/enderecos.repository';
import { CorreiosService } from '../correios/correios.service'; // Importa o serviço CorreiosService
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class EnderecosService {
  constructor(
    private readonly repository: EnderecosRepository,
    private readonly correiosService: CorreiosService, 
  ) {}

  async create(createEnderecosDto: CreateEnderecosDto) {
    console.log('Criando endereço com o CEP:', createEnderecosDto.cep);

    const cepValido = await this.correiosService.procurarPeloCep(createEnderecosDto.cep)
      .catch((error) => {
        console.error('Erro ao procurar CEP:', error);
        throw new BadRequestException('CEP inválido ou não encontrado.');
      });

    console.log('Resultado da validação do CEP:', cepValido);
    
    if (createEnderecosDto.cidade !== cepValido.localidade) {
      throw new BadRequestException(`A cidade fornecida (${createEnderecosDto.cidade}) não corresponde à cidade do CEP (${cepValido.localidade}).`);
    }

    if (createEnderecosDto.estado !== cepValido.uf) {
      throw new BadRequestException(`O estado fornecido (${createEnderecosDto.estado}) não corresponde ao estado do CEP (${cepValido.uf}).`);
    }

    const enderecoCriado = await this.repository.create(createEnderecosDto);
    console.log('Endereço criado com sucesso:', enderecoCriado);

    return enderecoCriado;
  }
  findAll() {
    return this.repository.findAll();
  }
  
  async findAllByUsuarioId(usuarioId: number) {
    return this.repository.findAllByUsuarioId(usuarioId);
  }
  
  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateEnderecosDto: UpdateEnderecosDto) {
    return this.repository.update(id, updateEnderecosDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
