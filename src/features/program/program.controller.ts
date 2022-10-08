import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ExecuteProgramRequest } from './dto/request/execute-program-request.dto';
import { ExecuteProgramResponse } from './dto/response/execute-program-response.dto';
import { ExecuteProgramCommand } from './application/commands/execute-program.command';

@ApiTags('program')
@Controller('program')
export class ProgramController {
  private readonly commandBus: CommandBus;

  constructor(commandBus: CommandBus) {
    this.commandBus = commandBus;
  }

  @Post('/execute')
  execute(
    @Body() executeProgramRequest: ExecuteProgramRequest,
  ): Promise<ExecuteProgramResponse> {
    return this.commandBus.execute(
      new ExecuteProgramCommand(
        executeProgramRequest.stdin,
        executeProgramRequest.language,
      ),
    );
  }
}
