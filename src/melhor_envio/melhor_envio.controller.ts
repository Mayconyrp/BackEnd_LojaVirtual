import { Controller, Post, Body, Param } from '@nestjs/common';
import { MelhorEnvioService } from './melhor_envio.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CalcularPrecoDto } from './dto/calcular-preco.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('melhor_envio')
@Controller('melhor-envio')
export class MelhorEnvioController {
  constructor(private readonly melhorEnvioService: MelhorEnvioService) {}

  @IsPublic()
  @Post('/preco/:produtoId')
  async calcularPrecoPrazo(
    @Param('produtoId') produtoId: number, 
    @Body() calcularPrecoDto: CalcularPrecoDto, 
  ): Promise<any> { 
    return this.melhorEnvioService.calcularFrete(produtoId, calcularPrecoDto); 
  }
}
