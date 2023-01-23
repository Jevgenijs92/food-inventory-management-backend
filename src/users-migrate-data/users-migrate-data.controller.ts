import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersMigrateDataService } from './users-migrate-data.service';
import { SkipAuth } from '../common/auth';

@Controller()
export class UsersMigrateDataController {
  constructor(private readonly usersMigrateDataService: UsersMigrateDataService) {}

  @SkipAuth()
  @Post('migrate-data-from/:currentUsername/to/:targetUsername')
  async migrateUserData(
    @Param('currentUsername') currentUsername: string,
    @Param('targetUsername') targetUsername: string,
    @Body() body: { token: string },
  ) {
    return this.usersMigrateDataService.migrateUserData(currentUsername, targetUsername, body?.token);
  }
}
