import { Injectable } from '@nestjs/common';

@Injectable()
export class ClaudeService {
  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    // TODO: Call Claude API
    throw new Error('Not implemented');
  }

  async *generateStream(prompt: string, systemPrompt?: string): AsyncGenerator<string> {
    // TODO: Call Claude API with stream: true, yield tokens
    throw new Error('Not implemented');
  }
}
