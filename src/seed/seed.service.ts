import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor( 
    private readonly productsService: ProductsService ,

    @InjectRepository( User )
    private readonly userRepository: Repository<User>
    
  ) {}


  async runSeed() {

    await this.deleteTables();
    const adminUser = await this.insertUsers();
    
    await this.insertNewProducts( adminUser );

    return `SEED EXECUTE`;
  }

  private async deleteTables() {

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
    
  }
  
  private async insertUsers() {

    const seedUser = initialData.users;

    const users: User[] = [];

    seedUser.forEach( user => {
      users.push( this.userRepository.create(user) );
    });

    const dbUsers = await this.userRepository.save( users );

    return dbUsers[0];
  }
  

  private async insertNewProducts( user: User) {
    await this.productsService.deleteAllProducts()

    const products = initialData.products;

    const insertPromises = [];

    products.forEach( product => {
      insertPromises.push( this.productsService.create( product, user ) );
    })

    const results = await Promise.all( insertPromises );
    
    return true;
  }

}
