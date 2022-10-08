import { RegisterRequest } from '../../dto/request/register-request.dto';

export class RegisterCommand {
  public readonly email: string;
  public readonly password: string;
  public readonly confirmPassword: string;
  public readonly lastname: string;
  public readonly firstname: string;
  public readonly description: string;

  private constructor(
    email: string,
    password: string,
    confirmPassword: string,
    lastname: string,
    firstname: string,
    description: string,
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.lastname = lastname;
    this.firstname = firstname;
    this.description = description;
  }
  public static of(registerRequest: RegisterRequest): RegisterCommand {
    const {
      email,
      password,
      confirmPassword,
      lastname,
      firstname,
      description,
    } = registerRequest;
    return new RegisterCommand(
      email,
      password,
      confirmPassword,
      lastname,
      firstname,
      description,
    );
  }
}
