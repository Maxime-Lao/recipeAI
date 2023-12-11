const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Preference = require('./preference.model');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferenceId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Si l'utilisateur peut avoir une préférence ou non
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'User',
});

User.hasOne(Preference);
Preference.belongsTo(User);

module.exports = User;