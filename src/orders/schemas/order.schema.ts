import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  deliveryDate: {
    type: Date,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      ingredients: [
        {
          ingredient: {
            name: {
              type: String,
              required: true,
            },
            pricePerPackaging: {
              type: Number,
              required: true,
              get: (v: number) => v / 100,
              set: (v: number) => v * 100,
            },
            quantityPerPackaging: {
              type: Number,
              required: true,
            },
            unitOfMeasurement: {
              type: String,
              required: true,
            },
          },
          quantity: Number,
          price: {
            type: Number,
            required: true,
            get: (v: number) => v / 100,
            set: (v: number) => v * 100,
          },
        },
      ],
      price: {
        type: Number,
        required: true,
        get: (v: number) => v / 100,
        set: (v: number) => v * 100,
      },
      deliveryQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});