const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FavoriteRecipe = sequelize.define('FavoriteRecipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'FavoriteRecipe',
  });


module.exports = FavoriteRecipe;