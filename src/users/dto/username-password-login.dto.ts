import { ApiProperty } from '@nestjs/swagger';

export class UsernamePasswordLoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
