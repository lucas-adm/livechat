# Livechat

Chat em tempo real com WebSocket. Monorepo com backend em Spring Boot e frontend em Next.js.



## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 21 · Spring Boot 4 · Spring WebSocket + STOMP |
| Persistência | MongoDB |
| Frontend | Next.js 16 · React 19 · Tailwind CSS 4 |
| Containerização | Docker · Docker Compose |


## Estrutura

```
livechat/
├── backend/     # API Spring Boot
├── frontend/    # App Next.js
├── docker-compose.yml
└── .env.example
```



## Rodando com Docker

### Pré-requisitos

- Docker
- Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/lucas-adm/livechat.git
cd livechat
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Abra o `.env` e preencha os valores:

```env
DB_HOST=mongodb
DB_PORT=27017
DB_USERNAME=admin
DB_PASSWORD=admin
DB_AUTH=admin
GITHUB_CLIENT_SECRET={SEU-SECRET} # ghcs
API_URL=http://backend:8080
STOMP_URL=http://localhost:8080
GITHUB_CLIENT_ID={SEU-ID} # ghci
# OAuth GitHub (opcional — login anônimo funciona sem isso)
# GITHUB_CLIENT_ID=ghci
# GITHUB_CLIENT_SECRET=ghcs
```

> **Nota:** `DB_HOST=mongodb` e `API_URL=http://backend:8080` usam os nomes dos containers definidos no `docker-compose.yml`. Não altere esses valores ao rodar com Docker.

### 3. Suba os containers

```bash
docker compose up --build
```

O Compose sobe os serviços nesta ordem:

1. **mongodb** — aguarda o healthcheck passar antes de liberar o próximo
2. **backend** — aguarda o MongoDB estar saudável
3. **frontend** — aguarda o backend subir

### 4. Acesse

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:8080 |



## OAuth GitHub (opcional)

Para habilitar o login via GitHub, crie um OAuth App em **GitHub → Settings → Developer settings → OAuth Apps** com:

- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3000/redirect`

Depois preencha `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` no `.env` e reinicie os containers.

O login anônimo (ícone de spy na tela inicial) funciona sem nenhuma configuração adicional.

## Parar os containers

```bash
docker compose down
```

Para remover também o volume do MongoDB:

```bash
docker compose down -v
```

Para matar tudo:
```bash
docker compose down --volumes --rmi all --remove-orphans
```
