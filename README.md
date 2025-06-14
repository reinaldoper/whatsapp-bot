🤖 WhatsApp Bot - NestJS
Este projeto é um bot inteligente desenvolvido com NestJS que automatiza o atendimento via WhatsApp utilizando a API da Twilio. Ele é ideal para empresas que desejam agilizar a captação de leads e oferecer uma primeira resposta automatizada para orçamentos ou direcionamento ao consultor.

🧠 Tecnologias Utilizadas
- NestJS: Framework moderno e escalável para Node.js.
- TypeORM: ORM para integração com bancos relacionais.
- PostgreSQL: Banco de dados utilizado para armazenar os leads.
- Twilio API: Para envio e recebimento de mensagens via WhatsApp.
- Docker: Para levantar o banco de dados localmente.
- Ngrok: Para expor sua aplicação local na internet durante o desenvolvimento.

📋 Como funciona o fluxo do bot?
1. O usuário envia uma saudação (ex: "oi", "olá", "bom dia").

2. O bot responde com as opções:

```bash
1️⃣ - Nossos serviços
2️⃣ - Falar com um consultor
3️⃣ - Solicitar orçamento
```
3. Se escolher:

1: o bot envia uma breve descrição dos serviços oferecidos.

2: o bot registra o lead e envia uma notificação ao consultor (definido via variável de ambiente).

3: o bot inicia um atendimento guiado para orçamento, pedindo:

- Nome completo
- Tipo de projeto
- Cidade/Estado

4. Os dados são salvos no banco de dados para acompanhamento posterior.

5. Existe uma rota protegida que permite o dono da aplicação visualizar todos os leads cadastrados.

## 🚀 Como rodar o projeto

1. Clone o repositório
```bash
git clone git@github.com:reinaldoper/whatsapp-bot.git && cd whatsapp-bot
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo `.env`

```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=postgres
   DB_NAME=whatsappbot
   TWILIO_ACCOUNT_SID=...
   TWILIO_AUTH_TOKEN=...
   TWILIO_WHATSAPP_NUMBER=+14155238886
   CONSULTANT_WHATSAPP_NUMBER=whatsapp:+your_number_whatsapp
   ADMIN_ACCESS_KEY=minha-chave-secreta

```

4. Suba o banco com Docker:
```bash
docker-compose up -d
```

5. Inicie o projeto em modo dev:
```bash
npm run start:dev
```

6. Exponha sua API com ngrok:
```bash
npm run start:ngrok
```

7. Acesse o [Twilio WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox)
   - No campo **When a message comes in**, cole:
     ```
     https://seu-ngrok-url.ngrok.io/webhook
     ```

8. Envie a mensagem "join depth-condition" para o número do Twilio: `+14155238886`
   - Isso ativa o ambiente de testes do WhatsApp Sandbox

---

## 📦 Dependências principais

```bash
npm install @nestjs/common @nestjs/core @nestjs/config @nestjs/typeorm @nestjs/axios typeorm pg rxjs
```

Ou use apenas:
```bash
npm install
```
(se as dependências já estiverem listadas no package.json)

✅ Resumo da aplicação:
- Atendimento automatizado via WhatsApp com Twilio.

- Cadastro de leads no banco (PostgreSQL via TypeORM).

- Fluxo guiado com etapas (name, projectType, location).

- Encaminhamento para consultor via número fixo.

- API REST (/leads) para visualização dos orçamentos.