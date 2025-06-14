import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { LeadModule } from '../lead/lead.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [LeadModule, HttpModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
