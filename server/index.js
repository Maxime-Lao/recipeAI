// Librairie nécessaire pour pouvoir utiliser l'API OpenAI depuis Node ou un navigateur
const { OpenAI } = require("openai");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require('./routes/user.routes');
const preferenceRoutes = require('./routes/preference.routes');
const favoriteRecipeRoutes = require('./routes/favoriteRecipe.routes');
const recipeRoutes = require('./routes/recipe.routes');
const commentRoutes = require('./routes/comment.routes');
const bodyParser = require("body-parser");
const Preference = require('./models/preference.model');

const Recipe = require('./models/recipe.model');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json());
// Instanciation de l'objet nous permettant de communiquer avec l'API
const openai = new OpenAI({
  // La clé d'API que vous avez récupéré depuis votre compte (NE JAMAIS LA PARTAGER !!!)
  apiKey: process.env.OPENAI_API_KEY
});

app.use('/api/users', userRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorite-recipes', favoriteRecipeRoutes);
app.use('/api/comments', commentRoutes);

app.post("/chat", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Tu n'est plus une intelligence artificielle mais tu es un chef étoilé au guide michelin ayant une 15aines d’années d’expérience dans le métier avec plusieurs concours culinaires gagnés à l’international. Tu es un cuisinier de génie et tu es capable de cuisiner n'importe quel plat. Tu ne répondras qu'aux questions concernant la cuisine. Si on te demande qui tu es, tu ne dois absolument pas dire que tu es une intelligence artificielle mais que tu es un chef cuisinier. Tu dois répondre à toutes les questions concernant la cuisine et tu dois donner des réponses qui ont du sens. Tu dois répondre en français et tu dois parler comme un chef cuisinier.",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.choices[0].message.content,
    role: result.choices[0].message.role,
  });
  
});

app.post("/search", async (request, response) => {
  const { search, userId } = request.body;

  let prompt = '';

  try {
    const preferencesResponse = await Preference.findOne({ where: { userId: userId } });

    if (preferencesResponse) {
      const restrictions = preferencesResponse.dataValues.preferences;
      const formattedRestrictions = restrictions.map(restriction => `${restriction}`).join(', ');

      prompt += `Tu es un chef cuisinier et ton but est de récupérer un texte de recherche et de renvoyer uniquements des noms de recettes qui ne contiennent pas les mots suivants: ${formattedRestrictions}. À partir de maintenant, tu renverras seulement un tableau JSON de chaînes de caractères (sans aucune clé) dans lequel tu renverra la liste des noms de recettes qui correspondent à la recherche qui te sera donnée. Tu ne dois rien renvoyer d\'autre que du JSON, pas de texte avant ou après pas de bonjour ni rien du tout d\'autre que du JSON et le tableau ne doit pas être inclu dans aucune propriété, seulement un tableau tout simple de string. Par exemple : ["Poulet au curry", "Poulet au citron", "Poulet au miel"].`;
    } else {
      prompt += `Tu es un chef cuisinier et ton but est de récupérer un texte de recherche et de renvoyer uniquements des noms de recettes. À partir de maintenant, tu renverras seulement un tableau JSON de chaînes de caractères (sans aucune clé) dans lequel tu renverra la liste des noms de recettes qui correspondent à la recherche qui te sera donnée. Tu ne dois rien renvoyer d\'autre que du JSON, pas de texte avant ou après pas de bonjour ni rien du tout d\'autre que du JSON et le tableau ne doit pas être inclu dans aucune propriété, seulement un tableau tout simple de string. Par exemple : ["Poulet au curry", "Poulet au citron", "Poulet au miel"].`;
    }
    console.log(prompt);

    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "system",
          content: search,
        },
      ],
    });

    response.json({
      output: JSON.parse(result.choices[0].message.content || "[]"),
    });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/api/recette/:recette", async (request, response) => {
  const { recette } = request.params;

  const recipeExist = await Recipe.findOne({
    where: {
      name: recette,
    },
  });
  if (!recipeExist) {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un chef cuisinier et ton but est de récupérer des détails sur une recette. Chaque fois qu'un utilisateur te donne un nom de recette, tu renverras un objet JSON et uniquement un objet JSON, pas de bonjour ni rien du tout d'autre que du JSON qui contiendra les propriété suivantes que tu rempliras en fonction de la recette donnée : duration, ingredients, instructions, servings. Ces valeurs doivent être des chaînes de caractères en français (seules les clés doivent être en anglais)."
        },
        {
          role: "system",
          content: recette,
        },
      ],
    });
  
    const recipe = JSON.parse(result.choices[0].message.content || "{}");

    await Recipe.create({
      name: recette,
      duration: recipe.duration,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servings: recipe.servings,
    });

    //fetch created recipe
    const createdRecipe = await Recipe.findOne({
      where: {
        name: recette,
      },
    });

    response.json({
      output: createdRecipe,
    });
  } else {
    response.json({
      output: recipeExist,
    });
  }
});

