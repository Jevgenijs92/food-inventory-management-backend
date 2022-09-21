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
import { LeanDocument, Model } from 'mongoose';

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
    const product = await this.findById(id);
    return calculatePrice(product?.toObject());
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.findById(id);
    try {
      Object.assign(updatedProduct, updateProductDto);
      await updatedProduct.save();
      return this.findOne(id);
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update product');
    }
  }

  async remove(id: string) {
    try {
      return await this.productModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find product');
    }
  }

  private async findById(id: string) {
    try {
      return await this.productModel.findById(id).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find product');
    }
  }
}

const calculatePrice = (product: LeanDocument<Product>): Product => {
  const ingredients = product.ingredients?.map((entry) => ({
    ingredient: entry.ingredient,
    quantity: entry.quantity,
    price: entry.ingredient.price * entry.quantity,
  }));
  return {
    ...product,
    ingredients,
    price: ingredients.reduce((sum, a) => sum + a.price, 0),
  };
};
