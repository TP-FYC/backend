import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetNotificationByUserIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
}
