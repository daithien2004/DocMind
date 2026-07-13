import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentsModule } from './documents/documents.module';
import { RagModule } from './rag/rag.module';
import { GuardrailModule } from './guardrail/guardrail.module';
import { EvalModule } from './eval/eval.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CommonModule,
    DocumentsModule,
    RagModule,
    GuardrailModule,
    EvalModule,
  ],
})
export class AppModule {}
