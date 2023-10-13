import { Module } from '@nestjs/common';
import { MovementTypesService } from './movement_types.service';
import { MovementTypesController } from './movement_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementType } from './entities/movement_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementType])],
  controllers: [MovementTypesController],
  providers: [MovementTypesService],
})
export class MovementTypesModule {}
