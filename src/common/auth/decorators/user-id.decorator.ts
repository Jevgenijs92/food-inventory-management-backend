import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const UserId = createParamDecorator<string>((_data: unknown, ctx: ExecutionContext): string => {
  try {
    const request = ctx.switchToHttp().getRequest();
    return request.user.userId;
  } catch (error) {
    throw new ForbiddenException();
  }
});
