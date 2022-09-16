import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../../common/constants';
import { DatabaseConfigurationService } from '../../config/database/database-configuration.service';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (
      databaseConfigService: DatabaseConfigurationService,
    ): Promise<typeof mongoose> => mongoose.connect(databaseConfigService.uri),
    inject: [DatabaseConfigurationService],
  },
];
