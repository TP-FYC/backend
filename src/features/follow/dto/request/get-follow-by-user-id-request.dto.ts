import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetFollowByUserIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
}
