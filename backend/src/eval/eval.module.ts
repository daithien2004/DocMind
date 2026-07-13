import { Module } from '@nestjs/common';
import { EvalController } from './eval.controller';
import { EvalService } from './eval.service';
import { RagModule } from '../rag/rag.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [RagModule, CommonModule],
  controllers: [EvalController],
  providers: [EvalService],
})
export class EvalModule {}
