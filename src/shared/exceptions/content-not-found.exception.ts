import { HttpException } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class ContentNotFoundException extends HttpException {
  constructor() {
    super('Content not found', ErrorCode.NOT_FOUND);
  }
}
