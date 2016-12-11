var express = require('express');
var router = express.Router();
var address_log_dal = require('../model/address_log_dal');


// View All addresss
router.get('/all', function(req, res) {
    address_log_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address_log/address_logViewAll', { 'result':result });
        }
    });

});

// Return the add a new address form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_log_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('address_log/address_logAdd', {'address_log': result});
        }
    });
});

// insert a address record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.street == null) {
        res.send('address Name must be provided.');
    }
    else if(req.query.city == null) {
        res.send('A city must be selected');
    }
    else if(req.query.state == null) {
        res.send('A state must be selected');
    }
    else if(req.query.zip == null) {
        res.send('A zip must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address_log_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address_log/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.address_id == null) {
        res.send('A address id is required');
    }
    else {
        address_log_dal.edit(req.query.address_id, function(err, result){
            res.render('address_log/address_logUpdate', {address_log: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    address_log_dal.update(req.query, function(err, result){
        res.redirect(302, '/address_log/all');
    });
});

// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_log_dal.delete(req.query.address_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address_log/all');
            }
        });
    }
});

module.exports = router;