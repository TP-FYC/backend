import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUsersByNameRequest {
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;
}
