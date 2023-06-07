import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: "products"  })
export class Product {

    @ApiProperty({ 
        example: "071402b3-aec0-4d14-92fc-9cbe910652f2",
        description: "Product ID",
        uniqueItems: true
     })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ 
        example: "T-Shirt Teslo",
        description: "Product Title",
     })
    @Column('text', {
        unique: true   
    })
    title: string;

    @ApiProperty({ 
        example: 0,
        description: "Product price",
     })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ 
        example: "Anim reprehenderit nulla in anim mollit minim irure commodo",
        description: "Product description",
        default: null
     })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @ApiProperty({ 
        example: "t_shirt_teslo",
        description: "Product SLUG - for SEO",
        default: null
     })
    @Column('text', {
        unique: true    
    })
    slug: string;

    @ApiProperty({ 
        example: 10,
        description: "Product stock",
        default: 0
     })
    @Column('int', {
        default: 0
    })
    stock: number

    @ApiProperty({ 
        example: ["M", "XL", "XXL"],
        description: "Product sizes",
     })
    @Column('text', {
        array: true
    })
    sizes: string[];
    
    @ApiProperty({ 
        example: "men",
        description: "Product gender",
    })
    @Column('text')
    gender: string;

    @ApiProperty({ 
        example: ["shirt", "kid"],
        description: "Product tags",
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    // images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {
       
        if ( !this.slug ) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ","_")
            .replaceAll("'", "")
    }
    
    @BeforeUpdate()
    checkSlugUpdate() {

        if ( this.slug ) {
            this.slug = this.slug
                .toLowerCase()
                .replaceAll(" ","_")
                .replaceAll("'", "")
        }
    }

    
}
