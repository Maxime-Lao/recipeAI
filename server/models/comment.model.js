const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Recipe = require('./recipe.model');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recette_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
}, {
    tableName: 'Comment',
});

Comment.belongsTo(User, {
  foreignKey: 'author',
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recette_id',
    });

module.exports = Comment;