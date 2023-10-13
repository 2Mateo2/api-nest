import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Product } from 'src/products/entities/product.entity';
import { MovementType } from 'src/movement_types/entities/movement_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movement]),
            TypeOrmModule.forFeature([Product]),
            TypeOrmModule.forFeature([MovementType])],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
