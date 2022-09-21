import { Document } from 'mongoose';

export interface Ingredient extends Document {
  id: string;
  name: string;
  price: number;
  unit: string;
  pricePerUnit: number;
}
