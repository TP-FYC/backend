import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetFollowByFollowerIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly followerId: string;
}
