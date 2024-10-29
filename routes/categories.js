var express = require('express');
var router = express.Router();

const mongoose = require('mongoose'); // Connect to Mongoose
const Categorie = require('../models/categorie'); // Create this Mongoose model


// GET all categories: (for the "Single Choice" menu)
// http://localhost:3000/categories/ (GET)
router.get('/', (req, res) => {
    Categorie.find()
      .then(categories => {
        res.json({ result: true, categories });
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
  });


// GET Subcategories Based on Selected Category by ID (for the "Multiple Choice" menu)
// http://localhost:3000/categories/671fb10971522242a0f46559 (GET ID)
router.get('/:id', (req, res) => {
    Categorie.findById(req.params.id)
      .then(category => {
        if (category) {
          res.json({ result: true, category });
        } else {
          res.json({ result: false, message: 'Category not found' });
        }
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
});

// POST a new category
// http://localhost:3000/categories/ (POST)
router.post('/', (req, res) => {
  const { nom, sousCategories } = req.body;
  const newCategory = new Categorie({
    nom,
    sousCategories
  });

  newCategory.save()
    .then(category => {
      res.json({ result: true, category });
    })
    .catch(error => {
      res.json({ result: false, error: error.message });
    });
});

// POST add a new sub-category to a specific category (NOT TESTED YET)
router.post('/:id/sousCategories', (req, res) => {
  const { nom } = req.body; // Name of the new sub-category

  Categorie.findById(req.params.id)
    .then(category => {
      if (!category) {
        return res.json({ result: false, message: 'Category not found' });
      }
      
      // Add the new sub-category
      category.sousCategories.push({ nom });
      
      return category.save(); // Save the updated category with the new sub-category
    })
    .then(updatedCategory => {
      res.json({ result: true, updatedCategory });
    })
    .catch(error => {
      res.json({ result: false, error: error.message });
    });
});

module.exports = router;




// Extra for the future :)
/*


// PUT update category by ID  (NOT TESTED YET)
router.put('/:id', (req, res) => {
    const { nom, sousCategories } = req.body;
    Categorie.findByIdAndUpdate(req.params.id, { nom, sousCategories }, { new: true })
      .then(updatedCategory => {
        if (updatedCategory) {
          res.json({ result: true, updatedCategory });
        } else {
          res.json({ result: false, message: 'Category not found' });
        }
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
});

// DELETE category by ID  (NOT TESTED YET)
router.delete('/:id', (req, res) => {
    Categorie.findByIdAndDelete(req.params.id)
      .then(deletedCategory => {
        if (deletedCategory) {
          res.json({ result: true, message: 'Category deleted' });
        } else {
          res.json({ result: false, message: 'Category not found' });
        }
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
});

// Sub-Category Operations:



// PUT update an existing sub-category in a category (NOT TESTED YET)
router.put('/:categoryId/sousCategories/:subCategoryId', (req, res) => {
    const { nom } = req.body; // New name for the sub-category
  
    Categorie.findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.json({ result: false, message: 'Category not found' });
        }
  
        // Find the sub-category within the array
        const subCategory = category.sousCategories.id(req.params.subCategoryId);
        if (!subCategory) {
          return res.json({ result: false, message: 'Sub-category not found' });
        }
  
        // Update the sub-category name
        subCategory.nom = nom;
        
        return category.save(); // Save the updated category with the modified sub-category
      })
      .then(updatedCategory => {
        res.json({ result: true, updatedCategory });
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
});

// DELETE remove a sub-category from a category (NOT TESTED YET)
router.delete('/:categoryId/sousCategories/:subCategoryId', (req, res) => {
    Categorie.findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.json({ result: false, message: 'Category not found' });
        }
  
        // Remove the sub-category by its ID
        const subCategory = category.sousCategories.id(req.params.subCategoryId);
        if (!subCategory) {
          return res.json({ result: false, message: 'Sub-category not found' });
        }
  
        subCategory.remove(); // Remove the sub-category
        return category.save(); // Save the updated category without the deleted sub-category
      })
      .then(updatedCategory => {
        res.json({ result: true, updatedCategory });
      })
      .catch(error => {
        res.json({ result: false, error: error.message });
      });
});
*/
