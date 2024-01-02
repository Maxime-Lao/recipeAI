const Comment = require('../models/comment.model');

const createComment = async (req, res) => {
  try {
    const { comment, rating, recette_id, author } = req.body;

    const newComment = await Comment.create({ comment, rating, recette_id, author });

    res.status(201).json({ message: 'Commentaire créé avec succès.', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeComments = async (req, res) => {
  try {
    console.log(req.params);
    const { recette_id } = req.params;

    const recipeComments = await Comment.findAll({ where: { recette_id } });

    if (!recipeComments) {
      return res.status(404).json({ message: 'Aucun commentaire trouvé pour cette recette.' });
    }

    res.status(200).json({ comments: recipeComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserComments = async (req, res) => {
  try {
    const { author } = req.params;

    const userComments = await Comment.findAll({ where: { author } });

    if (!userComments) {
      return res.status(404).json({ message: 'Aucun commentaire trouvé pour cet utilisateur.' });
    }

    res.status(200).json({ comments: userComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getRecipeComments,
  getUserComments,
};