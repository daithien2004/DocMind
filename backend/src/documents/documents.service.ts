import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingsService } from '../common/embeddings.service';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private embeddings: EmbeddingsService,
  ) {}

  async upload(file: Express.Multer.File) {
    // TODO: Extract text from file, chunk, embed, store
    throw new Error('Not implemented');
  }

  async findAll() {
    return this.prisma.document.findMany({
      include: { chunks: true },
    });
  }
}
