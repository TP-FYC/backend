import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../../../../shared/exceptions/error-code.enum';

export class PasswordAndConfirmPasswordNotMatch extends HttpException {
  constructor() {
    super(
      'Passwords and confirm password are not matching',
      ErrorCode.BAD_REQUEST,
    );
  }
}
