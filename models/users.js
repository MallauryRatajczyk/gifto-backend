const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true, match: /\S+@\S+.\S+/ },
  password: String,
  token: String,
  create_at: Date,
  update_at: Date,
  tel: Number,
  historique: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
});

const User = mongoose.model('users', userSchema);

module.exports = User;