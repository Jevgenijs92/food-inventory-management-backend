import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { INGREDIENT_MODEL, PRODUCT_MODEL } from '../common';
import { Model, Types } from 'mongoose';
import { Ingredient } from './entities/ingredient.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject(INGREDIENT_MODEL) private ingredientModel: Model<Ingredient>,
    @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return new this.ingredientModel(createIngredientDto).save();
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    try {
      return await this.ingredientModel.findById(id).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find ingredient');
    }
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const updatedIngredient = await this.findOne(id);
    try {
      Object.assign(updatedIngredient, updateIngredientDto);
      return await updatedIngredient.save();
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update ingredient');
    }
  }

  async remove(id: string) {
    const product = await this.productModel
      .findOne({ 'ingredients.ingredient': new Types.ObjectId(id) })
      .exec();
    if (product) {
      throw new ConflictException(
        'Could not delete ingredient because it is assigned to product',
      );
    }

    try {
      await this.ingredientModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find ingredient');
    }
  }
}
