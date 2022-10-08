import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { minPasswordLength } from '../../config/password.config';

export class RegisterRequest {
  @IsEmail()
  @ApiProperty({ default: 'example@example.com' })
  public readonly email: string;
  @MinLength(minPasswordLength)
  @ApiProperty({ default: 'azertY1234' })
  public readonly password: string;
  @ApiProperty({ default: 'azertY1234' })
  public readonly confirmPassword: string;
  @IsNotEmpty()
  @ApiProperty({ default: 'Doo' })
  public readonly lastname: string;
  @IsNotEmpty()
  @ApiProperty({ default: 'Jhon' })
  public readonly firstname: string;
  @ApiProperty({ default: 'I am a good guy' })
  public readonly description: string;
}
