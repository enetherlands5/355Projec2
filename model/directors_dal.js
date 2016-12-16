var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view director_view as
 select s.*, a.street, a.zipcode from director s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM director_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(director_id, callback) {
    var query = 'SELECT * FROM director_view WHERE director_id = ?';
    var queryData = [director_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO directors (ssn, fname, lname, email, phone, address_id, option_id) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.ssn, params.fname, params.lname, params.email, params.phone, params.address_id, params.option_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(director_id, callback) {
    var query = 'DELETE FROM directors WHERE director_id = ?';
    var queryData = [director_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE directors SET ssn = ?, fname = ?, lname = ?, email = ?, phone = ? WHERE director_id = ?';
    var queryData = [params.ssn, params.fname, params.lname, params.email, params.phone];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS director_getinfo;
 DELIMITER //
 CREATE PROCEDURE director_getinfo (director_id int)
 BEGIN
 SELECT * FROM director WHERE director_id = director_id;
 SELECT a.*, director_id FROM address a
 LEFT JOIN director s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL director_getinfo (4);
 */

exports.edit = function(director_id, callback) {
    var query = 'CALL director_getinfo(?)';
    var queryData = [director_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};