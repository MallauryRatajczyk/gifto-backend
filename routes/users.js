var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const Demande = require('../models/demande');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// GET tous les utilisateurs. ===> test TC ok
router.get('/', (req, res) => {
  User.find().then(data => {
    if (data) {
      // Extrait les détails des utilisateurs.
      const users = data.map(user => ({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        username: user.username,
      }));
      res.json({ result: true, users });
    } else {
      res.json({ result: false, error: 'Aucun utilisateurs trouvés.' });
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});

// GET user/:id renvoie un utilisateur en le recherchant par son id ===> test TC ok
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(data => {
    if (data) {
      res.json({ result: true, user: { nom: data.nom, prenom: data.prenom, email: data.email, username: data.username } });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé.' });
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});

// POST user/enregistrer pour l'enregistrement d'un nouvel utilisateur. ===> test TC ok
router.post('/enregistrer', (req, res) => {
  if (!checkBody(req.body, ['nom', 'prenom', 'age', 'email', 'password', 'username'])) {
    res.json({ result: false, error: 'Champs non saisi.' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });
      return newUser.save(); // Retourne la promesse de sauvegarde
    } else {
      res.json({ result: false, error: `L'utilisateur existe déjà.` });
    }
  }).then(newDoc => {
    if (newDoc) {
      res.json({ result: true, token: newDoc.token });
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});

// POST user/login pour la connexion d'un utilisateur qui a déjà son compte. ===> test TC ok
router.post('/login', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Champs non saisi.' });
    return;
  }
  //Recherche soit sur l'email soit sur l'username
  User.findOne({
    $or: [
      { email: req.body.email },
      { username: req.body.username }
    ]
  }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé ou mot de passe invalide.' });
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});

// PUT user/:id pour mettre à jour les informations d'un utilisateur.
router.put('/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      Object.assign(user, req.body); //modifie dans user ce qui est récupéré de req.body
      return user.save(); // sauvegarde l'utilisateur mis à jour
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé.' });
    }
  })
    .then(updatedUser => {
      // Vérifie si l'utilisateur a été mis à jour
      if (updatedUser) {
        res.json({ result: true, user: updatedUser });
      }
    }).catch(err => {
      res.json({ error: err.message });
    })
});

// PUT user/:id/historique, mettre à jour l'historique d'un utilisateur
router.put('/:id/historique', async (req, res) => { //callback donc fonction asynchrone
  const demandes = await Demande.find({ expediteur: req.params.id }); //attend que le tableau soit renvoyé
  const demand = await Demande.find({ destinataire: req.params.id }); //attend que le tableau soit renvoyé
  const historique = demandes + demand;
  User.findByIdAndUpdate(req.params.id, { historique }).then(user => {
    if (user) {
      res.json({ result: true, user });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé.' });
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});

// DELETE user/:id.
router.delete('/:id', async (req, res) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      User.findByIdAndDelete(req.params.id);
      res.json({ result: true, message: 'Utilisateur supprimé' });
    } else {
      res.json({ result: false })
    }
  }).catch(err => {
    res.json({ error: err.message });
  })
});


module.exports = router;
