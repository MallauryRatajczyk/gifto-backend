const express = require('express');
const router = express.Router();
const Demande = require('../models/demande');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');



//créer une nouvelle demande

router.post('/', async (req, res) => {
    if (!checkBody(req.body, ['token'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    try {
        const user = await User.findOne({ token: req.body.token });
        if (!user) {
            res.json({ result: false, error: 'User not found' });
            return;
        }

        const { expediteur, destinataire, type, message } = req.body;
        const newDemande = new Demande({
            expediteur,
            destinataire,
            type,
            message,
        });

        const newDoc = await newDemande.save();
        res.json({ result: true, demande: newDoc });
    } catch (err) {
        res.json({ error: err.message });
    }
});


//récupérer une demande par son Id

router.get('/:id', async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) {
            return res.json({ error: 'Request not found' });
        }
        res.json(demande);
    } catch (err) {
        res.json({ error: err.message });
    }
});



// récupérer toutes les demandes

router.get('/', async (req, res) => {
    try {
        const demandes = await Demande.find();
        if (!demandes) {
            return res.json({ error: 'Requests not found' });
        }
        res.json(demandes);
    } catch (err) {
        res.json({ error: err.message });
    }
});



//mettre à jour une demande
router.put('/:id', async (req, res) => {
    if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    try {
        const user = await User.findOne({ token: req.body.token });
        if (!user) {
            res.json({ result: false, error: 'User not found' });
            return;
        }

        const { statut, message, type } = req.body;
        const updateDemande = {
            statut,
            message,
            type,
            dateMAJ: Date.now(),
        };

        const updatedDoc = await Demande.findByIdAndUpdate(req.params.id, updateDemande, { new: true });  //met à jour la demande en BDD et retourne une réponse
        if (!updatedDoc) {
            return res.json({ error: 'Request not found' });
        }
        res.json(updatedDoc);
    } catch (err) {
        res.json({ error: err.message });
    }
});



// supprimer une demande
router.delete('/:id', async (req, res) => {
    if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    try {
        const user = await User.findOne({ token: req.body.token });
        if (!user) {
            res.json({ result: false, error: 'User not found' });
            return;
        }
    
      const deletedDemande = await Demande.findByIdAndDelete(req.params.id);
  
      if (!deletedDemande) {
        return res.json({ error: 'Demande not found' });
      }
  
      res.json({ message: 'request deleted successfully' });
    } catch (err) {
      res.json({ error: err.message });
    }
  });


module.exports = router;