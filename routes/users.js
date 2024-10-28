var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { now } = require('mongoose');

// GET user.
router.get('/', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, user: data.canBookmark });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé.' });
    }
  });
});

// GET user/:id.
router.get('/:id', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, canBookmark: data.canBookmark });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});

// POST user/enregistrer pour l'enregistrement d'un nouvel utilisateur.
router.post('/enregistrer', (req, res) => {
  if (!checkBody(req.body, ['nom', 'email', 'password'])) {
    res.json({ result: false, error: 'Champ non saisi.' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      }); 
  } else {
    res.json({ result: false, error: `L'utilisateur existe déjà.` });
  }});
});

// POST user/login pour la connexion d'un tulisateur qui a déjà son compte.
router.post('/login', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Champ non saisi.' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé ou password invalide.' });
    }
  });
});

// PUT user/:id.

// PUT user/:id/historique.

// DELETE user/:id.

module.exports = router;
