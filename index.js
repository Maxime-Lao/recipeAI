// Librairie nécessaire pour pouvoir utiliser l'API OpenAI depuis Node ou un navigateur
import OpenAI from "openai";

// Librairie nécessaire pour créer un serveur HTTP
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
// Instanciation de l'objet nous permettant de communiquer avec l'API
const openai = new OpenAI({
  // La clé d'API que vous avez récupéré depuis votre compte (NE JAMAIS LA PARTAGER !!!)
  apiKey: process.env.OPENAI_API_KEY
});

// L'objet qui contient la réponse de l'API OpenAI
const completions = await openai.chat.completions.create({
  // Le modèle d'intelligence artificielle à utiliser
  model: "gpt-3.5-turbo",
  // L'ensemble de la discussion entre vous et l'API (donc le contexte)
  messages: [
    {
      // Le rôle, il peut être un des suivants
      // user : c'est vous qui posez une question
      // assistant : c'est l'API qui vous répondras
      // system : c'est la personnalité ainsi que les
      // détails qui permettant de cadrer la réponse du modèle
      role: "system",
      // Le contenu est la valeur pour le rôles
      // cela peut être une question, une réponse de l'API ou un contexte
      content: "Tu es un terminal LINUX, à chaque fois qu'on tape une commande, tu vas ressortir un exemple de sortie exactement comme sur un vrai serveur et tu ne répondras à aucune question."
    },
    {
      role: "user",
      content: "ls -alh"
    }
  ]
});

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question
      }
    ]
  });

  const answer = completions.choices[0].message.content;

  res.json(answer);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});