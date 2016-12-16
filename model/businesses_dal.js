var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view business_view as
 select s.*, a.street, a.zipcode from business s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM business_address_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(business_id, callback) {
    var query = 'SELECT * FROM business_address_view WHERE business_id = ?';
    var queryData = [business_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO businesses (name, category, address_id) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.name, params.category, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(business_id, callback) {
    var query = 'DELETE FROM businesses WHERE business_id = ?';
    var queryData = [business_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE businesses SET name = ?, category = ? WHERE business_id = ?';
    var queryData = [params.name, params.category];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS business_getinfo;
 DELIMITER //
 CREATE PROCEDURE business_getinfo (business_id int)
 BEGIN
 SELECT * FROM business WHERE business_id = business_id;
 SELECT a.*, business_id FROM address a
 LEFT JOIN business s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL business_getinfo (4);
 */

exports.edit = function(business_id, callback) {
    var query = 'CALL business_getinfo(?)';
    var queryData = [business_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};