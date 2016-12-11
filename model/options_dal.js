var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view option as
 select s.*, a.street, a.zipcode from options s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM options;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(option_id, callback) {
    var query = 'SELECT * FROM options WHERE option_id = ?';
    var queryData = [option_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO options (options_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.options_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(option_id, callback) {
    var query = 'DELETE FROM options WHERE option_id = ?';
    var queryData = [option_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};