var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// upload fichiers cloudinary

const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');

router.post('/upload', async (req, res) => {
  try {
    console.log(req.files.photoFromFront);
    const photoPath = `./tmp/${uniqid()}.jpg`;
    const resultMove = await req.files.photoFromFront.mv(photoPath);

 if (!resultMove) {
   const resultCloudinary = await cloudinary.uploader.upload(photoPath);
   console.log('URL de l\'image:', resultCloudinary.secure_url); 
   res.json({ result: true, url: resultCloudinary.secure_url });
 } else {
   res.json({ result: false, error: resultMove });
 }

    fs.unlinkSync(photoPath);
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image :", error);
    res.status(500).json({ result: false, error: error.message });

  }
});



module.exports = router;
