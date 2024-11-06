const mongoose = require('mongoose');


const typeSchema = mongoose.Schema({
  troc: { type: Boolean, default: false },
  objetPropose: [String]
})

const demandeSchema = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
  possesseur: { type: String, required: true },
  demandeur: { type: String, required: true },
  type: typeSchema,
  message: [{ de: String, a: String, message: { type: String, required: true }, date: { type: Date, default: Date.now() } }],
  statut: { type: String, enum: ['pending', 'accepted', 'declined', 'read'], default: 'pending' },
  dateCreation: { type: Date, default: Date.now() },
  dateMAJ: Date,
});

const Demande = mongoose.model('demandes', demandeSchema);

module.exports = Demande;
