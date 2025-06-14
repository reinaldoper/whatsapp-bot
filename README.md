## 🚀 Como rodar o projeto

1. Clone o repositório
```bash
git clone seu-repo-url && cd whatsapp-bot-nestjs
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo `.env`

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

8. Envie a mensagem "join xxxx" para o número do Twilio: `+14155238886`
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