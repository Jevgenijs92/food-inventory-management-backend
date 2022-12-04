import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto, UpdateIngredientDto } from './dto';
import { INGREDIENT_MODEL, PRODUCT_MODEL } from '../common';
import { Model, Types } from 'mongoose';
import { Ingredient } from './entities';
import { Product } from '../products';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject(INGREDIENT_MODEL) private ingredientModel: Model<Ingredient>,
    @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto, userId: string): Promise<Ingredient> {
    return new this.ingredientModel({
      ...createIngredientDto,
      userId,
    }).save();
  }

  async findAll(userId: string): Promise<Ingredient[]> {
    return this.ingredientModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Ingredient> {
    try {
      return await this.ingredientModel.findOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find ingredient');
    }
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto, userId: string): Promise<Ingredient> {
    const updatedIngredient = await this.findOne(id, userId);
    try {
      Object.assign(updatedIngredient, updateIngredientDto);
      return await updatedIngredient.save();
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update ingredient');
    }
  }

  async remove(id: string, userId: string) {
    const product = await this.productModel
      .findOne({ 'ingredients.ingredient': new Types.ObjectId(id), userId })
      .exec();
    if (product) {
      throw new ConflictException('CONFLICT_INGREDIENT_ASSIGNED_TO_PRODUCT');
    }

    try {
      await this.ingredientModel.deleteOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find ingredient');
    }
  }
}
