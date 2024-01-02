const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

router.post('/', CommentController.createComment);
router.get('/:recette_id', CommentController.getRecipeComments);
router.get('/user/:author', CommentController.getUserComments);

module.exports = router;
