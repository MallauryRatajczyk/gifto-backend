var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// GET user.
router.get('/', function(req, res) {
  res.json({});
}); //

// GET user id.
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

// POST user enregistrer.
router.post('/enregistrer', (req, res) => {
  if (!checkBody(req.body, ['nom', 'email', 'password'])) {
    res.json({ result: false, error: 'Champ non saisi.' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: req.body.emaail }).then(data => {
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
  }});
});

// POST user login.

// PUT user id.

// PUT user id/historique.

// DELETE user id.

module.exports = router;
