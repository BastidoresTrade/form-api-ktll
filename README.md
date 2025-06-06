# API de Formulário de Contato

Esta API permite o envio de formulários de contato via e-mail usando Node.js e Nodemailer.

## Configuração

1. Clone o repositório
2. Copie `.env.example` para `.env` e preencha as variáveis de ambiente
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Endpoints

- POST `/enviar-email`: Envia um e-mail com os dados do formulário de contato
