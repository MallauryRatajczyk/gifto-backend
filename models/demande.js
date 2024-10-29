const mongoose = require('mongoose');


const demandeSchema = mongoose.Schema({
  expediteur: {type: String, required: true },
  destinataire: {type: String, required: true },
  type:{troc:Boolean, objetPropose:[]},
  message: String,
  statut: {type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending'}, dateCreation: {type: Date, default: Date.now()},
  dateMAJ: Date,
});

const Demande = mongoose.model('demandes', demandeSchema);

module.exports = Demande;
