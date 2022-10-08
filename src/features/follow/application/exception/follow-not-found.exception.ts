import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../../shared/exceptions/error-code.enum';

export class FollowNotFoundException extends HttpException {
  constructor() {
    super('Follow not found', ErrorCode.NOT_FOUND);
  }
}
