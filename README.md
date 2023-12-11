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
sequelize model:generate --name Preference --attributes preferences:json
```

## Puis dans la migration de "Preference", supprimer le "s" de Preferences
```bash
sequelize db:migrate
```
## Faire en second
```bash
sequelize model:generate --name User --attributes login:string,mail:string,password:string
```

## Puis modifier la migration d'user
```bash
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preferenceId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Si l'utilisateur peut avoir une préférence ou non
        references: {
          model: 'Preference', // Nom de la table parente
          key: 'id' // Colonne référencée dans la table parente
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de l'ID de préférence
        onDelete: 'SET NULL' // Action en cas de suppression de la préférence
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
```
```bash
sequelize db:migrate
```