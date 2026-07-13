import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardrailService {
  private readonly SUSPICIOUS_PATTERNS = [
    /ignore\s+(previous|all)\s+instructions/i,
    /you\s+are\s+now\s+a/i,
    /system\s*:\s*/i,
    /disregard/i,
  ];

  private readonly SIMILARITY_THRESHOLD = parseFloat(
    process.env.SIMILARITY_THRESHOLD || '0.75',
  );

  checkInput(input: string): { passed: boolean; reason?: string } {
    if (!input || input.trim().length === 0) {
      return { passed: false, reason: 'Empty input' };
    }

    for (const pattern of this.SUSPICIOUS_PATTERNS) {
      if (pattern.test(input)) {
        return { passed: false, reason: `Suspicious pattern detected: ${pattern.source}` };
      }
    }

    return { passed: true };
  }

  checkSimilarityScores(scores: number[]): { passed: boolean; reason?: string } {
    const maxScore = Math.max(...scores);

    if (maxScore < this.SIMILARITY_THRESHOLD) {
      return {
        passed: false,
        reason: `Max similarity ${maxScore.toFixed(3)} below threshold ${this.SIMILARITY_THRESHOLD}`,
      };
    }

    return { passed: true };
  }
}
