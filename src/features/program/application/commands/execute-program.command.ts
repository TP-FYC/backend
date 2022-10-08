import { ExecuteProgramRequest } from '../../dto/request/execute-program-request.dto';

export class ExecuteProgramCommand {
  constructor(
    public readonly stdin: string,
    public readonly language: string,
  ) {}

  public static of(
    executeProgramRequest: ExecuteProgramRequest,
  ): ExecuteProgramCommand {
    const { stdin, language } = executeProgramRequest;
    return new ExecuteProgramCommand(stdin, language);
  }
}
