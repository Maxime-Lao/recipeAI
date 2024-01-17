# RecipeAI

RecipeAI est une application web de recherche de recettes de cuisine avec une
recommandation intelligente de recettes. Voici ses fonctionnalité:

- Interface graphique (2 points) : développer une interface Web permettant aux utilisateurs d’interagir
avec vos listes d’ingrédients, recettes, recommandations, etc…
- Moteur de recherche intelligent (2 points) : proposer à vos utilisateurs un moteur de recherche
permettant de chercher vos recettes de manière intelligente par rapports à des recettes déjà stockées
en base de données
- Recommandation de recettes intelligente (2 points) : lors de la consultation d’une recette en
particulier, proposer des recommandations intelligente de recettes similaires
- Gestion de compte utilisateur (2 points) : les utilisateurs doivent pouvoir se connecter afin de
sauvegarder leurs recettes favorites, ainsi que leur préférences alimentaires (allergies,
contre-indications médicales, etc…)
- Système de notation et d’avis (2 points) : chaque recette dois pouvoir être notée avec des
commentaires
- Assistant virtuel (2 points) : Un système de chatbot doit pouvoir être accessible à chaque endroit de
votre application afin de pouvoir échanger avec les utilisateurs. Le chatbot doit correspondre à un chef
étoilé au guide michelin ayant une 15aines d’années d’expérience dans le métier avec plusieurs
concours culinaires gagnés à l’internationnal
- Proposition d’accompagnement (2 points) : à chaque recette, proposer un bouton permettant de
proposer des accompagnements intelligents aux recettes comme du vin, des desserts ou des
fromages
- Générateur de liste de course (2 points) : pour chaque recette, proposer un bouton permettant de
générer une liste de course intelligente, il devra être possible de pouvoir partager la liste de recette sur
des réseaux sociaux, dans un presse-papier, par email, etc…
- Intégration de reconnaissance vocale intelligente (1 point) : permettre la saisie vocale d’une recherche
sur le site afin d’être redirigé sur la bonne page
- Recommandation basées sur la saisonnalité des ingrédients (1 point) : recommander les recettes
contenant des produits de saison plutôt que d’autres (lentilles, haricots, épinards en été)
- Recherche calorique intelligente (1 point) : proposer une recherche par calories apportées à chaque
recette, sans forcément stocker cette information en base de données
- Traduction automatique (1 point) : proposer une traduction intelligente et automatique en fonction de
la langue choisie par l’utilisateur

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

## Télécharger sequelize

```
npm install -g sequelize-cli
```

## Faire en premier et ENLEVER LES "S" AUX MIGRATIONS
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
