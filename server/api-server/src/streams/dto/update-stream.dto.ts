import { PartialType } from '@nestjs/mapped-types';
import { CreateStreamDto } from './create-stream.dto';

export class UpdateStreamDto extends PartialType(CreateStreamDto) {}
