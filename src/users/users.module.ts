import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseProviderModule } from '../common';

@Module({
  imports: [DatabaseProviderModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