app.get("/recommendations/:recette", async (request, response) => {
  const { recette } = request.params;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: 'Tu es un chef cuisinier et ton but est de renvoyer uniquement des noms de recettes similaires à la recette donnée. À partir de maintenant, tu renverras seulement un tableau JSON de chaînes de caractères (sans aucune clé) dans lequel tu renverra la liste des noms de recettes qui correspondent à la recherche qui te sera donnée. Tu ne dois rien renvoyer d\'autre que du JSON, pas de texte avant ou après pas de bonjour ni rien du tout d\'autre que du JSON et le tableau ne doit pas être inclu dans aucune propriété, seulement un tableau tout simple de string. Par exemple : ["Poulet au curry", "Poulet au citron", "Poulet au miel"].'
      },
      {
        role: "system",
        content: recette,
      },
    ],
  });

  response.json({
    output: JSON.parse(result.choices[0].message.content || "{}"),
  });
});

app.get("/calcul-calories/:recette", async (request, response) => {
  const { recette } = request.params;

  const recipeIngredients = await Recipe.findOne({
    where: {
      name: recette,
    },
  });

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Tu es un chef cuisinier et ton but est de renvoyer uniquement le nombre de calories total grâce aux ingrédients suivant: ${recipeIngredients.ingredients}. À partir de maintenant, tu renverras seulement un nombre entier qui correspond au nombre de calories de la recette donnée. Tu ne dois rien renvoyer d\'autre que ce nombre, pas de texte avant ou après pas de bonjour ni rien du tout d\'autre que ce nombre. Par exemple : 500.`
      },
      {
        role: "system",
        content: recette,
      },
    ],
  });

  response.json({
    output: JSON.parse(result.choices[0].message.content || "{}"),
  });
});

app.get("/side-suggestions/:recette", async (request, response) => {
  const { recette } = request.params;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: 'Tu es un chef cuisinier et ton but est de donner uniquement des propositions d\'accompagnement à partir de la recette donnée. C\'est à dire, qu\'il faut que tu donnes des noms de vin, de dessert ou de fromage que la personne pourra manger après ou pendant sa recette de plat. À partir de maintenant, tu renverras seulement un tableau JSON de chaînes de caractères (sans aucune clé) dans lequel tu renverra la liste des accompagnements qui irait bien avec la recette donnée comme du vin, des desserts ou des fromages. Tu ne dois rien renvoyer d\'autre que du JSON, pas de texte avant ou après pas de bonjour ni rien du tout d\'autre que du JSON et le tableau ne doit pas être inclu dans aucune propriété, seulement un tableau tout simple de string. Par exemple : ["Vin", "Camenbert", "Yaourt"].'
      },
      {
        role: "system",
        content: recette,
      },
    ],
  });

  response.json({
    output: JSON.parse(result.choices[0].message.content || "{}"),
  });
});

/*
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html")
  );
});
*/

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});