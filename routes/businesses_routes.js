var express = require('express');
var router = express.Router();
var businesses_dal = require('../model/businesses_dal');
var address_log_dal = require('../model/address_log_dal');


// View All businesss
router.get('/all', function(req, res) {
    businesses_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('businesses/businessesViewAll', { 'result':result });
        }
    });

});

// View the business for the given id
router.get('/', function(req, res){
    if(req.query.business_id == null) {
        res.send('business_id is null');
    }
    else {
        businesses_dal.getById(req.query.business_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('businesses/businessesViewById', {'result': result});
            }
        });
    }
});

// Return the add a new business form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_log_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('businesses/businessesAdd', {'address_log': result});
        }
    });
});

// View the business for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('Business Name must be provided.');
    }
    else if(req.query.category == null) {
        res.send('Category must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        businesses_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/businesses/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.business_id == null) {
        res.send('A business id is required');
    }
    else {
        businesses_dal.edit(req.query.business_id, function(err, result){
            res.render('businesses/businessesUpdate', {businesses: result[0][0], address_log: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.business_id == null) {
        res.send('A business id is required');
    }
    else {
        businesses_dal.getById(req.query.business_id, function(err, business){
            address_log_dal.getAll(function(err, address) {
                res.render('businesses/businessesUpdate', {businesses: business[0], address_log: address});
            });
        });
    }

});

router.get('/update', function(req, res){
    businesses_dal.update(req.query, function(err, result){
        res.redirect(302, '/businesses/all');
    });
});

// Delete a business for the given business_id
router.get('/delete', function(req, res){
    if(req.query.business_id == null) {
        res.send('business_id is null');
    }
    else {
        businesses_dal.delete(req.query.business_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/businesses/all');
            }
        });
    }
});

module.exports = router;