import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../../../../infrastructure/database/model/enums/status';

export class UpdateFollowRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly followerId: string;
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
  @ApiProperty()
  public readonly followStatus: Status;
}
