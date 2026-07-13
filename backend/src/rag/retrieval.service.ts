import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RetrievalService {
  constructor(private prisma: PrismaService) {}

  async findSimilarChunks(queryEmbedding: number[], topK: number = 5) {
    const serializedEmbedding = `[${queryEmbedding.join(',')}]`;

    const results = await this.prisma.$queryRaw`
      SELECT id, content, "documentId",
             1 - (embedding <=> ${serializedEmbedding}::vector) AS similarity
      FROM "Chunk"
      ORDER BY embedding <=> ${serializedEmbedding}::vector
      LIMIT ${topK}
    `;

    return results;
  }
}
