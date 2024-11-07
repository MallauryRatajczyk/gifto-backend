var express = require('express');
var router = express.Router();
const Demande = require('../models/demande');
const User = require('../models/users');
const Item = require('../models/item');
const Categorie = require('../models/categorie');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const item = await Item.find().populate('categorie').populate('proprietaire');
        res.json({ result: true, item });
    } catch (err) {
        console.log(err);
        res.json({ err })
    }
});
//Cherche un item en particulier
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('categorie').populate('proprietaire').populate('demande');
        res.json({ result: true, item });
    } catch (err) {
        console.log('erreur', err);
        res.json({ err })
    }
});
//route pour chercher tous les objets d'un user
router.get('/user/:id', async (req, res) => {
    try {
        const item = await Item.find({ proprietaire: req.params.id }).populate('categorie').populate('proprietaire');
        res.json({ result: true, item: item });
    } catch (err) {
        console.log('erreur', err);
        res.json({ err })
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ token: req.body.token });
        const userId = user._id;
        // Idée pour sous categorie const categorie = catTab.map((e) => { return await User.findOne({ name: e }) });
        const categorie = await Categorie.findOne({ categorie: req.body.categorie });
        const catId = categorie._id;
        const sousCategorie = categorie.sousCategories.find(sub => sub === req.body.subCategorie);      // new Catherine
        const item = new Item({
            name: req.body.name, description: req.body.description, image: req.body.image,
            proprietaire: userId, troc: req.body.troc, categorie: catId, sousCategorie: sousCategorie
        })                // New souscategorie + deletion of : categorie: req.body.categorie
        await item.save()
        const itemPop = await Item.findById(item._id.toString()).populate('categorie').populate('proprietaire');
        res.json({ result: true, itemPop });
    } catch (err) {
        console.log('erreur', err);
        res.json({ err })

    }
});



router.put('/:id', async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.name;
        let image = req.body.name;
        let dateMAJ = Date.now();
        let categorie = await Categorie.findOne({ nom: req.body.categorie });
        categorie = categorie._id;
        let troc = req.body.troc;
        /*let demande = req.body.demande;
        let favoris = req.body.favoris;*/
        const item = await Item.findByIdAndUpdate(req.params.id, { name, description, image, dateMAJ, categorie, troc }).populate('categorie').populate('proprietaire');
        res.json({ result: true, item });
    } catch (err) {
        console.log('erreur', err);
        res.json({ err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        Item.findByIdAndDelete(req.params.id);
        res.json({ result: true });
    } catch (err) {
        console.log('erreur', err);
        res.json({ err })
    }
});

module.exports = router;
