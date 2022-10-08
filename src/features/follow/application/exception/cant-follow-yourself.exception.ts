import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../../shared/exceptions/error-code.enum';

export class CantFollowYourselfException extends HttpException {
  constructor() {
    super('Impossible to follow yourself', ErrorCode.CONFLICT);
  }
}
