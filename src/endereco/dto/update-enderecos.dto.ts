import { PartialType } from '@nestjs/swagger';
import { CreateEnderecosDto } from './create-enderecos.dto';

export class UpdateEnderecosDto extends PartialType(CreateEnderecosDto) {}
