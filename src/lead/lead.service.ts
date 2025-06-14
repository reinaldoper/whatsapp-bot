import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async create(data: Partial<Lead>) {
    const lead = this.leadRepo.create(data);
    return await this.leadRepo.save(lead);
  }

  async findByPhone(from: string) {
    return await this.leadRepo.findOne({ where: { phone: from } });
  }

  async update(lead: Lead) {
    return this.leadRepo.save(lead);
  }

  async findAll() {
    return await this.leadRepo.find();
  }
}
