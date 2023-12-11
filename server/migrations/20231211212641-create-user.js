'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preferenceId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Si l'utilisateur peut avoir une préférence ou non
        references: {
          model: 'Preference', // Nom de la table parente
          key: 'id' // Colonne référencée dans la table parente
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de l'ID de préférence
        onDelete: 'SET NULL' // Action en cas de suppression de la préférence
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
