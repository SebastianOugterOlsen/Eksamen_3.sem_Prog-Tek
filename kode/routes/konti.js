var express = require('express');
var router = express.Router();

// Inkluderer database og angiver port til forbindelse
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
  1. Komplet liste over kunder i databasen indsat i HTML-tabel (GET request)
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til db via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("eksamen"); // Henviser til databasens navn
    dbo.collection("cryptobank").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'cryptopbank | Tabel over alle kunder i systemet';
      obj.konti = result; // Angiver, at respons fra db skal tilføjes objektet
      res.render('konti', obj);
      db.close(); // Lukker forbindelse til database
    });
  });
});

/*
  2. Komplet liste over alle kunder vist som array i JSON-format (GET request)
*/
router.get('/json', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    dbo.collection("cryptobank").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {};
      obj.konti = result;
      res.json(obj); // Her fortæller vi, at den skal render indholdet af objektet som JSON
      console.log("Komplet liste over alle kunder vises som JSON.");
      db.close();
    });
  });
});

/*
  3. Opretter en ny bruger i databasen (POST request)
*/
router.post('/post', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var konto = {};
    // Kobler de nye keys med brugerindtastningen
    konto.Uid = req.body.Uid;
    konto.kodeord = req.body.kodeord;
    konto.cprnummer = req.body.cprnummer;
    konto.fuldenavn = req.body.fuldenavn;
    konto.adresse = req.body.adresse;
   
  
    dbo.collection("cryptobank").insertOne(konto, function (err, res) {
      if (err) throw err;
      console.log("Bruger blev tilføjet til den valgte collection.");
      db.close();
    });
    // Videresender til den samlede oversigt
    res.redirect("/konti");
  });
});

/*
  4. Fjerner en specifik bruger/konto fra databasen (DELETE request)
*/
router.post('/delete/:Uid', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.params.Uid;
    dbo.collection("cryptobank").deleteOne({Uid}, function (err, res) {
      if (err) throw err;
      console.log("Konto/bruger blev fjernet fra den valgte collection.");
      db.close();
    });
    res.redirect("/konti");
  });
});

/*
  5. Redigerer en specifik bruger/konto fra databasen (PUT Request)
*/
router.post('/put', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.body.UidPUT;
    var oldValues = { Uid: Uid };
    var newValues = { $set: {Uid: req.body.UidPUT, kodeord: req.body.kodeordPUT,  cprnummer: req.body.cprnummerPUT,  fuldenavn: req.body.fuldenavnPUT, adresse: req.body.adressePUT} };
    dbo.collection("cryptobank").updateOne(oldValues, newValues, function (err, res) {
      if (err) throw err;
      console.log("Data for den specifikke bruger/konto er nu ændret.");
      db.close();
    });
    res.redirect("/konti");
  });
});

/* ^^Bruger^^ */

/*
  1. Komplet liste over kontoer i databasen indsat i HTML-tabel (GET request)
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til db via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("eksamen"); // Henviser til databasens navn
    dbo.collection("cryptobankkonto").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'cryptopbankkonto | Tabel over alle kontoer i systemet';
      obj.konto = result; // Angiver, at respons fra db skal tilføjes objektet
      res.render('konto', obj);
      db.close(); // Lukker forbindelse til database
    });
  });
});

/*
  2. Opretter en ny konto i databasen (POST request)
*/
router.post('/post', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var konto2 = {};
    // Kobler de nye keys med brugerindtastningen
    konto2.Uid = req.body.Uid;
    konto2.kontonummer = req.body.kontonummer;
    konto2.valutatype = req.body.valutatype;
    konto2.saldo = req.body.saldo;
  
    dbo.collection("cryptobankkonto").insertOne(konto2, function (err, res) {
      if (err) throw err;
      console.log("Konto blev tilføjet til den valgte collection.");
      db.close();
    });
    // Videresender til den samlede oversigt
    res.redirect("/konto");
  });
});

/*

/*
  3. Fjerner en specifik bruger/konto fra databasen (DELETE request)

router.post('/delete/:Uid', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.params.Uid;
    dbo.collection("cryptobankkonto").deleteOne({Uid}, function (err, res) {
      if (err) throw err;
      console.log("Konto/bruger blev fjernet fra den valgte collection.");
      db.close();
    });
    res.redirect("/konto");
  });
});
*/
/*
  4. Redigerer en specifik konto fra databasen (PUT Request)

router.post('/put', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.body.UidPUT;
    var oldValues = { Uid: Uid };
    var newValues = { $set: {Uid: req.body.UidPUT, kontonummer: req.body.kontonummer,  valutatype: req.body.valutatypePUT,  saldo: req.body.saldoPUT} };
    dbo.collection("cryptobankkonto").updateOne(oldValues, newValues, function (err, res) {
      if (err) throw err;
      console.log("Data for den specifikke bruger/konto er nu ændret.");
      db.close();
    });
    res.redirect("/konto");
  });
});
*/



module.exports = router;