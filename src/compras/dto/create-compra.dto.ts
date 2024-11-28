import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, Min, MaxLength, IsEnum } from 'class-validator';

export class CreateCompraDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    tipoPagamento: string;

    @IsNumber()
    produtoId: number;

    @IsNumber()
    @Min(1)
    usuarioId: number;

    @IsDateString()
    dataCompra: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nomeTransportadora: string;

    @IsNumber()
    @Min(0)
    precoFrete: number;

    @IsString()
    @IsNotEmpty()
    tempoEntrega: string;

    @IsString()
    @IsNotEmpty()
    empresaFrete: string;

    @IsString()
    @IsOptional()  
    logoTransportadora: string;

    @IsString()
    @IsNotEmpty()
    cepDestino: string;
}
