import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementTypeDto } from './create-movement_type.dto';

export class UpdateMovementTypeDto extends PartialType(CreateMovementTypeDto) {}
