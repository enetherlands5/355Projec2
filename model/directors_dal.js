var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view director as
 select s.*, a.street, a.zipcode from directors s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM directors;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(director_id, callback) {
    var query = 'SELECT * FROM directors WHERE director_id = ?';
    var queryData = [director_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO directors (directors_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.directors_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(director_id, callback) {
    var query = 'DELETE FROM directors WHERE director_id = ?';
    var queryData = [director_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};