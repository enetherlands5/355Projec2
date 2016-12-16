var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view tourist_view as
 select s.*, a.street, a.zipcode from tourist s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM tourist_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(tourist_id, callback) {
    var query = 'SELECT * FROM tourist_view WHERE tourist_id = ?';
    var queryData = [tourist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO tourists (ssn, fname, lname, email, phone, card_number, expiration_date, cvc_code, address_id, option_id) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.ssn, params.fname, params.lname, params.email, params.phone,
        params.card_number, params.expiration_date, params.cvc_code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(tourist_id, callback) {
    var query = 'DELETE FROM tourists WHERE tourist_id = ?';
    var queryData = [tourist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE tourists SET ssn = ?, fname = ?, lname = ?, email = ?, phone = ?, ' +
        'card_number = ?, expiration_date = ?, cvc_code = ? WHERE tourist_id = ?';
    var queryData = [params.ssn, params.fname, params.lname, params.email, params.phone,
        params.card_number, params.expiration_date, params.cvc_code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS tourist_getinfo;
 DELIMITER //
 CREATE PROCEDURE tourist_getinfo (tourist_id int)
 BEGIN
 SELECT * FROM tourist WHERE tourist_id = tourist_id;
 SELECT a.*, tourist_id FROM address a
 LEFT JOIN tourist s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL tourist_getinfo (4);
 */

exports.edit = function(tourist_id, callback) {
    var query = 'CALL tourist_getinfo(?)';
    var queryData = [tourist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};