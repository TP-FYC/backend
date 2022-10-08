import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetContentByIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
}
