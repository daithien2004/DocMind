import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RagService } from './rag.service';

@Controller('chat')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post()
  async chat(@Body('question') question: string) {
    return this.ragService.chat(question);
  }

  @Sse('stream')
  stream(@Body('question') question: string): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      (async () => {
        try {
          const generator = await this.ragService.chatStream(question);
          for await (const token of generator) {
            subscriber.next({ data: token });
          }
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}
