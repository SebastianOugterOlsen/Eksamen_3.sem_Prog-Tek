var express = require('express');
var router = express.Router();

// Inkluderer database og angiver port til forbindelse
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
  1. Komplet liste over konti i databasen indsat i HTML-tabel
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til db via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("eksamen"); // Henviser til databasens navn
    dbo.collection("bec-bank").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'BEC Bank | Tabel over alle konti i systemet';
      obj.konti = result; // Angiver, at respons fra db skal tilføjes objektet
      res.render('konti', obj);
      db.close(); // Lukker forbindelse til database
    });
  });
});