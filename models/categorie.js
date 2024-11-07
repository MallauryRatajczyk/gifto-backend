const mongoose = require('mongoose');

// Define the main category and sub category schema
const categorieSchema = new mongoose.Schema({
  categorie: { 
    type: String, 
    required: true 
    },
  sousCategories: 
  [
    {type: String, 
    required: true
  }
  ]  
});

Categorie = mongoose.model('categories', categorieSchema);

module.exports = Categorie;
