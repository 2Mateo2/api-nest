import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductType } from './product-types/entities/product-type.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { MovementTypesModule } from './movement_types/movement_types.module';
import { MovementType } from './movement_types/entities/movement_type.entity';
import { MovementModule } from './movement/movement.module';
import { Movement } from './movement/entities/movement.entity';

@Module({
  imports: [ProductTypesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '',
      database: 'prueba',
      entities: [ ProductType, Product, MovementType, Movement ],
      synchronize: false,
    }),ProductsModule, MovementTypesModule, MovementModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
