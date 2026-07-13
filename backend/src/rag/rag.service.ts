import { Injectable } from '@nestjs/common';
import { RetrievalService } from './retrieval.service';
import { ClaudeService } from '../common/claude.service';

@Injectable()
export class RagService {
  constructor(
    private retrieval: RetrievalService,
    private claude: ClaudeService,
  ) {}

  async chat(question: string) {
    // TODO: Embed question → retrieve chunks → build prompt → generate
    throw new Error('Not implemented');
  }

  async *chatStream(question: string) {
    // TODO: Same as chat but with SSE streaming
    throw new Error('Not implemented');
  }
}
