import { HttpException } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', ErrorCode.NOT_FOUND);
  }
}
