import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetResponsesToContentByIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly contentId: string;
}
