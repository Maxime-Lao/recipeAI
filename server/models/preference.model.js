const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Preference = sequelize.define('Preference', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  preferences: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
    tableName: 'Preference',
});

module.exports = Preference;