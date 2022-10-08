import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteFollowRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly followerId: string;
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
}
