import { DATABASE_CONNECTION, ORDER_MODEL } from '../common';
import { Connection } from 'mongoose';
import { OrderSchema } from './schemas';

export const ordersProviders = [
  {
    provide: ORDER_MODEL,
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: [DATABASE_CONNECTION],
  },
];
