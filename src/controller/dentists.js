var express = require('express');
const router = express.Router();

var Dentist = require('../model/dentist');

    router.get('/api/dentists', function (req, res, next) {
        Dentist.find(function (err, dentist) {
            if (err) { return next(err); }
            res.json({ "dentists": dentist });
        });
    });
    

    router.post('/api/dentists', function (req, res, next) {
        var dentist = new Dentist(req.body);
        dentist.save(function (err, dentist) {
            if (err) { return next(err); }
            res.status(201).json(dentist);
        });
    
    });
    
module.exports = router;