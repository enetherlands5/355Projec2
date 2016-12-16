var express = require('express');
var router = express.Router();
var directors_dal = require('../model/directors_dal');
var address_log_dal = require('../model/address_log_dal');
var options_dal = require('../model/options_dal');


// View All directors
router.get('/all', function(req, res) {
    directors_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('directors/directorsViewAll', {'result': result});
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
                res.render('directors/directorsViewById', {'result': result});
            }
        });
    }
});
// Return the add a new director form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    directors_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('directors/directorsAdd', {'directors': result, 'address_log': result, 'options': result});
        }
    });
});

// View the director for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('director Name must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        directors_dal.insert(req.query, function(err,result) {
            address_log_dal.insert(req.query, function(err, result) {
                options_dal.insert(req.query, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                        res.redirect(302, '/directors/all');
                    }
                });
            });
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.director_id == null) {
        res.send('A director id is required');
    }
    else {
        directors_dal.edit(req.query.director_id, function(err, result){
            res.render('directors/directorsUpdate', {directors: result[0][0], address_log: result[1], options: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.director_id == null) {
        res.send('A director id is required');
    }
    else {
        directors_dal.getById(req.query.director_id, function(err, director){
            address_log_dal.getById(req.query.address_id, function(err, address) {
                options_dal.getById(req.query.option_id, function (err, option) {
                    res.render('directors/directorsUpdate', {
                        directors: director[0][0],
                        address_log: address[1],
                        options: option[1]
                    });
                });
            });
        });
    }

});

router.get('/update', function(req, res){
    directors_dal.update(req.query, function(err, result){
        address_log_dal.update(req.query, function (err, result) {
            options_dal.update(req.query, function (err, result) {
                res.redirect(302, '/directors/all');
            });
        });
    });
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
                res.redirect(302, '/directors/all');
            }
        });
    }
});

module.exports = router;