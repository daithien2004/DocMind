import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingsService } from '../common/embeddings.service';
const pdfParse = require('pdf-parse');

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private embeddings: EmbeddingsService,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const text = await this.extractText(file);
    const title = file.originalname.replace(/\.[^.]+$/, '');
    const chunks = this.chunkText(text);

    const vectors = await this.embeddings.embedBatch(
      chunks.map((c) => c.content),
    );

    const document = await this.prisma.document.create({
      data: { title, content: text },
    });

    for (let i = 0; i < chunks.length; i++) {
      const serializedEmbedding = `[${vectors[i].join(',')}]`;
      await this.prisma.$executeRaw`
        INSERT INTO "Chunk" ("id", "documentId", "content", "embedding", "chunkIndex", "createdAt")
        VALUES (gen_random_uuid(), ${document.id}, ${chunks[i].content}, ${serializedEmbedding}::vector, ${chunks[i].index}, NOW())
      `;
    }

    return {
      id: document.id,
      title: document.title,
      chunkCount: chunks.length,
    };
  }

  async findAll() {
    return this.prisma.document.findMany({
      include: { chunks: { select: { id: true, chunkIndex: true, content: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    await this.prisma.chunk.deleteMany({ where: { documentId: id } });
    return this.prisma.document.delete({ where: { id } });
  }

  private async extractText(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    if (ext === 'txt' || ext === 'md') {
      return file.buffer.toString('utf-8');
    }

    if (ext === 'pdf') {
      const data = await pdfParse(file.buffer);
      return data.text;
    }

    throw new BadRequestException(`Unsupported file type: .${ext}`);
  }

  private chunkText(
    text: string,
    targetTokens: number = 400,
    overlapTokens: number = 50,
  ): Array<{ content: string; index: number }> {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);

    const chunks: Array<{ content: string; index: number }> = [];
    let currentChunk = '';
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
      const currentTokens = this.estimateTokens(currentChunk);
      const paragraphTokens = this.estimateTokens(paragraph);

      if (currentTokens + paragraphTokens > targetTokens && currentChunk) {
        chunks.push({ content: currentChunk.trim(), index: chunkIndex++ });

        const words = currentChunk.split(/\s+/);
        const overlapWords = words.slice(-overlapTokens);
        currentChunk = overlapWords.join(' ') + '\n\n' + paragraph;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      }
    }

    if (currentChunk.trim()) {
      chunks.push({ content: currentChunk.trim(), index: chunkIndex });
    }

    return chunks;
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.split(/\s+/).length * 1.3);
  }
}
