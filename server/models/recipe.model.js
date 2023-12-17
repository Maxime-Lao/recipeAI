const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    duration: {
        type: DataTypes.STRING,
    },
    ingredients: {
        type: DataTypes.TEXT,
    },
    instructions: {
        type: DataTypes.TEXT,
    },
    servings: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Recipe',
  });


module.exports = Recipe;