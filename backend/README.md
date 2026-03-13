# Backend

API de chat em tempo real construída com Spring Boot. Comunicação via WebSocket + STOMP, persistência no MongoDB, e dois modos de login: OAuth via GitHub ou usuário gerado aleatoriamente.
 
> Para rodar o projeto completo via Docker, consulte o [README na raiz do repositório](https://github.com/lucas-adm/livechat/blob/main/README.md).

## Pré-requisitos
 
- Java 21+
- Maven 3.8+
- Docker (apenas para o modo com banco em container)

## OAuth GitHub (opcional)

Para habilitar o login via GitHub consulte o [README na raiz do repositório](https://github.com/lucas-adm/livechat/blob/main/README.md#oauth-github-opcional).

## Modos de execução local

### Modo 1 — Backend local + MongoDB no Docker
 
Use esse modo quando quiser rodar o backend direto na sua máquina sem precisar instalar o MongoDB.
 
**1. Suba apenas o MongoDB:**
> na raíz, onde se encontra o `docker-compose.yml`
```bash
docker compose up -d mongodb
```
 
**2. Rode o backend:**
> dentro da pasta `backend`
```bash
./mvnw spring-boot:run
```
 
A API estará disponível em `http://localhost:8080`.
 
### Modo 2 — Backend e MongoDB ambos locais
 
Use esse modo se você já tem o MongoDB instalado na sua máquina.
 
**1. Certifique-se de que o MongoDB está rodando:**

**2. Comente as seguintes linhas em `application.yml`:**

```java
spring:
  # profiles:
  #   active: docker
  ...
```

Se seu banco local usa autenticação, adiocione as seguintes linhas:

```java
spring:
  ...
  mongodb:
    ...
    username: ${DB_USERNAME:seu_usuario} # Altere
    password: ${DB_PASSWORD:sua_senha} # Altere
    authentication-database: ${DB_AUTH:admin}
```
 
**3. Rode o backend:**
 
```bash
./mvnw spring-boot:run
```
 
A API estará disponível em `http://localhost:8080`.

## Funcionalidades

- Mensagens em tempo real via STOMP sobre WebSocket
- Indicador de digitação em broadcast
- Ciclo de vida de mensagens: criar, ler, editar e soft delete
- Rastreamento de presença online (eventos de conexão e desconexão)
- Histórico de mensagens persistido no MongoDB
- Duas estratégias de login: OAuth via GitHub ou usuário gerado aleatoriamente (sem credenciais)

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

## API WebSocket

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

## Observações

- A presença de usuários é rastreada **em memória** via `ConcurrentHashMap` e é resetada ao reiniciar a aplicação.
- O delete de mensagem é um **soft delete** — o conteúdo é apagado e o campo `deleted` é marcado como `true`, mas o documento permanece no MongoDB.
- O campo `clientId` no `MessageInput` é um identificador gerado pelo cliente, útil para atualizações otimistas de UI.
- Não há nenhuma camada de autenticação protegendo os endpoints REST ou as conexões WebSocket — isso é intencional.
