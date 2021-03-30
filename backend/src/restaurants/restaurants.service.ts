import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { Users } from '@users/entities/user.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async createRestaurant(
    owner: Users,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurants = this.restaurants.create(createRestaurantInput);
      newRestaurants.owner = owner;
      const categoryName = createRestaurantInput.categoryName
        .trim() // trim does stripping spaces at start and end
        .toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');
      let category = await this.categories.findOne({ slug: categorySlug });
      if (!category)
        category = await this.categories.save(
          this.categories.create({ slug: categorySlug, name: categoryName }),
        );
      newRestaurants.category = category;
      await this.restaurants.save(newRestaurants);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
