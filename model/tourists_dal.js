var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view tourists as
 select s.*, a.street, a.zipcode from tourists s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM tourists;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(tourist_id, callback) {
    var query = 'SELECT * FROM tourists WHERE tourist_id = ?';
    var queryData = [tourist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO tourists (tourists_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.tourists_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(tourist_id, callback) {
    var query = 'DELETE FROM tourists WHERE tourist_id = ?';
    var queryData = [tourist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};