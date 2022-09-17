import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { INGREDIENT_MODEL } from '../common';
import { Model } from 'mongoose';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject(INGREDIENT_MODEL) private ingredientModel: Model<Ingredient>,
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
    try {
      await this.ingredientModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find ingredient');
    }
  }
}
