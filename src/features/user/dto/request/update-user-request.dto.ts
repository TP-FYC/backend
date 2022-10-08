import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from '../../../../infrastructure/database/model/enums/role';
import { Confidentiality } from '../../../../infrastructure/database/model/enums/confidentiality';

export class UpdateUserRequest {
  @IsNotEmpty()
  @ApiProperty()
  public readonly userId: string;
  @ApiProperty()
  public readonly password: string;
  @ApiProperty()
  public readonly passwordConfirmation: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly userRole: Role;
  @ApiProperty()
  public readonly confidentiality: Confidentiality;
  @ApiProperty()
  public readonly principalPictureURL: string;
}
