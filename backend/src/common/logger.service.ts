import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private readonly logger = new Logger('DocMind');

  logRAGRequest(data: {
    question: string;
    topKChunks: number;
    maxSimilarity: number;
    latencyMs: number;
    tokenUsed: number;
    passed: boolean;
  }) {
    this.logger.log(JSON.stringify({
      event: 'rag_request',
      ...data,
      timestamp: new Date().toISOString(),
    }));
  }

  logGuardrailBlock(data: {
    reason: string;
    input: string;
    triggerPattern?: string;
  }) {
    this.logger.warn(JSON.stringify({
      event: 'guardrail_block',
      ...data,
      timestamp: new Date().toISOString(),
    }));
  }

  logEvalRun(data: {
    totalCases: number;
    passed: number;
    avgScore: number;
    avgLatencyMs: number;
  }) {
    this.logger.log(JSON.stringify({
      event: 'eval_run_complete',
      ...data,
      timestamp: new Date().toISOString(),
    }));
  }
}
