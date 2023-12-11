const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
  try {
    const { login, mail, password } = req.body;
    const newUser = await User.create({ login, mail, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
      const { id } = req.params;
      const { login, mail, password } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      await user.update({ login, mail, password });
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      await user.destroy();
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function registerUser(req, res) {
  try {
    const { login, mail, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Crypter le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe crypté
    const newUser = await User.create({ login, mail, password: hashedPassword });

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: newUser.id }, 'votre_secret_token', { expiresIn: '1h' });

    res.status(201).json({ userId: newUser.id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { mail, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ where: { mail } });
    if (!existingUser) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier si le mot de passe est correct en comparant avec le hash stocké
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: existingUser.id }, 'votre_secret_token', { expiresIn: '1h' });

    res.status(200).json({ userId: existingUser.id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function logoutUser(req, res) {
  try {
    // Dans une implémentation réelle, vous pouvez simplement ignorer le token et déclarer l'utilisateur comme déconnecté.
    // Ici, pour la démonstration, nous allons simplement retourner un message indiquant la déconnexion réussie.
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
};
