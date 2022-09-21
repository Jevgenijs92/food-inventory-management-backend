import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_MODEL } from '../common';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_MODEL) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {
    return new this.productModel(createProductDto).save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate({
        path: 'ingredients.ingredient',
      })
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel
        .findById(id)
        .populate({
          path: 'ingredients.ingredient',
          select: 'id name price unit pricePerUnit',
        })
        .orFail()
        .exec();
      const result = product?.toObject();
      const ingredients = result.ingredients?.map((entry) => ({
        ingredient: entry.ingredient,
        quantity: entry.quantity,
        price: entry.ingredient.price * entry.quantity,
      }));
      return {
        ...result,
        ingredients,
        price: ingredients.reduce((sum, a) => sum + a.price, 0),
      };
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find product');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel
        .findById(id)
        .orFail()
        .exec();
      Object.assign(updatedProduct, updateProductDto);
      return await updatedProduct.save();
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update product');
    }
  }

  async remove(id: string) {
    try {
      await this.productModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find product');
    }
  }
}
