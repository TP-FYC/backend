import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteContentRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
}
