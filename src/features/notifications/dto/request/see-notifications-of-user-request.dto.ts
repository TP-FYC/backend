import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SeeNotificationsOfUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
}
