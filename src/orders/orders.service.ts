import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_MODEL } from '../common';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_MODEL) private orderModel: Model<Order>, private productsService: ProductsService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    try {
      const order = await this.convertToOrder(createOrderDto, userId);
      return new this.orderModel({ ...order, userId }).save();
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not create order');
    }
  }

  async findAll(userId: string) {
    return this.orderModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string) {
    try {
      return await this.orderModel.findOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find order');
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId: string) {
    const order = await this.findOne(id, userId);

    const filteredProducts = order
      .toObject()
      .products.filter((product: any) =>
        updateOrderDto.products.find((productDto) => productDto.id === product.id.toString()),
      );

    filteredProducts.forEach((product: any) => {
      const productDtoUpdate = updateOrderDto.products.find((productDto) => productDto.id === product.id.toString());
      if (productDtoUpdate) {
        product.deliveryQuantity = productDtoUpdate.deliveryQuantity;
        product.sellPrice = productDtoUpdate.sellPrice;
      }
    });
    try {
      Object.assign(order, {
        deliveryDate: updateOrderDto.deliveryDate,
        documentNumber: updateOrderDto.documentNumber,
        products: filteredProducts,
      });
      await order?.save();
      return this.findOne(id, userId);
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update order');
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.orderModel.deleteOne({ _id: id, userId }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not delete order');
    }
  }

  private async convertToOrder(orderDto: CreateOrderDto | UpdateOrderDto, userId: string) {
    if (orderDto?.products) {
      const productsDto = orderDto.products;
      const productsFromDb = await Promise.all(
        productsDto.map((product) => this.productsService.findOne(product.id, userId)),
      );
      const products = productsDto.map((product) => {
        return {
          ...productsFromDb.find((prodFromDb) => product.id === prodFromDb.id.toString()),
          deliveryQuantity: product.deliveryQuantity,
          sellPrice: product.sellPrice,
        };
      });
      return {
        deliveryDate: orderDto.deliveryDate,
        documentNumber: orderDto.documentNumber,
        products,
      };
    }
    return orderDto;
  }
}
