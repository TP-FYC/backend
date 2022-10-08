import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateContentRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly content: string;
}
