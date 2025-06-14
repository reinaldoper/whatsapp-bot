import { Lead } from './lead.entity';
import { LeadService } from './lead.service';
import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  async getAllLeads(@Headers('x-admin-key') adminKey: string): Promise<Lead[]> {
    if (adminKey !== process.env.ADMIN_ACCESS_KEY) {
      throw new UnauthorizedException('Acesso não autorizado');
    }

    return await this.leadService.findAll();
  }
}
