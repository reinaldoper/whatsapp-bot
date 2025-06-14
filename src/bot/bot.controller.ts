import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('webhook')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  async handleMessage(
    @Body()
    body: {
      From?: string;
      from?: string;
      Body?: string;
      message?: string;
    },
  ) {
    return this.botService.processMessage(body);
  }
}
