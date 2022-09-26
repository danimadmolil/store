import { createParamDecorator, ExecutionContext } from '@nestjs/common';
interface JwtPayloadWithRt {
  refreshToken;
}

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
