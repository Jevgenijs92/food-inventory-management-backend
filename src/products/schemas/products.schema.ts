import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
      },
      quantity: Number,
      price: Number,
    },
  ],

  price: {
    type: Number,
    get: (v: number) => (v / 100).toFixed(2),
    set: (v: number) => v * 100,
  },
});
