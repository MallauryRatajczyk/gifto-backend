const mongoose = require('mongoose');

// Define the sub-category schema
const sousCategorieSchema = new mongoose.Schema({ // Sub-document schema
  nom: { 
    type: String, 
    required: true 
    }
}); 

// Define the main category schema
const categorieSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true 
    },
  sousCategories: [sousCategorieSchema]  // Array of sub-document schema
});

Categorie = mongoose.model('categories', categorieSchema);

module.exports = Categorie;
