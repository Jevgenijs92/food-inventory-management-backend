import { ForbiddenException, Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients';
import { UsersService } from '../users';
import { ProductsService } from '../products';
import { OrdersService } from '../orders/orders.service';
import { AuthConfigurationService } from '../common/config/auth';

@Injectable()
export class UsersMigrateDataService {
  constructor(
    private ingredientsService: IngredientsService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private authConfigService: AuthConfigurationService,
  ) {}

  async migrateUserData(currentUsername: string, targetUsername: string, token: string) {
    if (token === this.authConfigService.jwtSecret) {
      const currentUser = await this.usersService.findOneByUsername(currentUsername);
      const targetUser = await this.usersService.findOneByUsername(targetUsername);
      if (currentUser && targetUser) {
        const currentUserId = currentUser.id;
        const targetUserId = targetUser.id;
        await this.ingredientsService.changeUserId(currentUserId, targetUserId);
        await this.productsService.changeUserId(currentUserId, targetUserId);
        await this.ordersService.changeUserId(currentUserId, targetUserId);
        return 'Migration finished successfully';
      }
    } else {
      throw new ForbiddenException('You are not allowed to use this API');
    }
  }
}
