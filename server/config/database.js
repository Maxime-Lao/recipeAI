const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'app',
  username: 'root',
  password: 'password',
  host: 'localhost',
  port: 5439, 
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Connexion à la base de données établie avec succès.');
} catch (error) {
  console.error('Erreur de connexion à la base de données:', error);
}

module.exports = sequelize;
