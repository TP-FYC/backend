import { ApiProperty } from '@nestjs/swagger';

export class GetPublicationsByUserIdRequest {
  @ApiProperty()
  public readonly userId: string;
}
