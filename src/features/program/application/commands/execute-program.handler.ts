import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExecuteProgramCommand } from './execute-program.command';
import { ExecuteProgramResponse } from '../../dto/response/execute-program-response.dto';
import { environmentConfig } from 'src/config/environment.config';
import axios from 'axios';

@CommandHandler(ExecuteProgramCommand)
export class ExecuteProgramHandler
  implements ICommandHandler<ExecuteProgramCommand>
{
  async execute(
    command: ExecuteProgramCommand,
  ): Promise<ExecuteProgramResponse> {
    const res = await axios.post(environmentConfig.pmcCompilerUrl, command);
    return res.data as ExecuteProgramResponse;
  }
}
