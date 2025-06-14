import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadService],
  exports: [LeadService],
})
export class LeadModule {}
