import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    get: (v: number) => v / 100,
    set: (v: number) => v * 100,
  },
  unit: String,
  pricePerUnit: {
    type: Number,
    get: (v: number) => v / 100,
    set: (v: number) => v * 100,
  },
});
