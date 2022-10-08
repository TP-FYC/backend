import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../../shared/exceptions/error-code.enum';

export class AlreadyFollowedException extends HttpException {
  constructor() {
    super('Already followed', ErrorCode.CONFLICT);
  }
}
