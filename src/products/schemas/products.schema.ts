import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        autopopulate: true,
      },
      quantity: Number,
    },
  ],
});
