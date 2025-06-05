import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserData = createParamDecorator(
	(_: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().user
);
