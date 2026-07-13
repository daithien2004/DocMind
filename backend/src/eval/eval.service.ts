import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RagService } from '../rag/rag.service';
import { ClaudeService } from '../common/claude.service';
import { AppLogger } from '../common/logger.service';

@Injectable()
export class EvalService {
  constructor(
    private prisma: PrismaService,
    private rag: RagService,
    private claude: ClaudeService,
    private logger: AppLogger,
  ) {}

  async runAll() {
    // TODO: Run all EvalCases through RAG pipeline, score with LLM-as-judge
    throw new Error('Not implemented');
  }

  async getResults() {
    return this.prisma.evalRun.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
