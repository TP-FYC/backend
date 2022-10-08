import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ReactionType } from '../../../../infrastructure/database/model/enums/reaction-type';

export class CreateReactionToContentRequest {
  @ApiProperty({ default: '9eff5ea8-1a44-452c-923e-aaa84f61ad6b' })
  @IsNotEmpty()
  public readonly userId: string;
  @ApiProperty({ default: '53a5d829-78bf-452d-8fe9-38cd366a3bb1' })
  @IsNotEmpty()
  public readonly contentId: string;
  @ApiProperty({ enum: ReactionType })
  public readonly reactionType: string;
}
