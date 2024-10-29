const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nom: {type: String, required: true},
  prenom: {type: String, required: true},
  email: { type: String, unique: true, match: /\S+@\S+.\S+/ , required: true }, // email unique normalement pas besoin du findOne dans la création
  username: {type: String, required: true},
  age: {type: Number, required: true},
  password: {type: String, required: true},
  token: String,
  create_at: {type: Date, default: Date.now()},
  update_at: Date,
  tel: Number,
  historique: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }, // foreign Key des demandes
});

const User = mongoose.model('users', userSchema);

module.exports = User;