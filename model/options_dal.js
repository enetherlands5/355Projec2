var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view option_view as
 select s.*, a.street, a.zipcode from option s
 join option a on a.option_id = s.option_id;
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
    var query = 'INSERT INTO options (location, name, num_days, cost) VALUES (?, ?, ?, ?)';
    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.location, params.name, params.num_days, params.cost];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(option_id, callback) {
    var query = 'DELETE FROM options WHERE option_id = ?';
    var queryData = [option_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


exports.update = function(params, callback) {
    var query = 'UPDATE options SET street = ?, city = ?, state = ?, zip = ? WHERE option_id = ?';
    var queryData = [params.location, params.name, params.num_days, params.cost];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS option_getinfo;
 DELIMITER //
 CREATE PROCEDURE option_getinfo (option_id int)
 BEGIN
 SELECT * FROM option WHERE option_id = option_id;
 SELECT a.*, option_id FROM option a
 LEFT JOIN option s on s.option_id = a.option_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL option_getinfo (4);
 */

exports.edit = function(option_id, callback) {
    var query = 'CALL option_getinfo(?)';
    var queryData = [option_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};