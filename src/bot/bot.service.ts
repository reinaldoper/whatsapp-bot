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
    const message = body?.Body ?? body?.message ?? '';

    if (/\b(ol[aá]|oi|bom dia)\b/i.test(message)) {
      return this.sendResponse(
        from,
        `Olá! Sou o assistente da Construção a Seco. Digite:\n1️⃣ - Nossos serviços\n2️⃣ - Falar com um consultor\n3️⃣ - Solicitar orçamento`,
      );
    }

    if (/1/.test(message)) {
      return this.sendResponse(
        from,
        `Trabalhamos com drywall, forro de gesso, steel frame e mais. Quer saber sobre prazos e materiais?`,
      );
    }

    if (/2/.test(message)) {
      return this.sendResponse(
        from,
        `Encaminhando você para um especialista... Aguarde um momento.`,
      );
    }

    if (/3/.test(message)) {
      await this.leadService.create({
        name: 'Não informado',
        phone: from,
        projectType: 'Não informado',
        location: 'Não informado',
      });
      return this.sendResponse(
        from,
        `Vamos começar! Qual o seu nome completo?`,
      );
    }

    return this.sendResponse(
      from,
      `Desculpe, não entendi. Responda com 1, 2 ou 3.`,
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
