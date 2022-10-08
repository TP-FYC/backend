import { Injectable } from '@nestjs/common';
import { RegisterCommand } from '../application/commands/register.command';
import { PasswordAndConfirmPasswordNotMatch } from '../application/exception/password-and-confirm-not-match.exception';

interface Validator<T> {
  validate(command: T): boolean;
}

@Injectable()
export class RegisterValidator implements Validator<RegisterCommand> {
  validate(command: RegisterCommand): boolean {
    if (command.confirmPassword != command.password) {
      throw new PasswordAndConfirmPasswordNotMatch();
    }
    // TODO specific check for password validation
    return true;
  }
}
