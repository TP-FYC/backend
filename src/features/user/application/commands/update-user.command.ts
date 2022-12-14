import { Role } from '../../../../infrastructure/database/model/enums/role';
import { Confidentiality } from '../../../../infrastructure/database/model/enums/confidentiality';
import { UpdateUserRequest } from '../../dto/request/update-user-request.dto';

export class UpdateUserCommand {
  public readonly userId: string;
  public readonly password: string;
  public readonly passwordConfirmation: string;
  public readonly description: string;
  public readonly userRole: Role;
  public readonly confidentiality: Confidentiality;

  private constructor(
    userId: string,
    password: string,
    passwordConfirmation: string,
    description: string,
    userRole: Role,
    confidentiality: Confidentiality,
  ) {
    this.userId = userId;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
    this.description = description;
    this.userRole = userRole;
    this.confidentiality = confidentiality;
  }
  public static of(updateUserRequest: UpdateUserRequest): UpdateUserCommand {
    const {
      userId,
      password,
      passwordConfirmation,
      description,
      userRole,
      confidentiality,
    } = updateUserRequest;
    return new UpdateUserCommand(
      userId,
      password,
      passwordConfirmation,
      description,
      userRole,
      confidentiality,
    );
  }
}
