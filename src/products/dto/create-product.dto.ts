import { IsInt, IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:'El campo product_type_id es requerido'})
    @IsInt({message:'Formato invalido, por favor digite un numero'})
    product_type_id:number

    @IsNotEmpty({message:'El campo description es requerido'})
    description:string
}
