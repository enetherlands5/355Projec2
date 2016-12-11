var express = require('express');
var router = express.Router();
var directors_dal = require('../model/directors_dal');


// View All directors
router.get('/all', function(req, res) {
    directors_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('director/directorViewAll', { 'result':result });
        }
    });

});

// View the director for the given id
router.get('/', function(req, res){
    if(req.query.director_id == null) {
        res.send('director_id is null');
    }
    else {
        directors_dal.getById(req.query.director_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('director/directorViewById', {'result': result});
            }
        });
    }
});

// insert a director record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.director_name == null) {
        res.send('director Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        directors_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/director/all');
            }
        });
    }
});

// Delete a director for the given director_id
router.get('/delete', function(req, res){
    if(req.query.director_id == null) {
        res.send('director_id is null');
    }
    else {
        directors_dal.delete(req.query.director_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/director/all');
            }
        });
    }
});

module.exports = router;