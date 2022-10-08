import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteReactionToContentRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly userId: string;
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
}
