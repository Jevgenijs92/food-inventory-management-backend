import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PRODUCT_MODEL } from '../common';
import { Product } from './entities';
import { LeanDocument, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_MODEL) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto, userId: string): Promise<Product | null> {
    const product = await new this.productModel({ ...createProductDto, userId }).save();
    return convertProduct(product.toObject());
  }

  async findAll(userId: string): Promise<Product[]> {
    const products = await this.productModel.find({ userId }).exec();
    return products.map((product) => convertProduct(product.toObject()));
  }

  async findOne(id: string, userId: string): Promise<Product> {
    const product = await this.findById(id, userId);
    return convertProduct(product?.toObject());
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const updatedProduct = await this.findById(id, userId);
    try {
      Object.assign(updatedProduct, updateProductDto);
      await updatedProduct.save();
      return this.findOne(id, userId);
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update product');
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.productModel.deleteOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not delete product');
    }
  }

  private async findById(id: string, userId: string) {
    try {
      return await this.productModel.findOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find product');
    }
  }
}

const convertProduct = (product: LeanDocument<Product>): Product => {
  const ingredients = product.ingredients?.map((entry) => ({
    ingredient: entry.ingredient,
    quantity: entry.quantity,
    price: Math.round(entry.ingredient.pricePerUnit * entry.quantity * 100) / 100,
  }));
  return {
    ...product,
    ingredients,
    price: ingredients.reduce((sum, a) => sum + a.price, 0),
  };
};
