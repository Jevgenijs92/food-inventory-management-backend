import { DATABASE_CONNECTION, USER_MODEL } from '../common';
import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => {
      return connection.model('User', UserSchema);
    },
    inject: [DATABASE_CONNECTION],
  },
];
