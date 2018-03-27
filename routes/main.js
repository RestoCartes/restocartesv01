var router = require('express').Router()
var Carte = require('../models/carte')

router.get('/', function(req, res, next){
    res.render('index')
})

router.get('/statistiques', function(req, res, next){

    Carte.count().exec(function(err, count){
        if (err) return next(err)
            res.render('main/statistiques', {
                count: count
            })
    })
})

router.get('/newcarte', function(req, res, next){

    'use strict';
    const fs = require('fs');

    let rawdata = fs.readFileSync('./public/countries.json');  
    let pays = JSON.parse(rawdata);  

	res.render('main/newcarte', {
        dropdownVals: pays
        
    })
    console.log(pays)
})

router.post('/newcarte', function(req, res, next){
  
	var carte = new Carte()

	carte.nom_resto = req.body.nom_resto
	carte.ville_resto = req.body.ville_resto
	carte.pays_resto = req.body.pays_resto
    carte.adresse = req.body.adresse 
    carte.zip = req.body.zip

    carte.save(function(err){
        if (err) throw err 
        res.redirect('newcarte')
    })
})

router.get('/cartes/:page', function(req, res, next) {
    var perPage = 5
    var page = req.params.page || 1

    Carte
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, cartes) {
            Carte.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('main/cartes', {
                    cartes: cartes,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

// ATTENTION problèmes avec les é routes ci-dessous !! //

router.post('/cartes/:page', function(req, res, next){

        carte_id = req.body.id_resto
        console.log(carte_id)
        res.redirect('../carte_detail/' + carte_id)

    })

router.get('/carte_detail/:carte_id', function(req, res, next){

            carte_id = req.params.carte_id;

            const query = {"_id": req.params.carte_id}

            Carte
                .find(query)
                .exec(function(err, cartes){
                    console.log(cartes),
                    res.render('main/carte_detail', {
                        cartes: cartes
                    })
                })

        })


module.exports = router

