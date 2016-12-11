var express = require('express');
var router = express.Router();
var tourists_dal = require('../model/tourists_dal');


// View All tourists
router.get('/all', function(req, res) {
    tourists_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('tourist/touristViewAll', { 'result':result });
        }
    });

});

// View the tourist for the given id
router.get('/', function(req, res){
    if(req.query.tourist_id == null) {
        res.send('tourist_id is null');
    }
    else {
        tourists_dal.getById(req.query.tourist_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('tourist/touristViewById', {'result': result});
            }
        });
    }
});

// insert a tourist record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.tourist_name == null) {
        res.send('tourist Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        tourists_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/tourist/all');
            }
        });
    }
});

// Delete a tourist for the given tourist_id
router.get('/delete', function(req, res){
    if(req.query.tourist_id == null) {
        res.send('tourist_id is null');
    }
    else {
        tourists_dal.delete(req.query.tourist_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/tourist/all');
            }
        });
    }
});

module.exports = router;