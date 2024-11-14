export class ReturnCep {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ddd: string;
    erro?: string;
  
    constructor(data: Partial<ReturnCep>) {
      this.cep = data.cep || '';
      this.logradouro = data.logradouro || '';
      this.complemento = data.complemento || '';
      this.bairro = data.bairro || '';
      this.localidade = data.localidade || '';
      this.uf = data.uf || '';
      this.ddd = data.ddd || '';
      this.erro = data.erro;
    }
  }
  