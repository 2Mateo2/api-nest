import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductType } from 'src/product-types/entities/product-type.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productoRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ){}

  async create(createProductDto: CreateProductDto) {
    const { product_type_id } = createProductDto;
    // Verificar si product_type_id existe en la tabla product_types 
    const productType = await this.productTypeRepository.findOne({ where: { id: product_type_id } });
  
    if (!productType) {
      throw new BadRequestException('product_type_id no existe en la tabla product_types');
    }
    // Crear el producto
    const newProduct = this.productoRepository.create(createProductDto);
    newProduct.product_type = productType; // Asigna el objeto productType al producto
    const product = await this.productoRepository.save(newProduct);
    return 'The Product has been created';
  }
  
  findAll() {
    return this.productoRepository.find()
  }

  findBy(id: number) {
    return this.productoRepository.findBy({id:id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.productoRepository.update(id, updateProductDto)
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const existingProductType = await this.findBy(id);
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.productoRepository.save(existingProductType);
    return 'The Product have been marked as deleted';
  }

}
