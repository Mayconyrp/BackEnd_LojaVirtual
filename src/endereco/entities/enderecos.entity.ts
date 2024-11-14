import { Endereco } from '@prisma/client';


export class EnderecosEntity implements Endereco {
    id: number;
    cep: string;
    cidade: string;
    estado: string;
    rua: string;
    numero: string;
    complemento: string;
    usuarioId: number;
}
