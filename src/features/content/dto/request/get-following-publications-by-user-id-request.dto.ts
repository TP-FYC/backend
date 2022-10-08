import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetFollowingPublicationsByUserIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
}
