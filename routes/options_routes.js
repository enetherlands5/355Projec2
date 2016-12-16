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
            res.render('options/optionsViewAll', { 'result':result });
        }
    });

});

// Return the add a new option form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    options_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('options/optionsAdd', {'options': result});
        }
    });
});

// insert a option record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.location == null) {
        res.send('Location must be provided.');
    }
    else if(req.query.name == null) {
        res.send('A name must be selected');
    }
    else if(req.query.num_days == null) {
        res.send('A num_days must be selected');
    }
    else if(req.query.cost == null) {
        res.send('A cost must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        options_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/options/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.option_id == null) {
        res.send('A option id is required');
    }
    else {
        options_dal.edit(req.query.option_id, function(err, result){
            res.render('options/optionsUpdate', {options: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    options_dal.update(req.query, function(err, result){
        res.redirect(302, '/options/all');
    });
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
                res.redirect(302, '/options/all');
            }
        });
    }
});

module.exports = router;