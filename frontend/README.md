# Frontend

Interface do chat em tempo real, construída com Next.js 16 e React 19. Comunicação com o backend via STOMP sobre WebSocket (SockJS) e chamadas REST para carregamento inicial de dados.

> Para rodar o projeto completo via Docker, consulte o [README na raiz do repositório](https://github.com/lucas-adm/livechat/blob/main/README.md).

## Pré-requisitos

- Node.js 22+
- Backend rodando em `http://localhost:8080` — veja o [README do backend](https://github.com/lucas-adm/livechat/blob/main/backend/README.md)

## Instalação

```bash
cd frontend
npm install
```

## OAuth GitHub (opcional)

Para habilitar o login via GitHub consulte o [README na raiz do repositório](https://github.com/lucas-adm/livechat/blob/main/README.md#oauth-github-opcional).

## Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Abra o `.env` e preencha os valores:

```env
API_URL=http://localhost:8080
NEXT_PUBLIC_STOMP_URL=http://localhost:8080
GITHUB_CLIENT_ID={SEU-ID} # ghcs
```

> `API_URL` é consumida no servidor (Server Components / Route Handlers), por isso não leva o prefixo `NEXT_PUBLIC_`.
> `NEXT_PUBLIC_STOMP_URL` é consumida no browser, dentro do `WebSocketProvider`.

## Desabilite o standalone

> next.config.ts

```js
const nextConfig: NextConfig = {
  /* config options here */
  /* output: 'standalone', <- Altere esta única linha */
  images: {...},
};

```

## Rodando em desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm start
```

## Estrutura relevante

```
src/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx          # Tela de login (GitHub ou anônimo)
│   │   ├── redirect/         # Callback OAuth e login anônimo
│   │   └── chat/             # Interface principal do chat
│   └── globals.css
├── components/               # Componentes compartilhados (Avatar, etc.)
├── contexts/                 # Providers: User, Messages, WebSocket, Typing
├── core/
│   ├── dtos/                 # Tipos de entrada e saída
│   ├── http/                 # Cliente HTTP genérico
│   ├── models/               # Modelos de domínio (User, Message)
│   ├── schemas/              # Schemas Zod para validação de formulários
│   ├── services/             # Serviços (Chat, User, Message)
│   └── ws/                   # Cliente WebSocket (STOMP + SockJS)
├── hooks/                    # Hooks para acesso aos contextos
└── utils/                    # Utilitários (formatação de datas, normalização)
```
