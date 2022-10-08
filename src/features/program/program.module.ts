import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecuteProgramHandler } from './application/commands/execute-program.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Program } from '../../infrastructure/database/model/program.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PMC-COMPILER',
        transport: Transport.TCP,
        options: {
          port: 3004,
        },
      },
    ]),
    CqrsModule,
    TypeOrmModule.forFeature([Program]),
  ],
  controllers: [ProgramController],
  providers: [ExecuteProgramHandler],
})
export class ProgramModule {}
