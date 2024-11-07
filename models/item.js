const mongoose = require('mongoose');


const itemSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now() },
    dateMAJ: Date,
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    sousCategorie: { type: String, required: true },                        // new cath
    troc: { type: Boolean, default: false },
    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    demande: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'demandes' }], default: [] },
    favoris: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], default: [] },
    transaction: Boolean,
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;
