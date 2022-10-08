import { Content } from '../infrastructure/database/model/content.entity';

export interface ContentRepository {
  countResponseByContentId(id: string): Promise<number>;

  addContent(content: Content): Promise<void>;

  updateContent(content: Content): Promise<void>;

  deleteContent(contentId: string): Promise<void>;

  deleteResponsesByContentId(content: Content): Promise<void>;

  findById(contentId: string): Promise<any>;

  findResponsesByContentId(contentId: string): Promise<any[]>;

  findPublicationsByUserId(userId: string): Promise<any[]>;

  findFollowingsByUserId(userId: string): Promise<any[]>;
}
