import { Content } from '../../../../infrastructure/database/model/content.entity';

export class ExecuteProgramResponse {
  constructor(public readonly stdout: string) {}
}
