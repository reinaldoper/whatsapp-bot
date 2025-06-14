import { Injectable } from '@nestjs/common';
import { LeadService } from '../lead/lead.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BotService {
  constructor(
    private leadService: LeadService,
    private httpService: HttpService,
  ) {}

  async processMessage(body: {
    From?: string;
    from?: string;
    Body?: string;
    message?: string;
  }) {
    const from = body?.From ?? body?.from ?? '';
    const message = (body?.Body ?? body?.message ?? '').trim();

    const existingLead = await this.leadService.findByPhone(from);

    if (/1/.test(message)) {
      return this.sendResponse(
        from,
        `Trabalhamos com drywall, forro de gesso, steel frame e mais. Quer saber sobre prazos e materiais?`,
      );
    }

    if (/2/.test(message)) {
      await this.sendResponse(
        from,
        `Encaminhando você para um especialista... Aguarde um momento.`,
      );

      await this.leadService.create({
        name: 'Aguardando preenchimento',
        phone: from,
        projectType: 'Solicitou atendimento com especialista',
        location: 'Não informado',
        step: 'done',
      });

      const consultantNumber = process.env.CONSULTANT_WHATSAPP_NUMBER;

      if (consultantNumber) {
        await this.sendResponse(
          consultantNumber,
          `Novo cliente deseja falar com um especialista. Número: ${from}`,
        );
      }

      return;
    }

    if (/3/.test(message) && !existingLead) {
      await this.leadService.create({
        name: '',
        phone: from,
        projectType: '',
        location: '',
        step: 'name',
      });
      return this.sendResponse(
        from,
        `Vamos começar! Qual o seu nome completo?`,
      );
    }

    if (!existingLead) {
      return this.sendResponse(
        from,
        `Olá! Sou o assistente da Construção a Seco. Digite:
        1️⃣ - Nossos serviços
        2️⃣ - Falar com um consultor
        3️⃣ - Solicitar orçamento`,
      );
    }
    if (existingLead.step === 'name') {
      existingLead.name = message;
      existingLead.step = 'projectType';
      await this.leadService.update(existingLead);
      return this.sendResponse(
        from,
        `Qual o tipo de projeto você deseja realizar?`,
      );
    }

    if (existingLead.step === 'projectType') {
      existingLead.projectType = message;
      existingLead.step = 'location';
      await this.leadService.update(existingLead);
      return this.sendResponse(from, `Qual a cidade/estado do projeto?`);
    }

    if (existingLead.step === 'location') {
      existingLead.location = message;
      existingLead.step = 'done';
      await this.leadService.update(existingLead);
      return this.sendResponse(
        from,
        `Obrigado! Em breve entraremos em contato para enviar o orçamento.`,
      );
    }

    return this.sendResponse(
      from,
      `Aguarde o retorno do nosso time. Obrigado!`,
    );
  }

  async sendResponse(to: string, message: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error(
        'Twilio credentials are not set in environment variables.',
      );
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const payload = new URLSearchParams();
    payload.append('From', `whatsapp:${fromNumber}`);
    payload.append('To', to);
    payload.append('Body', message);

    const auth = {
      username: accountSid,
      password: authToken,
    };

    const response = await firstValueFrom(
      this.httpService.post(url, payload.toString(), {
        auth,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    return { to, message, status: response.status };
  }
}
