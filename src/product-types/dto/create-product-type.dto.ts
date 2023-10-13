
import { IsNotEmpty, IsString} from "class-validator"

export class CreateProductTypeDto {
    @IsNotEmpty({message:'Please enter product description'})
    @IsString({message: 'Solo se acepta una cadena de texto'})
    description:string
}


