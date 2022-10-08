import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUsersWhoReactedToContentRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
}
