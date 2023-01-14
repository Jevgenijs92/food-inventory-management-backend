import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  documentNumber: {
    type: String,
    required: false,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      yieldPcs: {
        type: Number,
        required: false,
        default: 1,
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
      sellPrice: {
        type: Number,
        required: true,
        get: (v: number) => v / 100,
        set: (v: number) => v * 100,
      },
    },
  ],
});
