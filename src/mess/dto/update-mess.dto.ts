// src/mess/dto/update-mess.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMessDto } from './mess.dto';

export class UpdateMessDto extends PartialType(CreateMessDto) { }
