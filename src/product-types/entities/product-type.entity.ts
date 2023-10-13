
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    description:string;

    @CreateDateColumn()
    create_at

    @UpdateDateColumn()
    update_at

    @DeleteDateColumn()
    deleted_at

    @OneToMany(() => Product, (product) => product.product_type)
    product: Product[]
}

