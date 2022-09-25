import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PRODUCT_MODEL } from '../common';
import { Product } from './entities';
import { LeanDocument, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_MODEL) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {
    const product = await new this.productModel(createProductDto).save();
    return convertProduct(product.toObject());
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => convertProduct(product.toObject()));
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.findById(id);
    return convertProduct(product?.toObject());
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
      await this.productModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not delete product');
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
