import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from '../common';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userModel: Model<User>) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).orFail().exec();
  }

  async updateRefreshToken(userId: string, token: string | null): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { refresh_token: token }).orFail().exec();
  }
}
