import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
  jwtRefreshTokenHashRounds: process.env.JWT_REFRESH_TOKEN_HASH_ROUNDS,
}));
