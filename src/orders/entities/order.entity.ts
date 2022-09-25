export interface Order extends Document {
  deliveryDate: Date;
  products: {
    name: string;
    ingredients: {
      ingredient: {
        name: string;
        pricePerPackaging: number;
        quantityPerPackaging: number;
        unitOfMeasurement: string;
      };
      quantity: number;
      price: number;
    }[];
    price: number;
    deliveryQuantity: number;
  }[];
}
