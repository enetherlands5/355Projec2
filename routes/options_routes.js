var express = require('express');
var router = express.Router();
var options_dal = require('../model/options_dal');


// View All options
router.get('/all', function(req, res) {
    options_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('option/optionViewAll', { 'result':result });
        }
    });

});

// View the option for the given id
router.get('/', function(req, res){
    if(req.query.option_id == null) {
        res.send('option_id is null');
    }
    else {
        options_dal.getById(req.query.option_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('option/optionViewById', {'result': result});
            }
        });
    }
});

// insert a option record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.option_name == null) {
        res.send('option Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        options_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/option/all');
            }
        });
    }
});

// Delete a option for the given option_id
router.get('/delete', function(req, res){
    if(req.query.option_id == null) {
        res.send('option_id is null');
    }
    else {
        options_dal.delete(req.query.option_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/option/all');
            }
        });
    }
});

module.exports = router;