const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nom: {type: String, required: true},
  prenom: String,
  email: { type: String, unique: true, match: /\S+@\S+.\S+/ }, // email unique normalement pas besoin du findOne dans la création
  username: String,

  password: String,
  token: String,
  create_at: {type: Date, default: Date.now()},
  update_at: Date,
  tel: Number,
  historique: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
});

const User = mongoose.model('users', userSchema);

module.exports = User;