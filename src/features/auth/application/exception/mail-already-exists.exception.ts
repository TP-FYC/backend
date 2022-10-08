import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../../shared/exceptions/error-code.enum';

export class MailAlreadyExistsException extends HttpException {
  constructor() {
    super('Mail already exists', ErrorCode.CONFLICT);
  }
}
