import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingsService {
  async embed(text: string): Promise<number[]> {
    // TODO: Call embedding API (OpenAI text-embedding-3-small or Voyage AI)
    throw new Error('Not implemented');
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    // TODO: Call embedding API for multiple texts
    throw new Error('Not implemented');
  }
}
