import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { ClaudeService } from './claude.service';
import { AppLogger } from './logger.service';

@Module({
  providers: [EmbeddingsService, ClaudeService, AppLogger],
  exports: [EmbeddingsService, ClaudeService, AppLogger],
})
export class CommonModule {}
