import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('correios')
@Controller('correios')
export class CorreiosController {
    constructor(
        private readonly correiosService: CorreiosService
    ) { }

    @IsPublic()
    @Get('/:cep')
    async findAll(@Param('cep') cep: string): Promise<any> {
        return this.correiosService.procurarPeloCep(cep);
    }
}
