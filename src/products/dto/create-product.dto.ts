import { ApiProperty } from "@nestjs/swagger";
import { 
    IsArray, 
    IsIn, 
    IsInt, 
    IsNumber, 
    IsOptional, 
    IsPositive, 
    IsString, 
    MinLength 
} from "class-validator";


export class CreateProductDto {

    @ApiProperty({
        description: "Product title (unique)",
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: "Product price",
        nullable: true,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: "Product description",
        nullable: true,
        example: "Anim reprehenderit nulla in anim mollit minim irure commodo"
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: "Product SLUG - for SEO",
        example: "t_shirt_teslo",
        default: null
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({ 
        description: "Product stock",
        example: 10,
        default: 0,
        nullable: true
     })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({ 
        description: "Product sizes",
        example: ["M", "XL", "XXL"],
        nullable: false
    })
    @IsString({ each: true})
    @IsArray()
    sizes: string[];

    @ApiProperty({ 
        description: "Product gender",
        example: "men or women or kid orunisex",
        nullable: false
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({ 
        description: "Product tags",
        example: ["shirt", "kid"],
        nullable: false
    })
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: "Product images",
        example: ["http://image.jpg"],
        nullable: true
    })
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    images?: string[];
    
}
