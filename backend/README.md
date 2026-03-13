# Chat

<br/>

Backend de chat em tempo real construído com Spring Boot, criado como estudo prático de comunicação via WebSocket em Java. O foco está em entender a mecânica do STOMP sobre WebSocket — rastreamento de presença, ciclo de vida de mensagens e arquitetura orientada a eventos — sem a complexidade de camadas de autenticação ou abstrações desnecessárias.

<br/>

## Funcionalidades

- Mensagens em tempo real via STOMP sobre WebSocket
- Indicador de digitação em broadcast
- Ciclo de vida de mensagens: criar, ler, editar e soft delete
- Rastreamento de presença online (eventos de conexão e desconexão)
- Histórico de mensagens persistido no MongoDB
- Duas estratégias de login: OAuth via GitHub ou usuário gerado aleatoriamente (sem credenciais)

<br/>

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | Java 21 |
| Framework | Spring Boot 4.0.1 |
| WebSocket | Spring WebSocket + STOMP + SockJS |
| Persistência | MongoDB + Spring Data |
| Autenticação | GitHub OAuth 2.0 / Random User API |
| Utilitários | Lombok |
| Containerização | Docker + Docker Compose |

<br/>

## Visão Geral da Arquitetura

```
src/
└── main/java/com/example/demo/
    ├── application/
    │   ├── controllers/
    │   │   ├── chat/           # Handlers de mensagens WebSocket (STOMP)
    │   │   ├── message/        # Endpoint REST para histórico de mensagens
    │   │   └── user/           # Endpoints REST para usuários e login
    │   └── dtos/
    │       ├── in/             # Records de entrada (ações do chat, OAuth)
    │       └── out/            # Records de saída (mensagens, respostas OAuth)
    ├── domain/
    │   ├── message/            # Entidade, repositório e serviço de mensagens
    │   └── user/               # Entidade, repositório, serviço e presença de usuários
    ├── infra/
    │   └── ws/                 # Configuração WebSocket e listeners de sessão
    └── oauths/
        ├── github/             # Fluxo OAuth do GitHub
        └── randomuser/         # Integração com a Random User API
```

<br/>

## Como Executar

### Pré-requisitos

- Java 21+
- Maven 3.8+
- Docker e Docker Compose

### Com Docker (recomendado)

```bash
git clone https://github.com/lucas-adm/springboot-chat.git
cd springboot-chat
docker-compose up --build
```

Isso sobe a aplicação junto com uma instância do MongoDB. A API estará disponível em `http://localhost:8080`.

### Localmente

Certifique-se de ter uma instância do MongoDB rodando e ajuste o `application.yml` conforme necessário.

```bash
./mvnw spring-boot:run
```

> **Observação:** o login via GitHub requer valores válidos de `oauth.github.client.id` e `oauth.github.client.secret` no `application.yml`. O login via usuário aleatório funciona sem nenhuma configuração adicional.

<br/>

## API REST

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Lista todos os usuários cadastrados |
| `GET` | `/users/online` | Retorna os IDs dos usuários online no momento |
| `GET` | `/users/random` | Faz login como um usuário gerado aleatoriamente |
| `POST` | `/users/github` | Faz login via código OAuth do GitHub |

**Corpo do POST `/users/github`:**
```json
{ "code": "github_oauth_code" }
```

### Mensagens

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/messages` | Retorna o histórico completo de mensagens (ordenado por data de criação) |

<br/>

## API WebSocket

**Endpoint de handshake:** `/livechat` (com fallback SockJS habilitado)

Na conexão, envie o usuário autenticado como JSON no header STOMP `user`:

```javascript
const socket = new SockJS('http://localhost:8080/livechat');
const stompClient = Stomp.over(socket);

const user = { id: "...", username: "...", avatar: "...", displayName: "...", bio: "..." };

stompClient.connect({ user: JSON.stringify(user) }, () => {
  // inscreva-se nos tópicos aqui
});
```

### Destinos para envio (`/app/...`)

| Destino | Payload | Descrição |
|---|---|---|
| `/app/msg` | `{ user, clientId, content }` | Envia uma nova mensagem |
| `/app/read` | `{ id }` | Marca uma mensagem como lida |
| `/app/update` | `{ id, content }` | Edita uma mensagem |
| `/app/delete` | `{ id }` | Soft delete de uma mensagem |
| `/app/typing` | `{ user, typing }` | Transmite o status de digitação |

### Tópicos para inscrição (`/topics/...`)

| Tópico | Payload | Descrição |
|---|---|---|
| `/topics/msg` | `MessageOutput` | Novas mensagens |
| `/topics/read` | `MessageOutput` | Confirmações de leitura |
| `/topics/update` | `MessageOutput` | Mensagens editadas |
| `/topics/delete` | `MessageOutput` | Mensagens deletadas |
| `/topics/typing` | `TypingOutput` | Indicadores de digitação |
| `/topics/presence` | `PresenceInput` | Eventos de entrada e saída de usuários |

### Estrutura dos Payloads

**`MessageOutput`**
```json
{
  "user": { "id": "...", "username": "...", "avatar": "...", "displayName": "...", "bio": "..." },
  "text": {
    "id": "...",
    "clientId": "...",
    "creator": "...",
    "content": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "updated": false,
    "read": false,
    "deleted": false
  }
}
```

**`PresenceInput`**
```json
{ "user": { "id": "...", "username": "..." }, "online": true }
```

<br/>

## Observações

- A presença de usuários é rastreada **em memória** via `ConcurrentHashMap` e é resetada ao reiniciar a aplicação.
- O delete de mensagem é um **soft delete** — o conteúdo é apagado e o campo `deleted` é marcado como `true`, mas o documento permanece no MongoDB.
- O campo `clientId` no `MessageInput` é um identificador gerado pelo cliente, útil para atualizações otimistas de UI.
- Não há nenhuma camada de autenticação protegendo os endpoints REST ou as conexões WebSocket — isso é intencional.

<br/>

## Objetivo

Este repositório faz parte de um aprendizado pessoal com foco em entender os padrões de comunicação via WebSocket e STOMP em Java. A ausência intencional de autenticação, criptografia e abstrações complexas mantém a mecânica central visível e fácil de acompanhar.
