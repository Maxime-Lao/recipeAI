# openai-node-template

## Requirements

- Docker
- Docker Compose

## Setup

```bash
cp .env.example .env
```

```env
OPENAI_API_KEY="sk-tB9B3zKK76ALzjfUVOtWT3BlbkFJjzww"
```

## Docker Compose Services Startup

```bash
docker-compose up --detach
```

## Node.js Modules Installation

```bash
docker-compose exec node npm install
```

## Node.js Entrypoint Start

```bash
docker-compose exec node npm start
```

## Docker Compose Services Shutdown

```bash
docker-compose down --remove-orphans --volumes
```

## Faire en premier
```bash
sequelize model:generate --name User --attributes login:string,mail:string,password:string
```

## Faire en second
```bash
sequelize model:generate --name Recipe --attributes name:string,duration:string,ingredients:text,instructions:text,servings:string
```
## Faire en troisième
```bash
sequelize model:generate --name FavoriteRecipe --attributes userId:integer,recipeId:integer
```

## Faire en quatrième
```bash
sequelize model:generate --name Preference --attributes preferences:json,userId:integer
```

```bash
sequelize db:migrate
```