import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductType } from 'src/product-types/entities/product-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Añade Product a las entidades disponibles
    TypeOrmModule.forFeature([ProductType]), // Añade ProductType a las entidades disponibles
  ],
  
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
