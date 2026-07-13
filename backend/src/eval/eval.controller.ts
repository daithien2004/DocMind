import { Controller, Get, Post } from '@nestjs/common';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
  constructor(private readonly evalService: EvalService) {}

  @Post('run')
  async run() {
    return this.evalService.runAll();
  }

  @Get('results')
  async results() {
    return this.evalService.getResults();
  }
}
