const AWS = require("aws-sdk");
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials" : true
  };
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'testdb.c1nuhwulh2ej.us-east-1.rds.amazonaws.com',
    user: 'avirup',
    password: 'welcome123',
    database: 'testdb'
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function(err, connection){
        connection.query('call testdb.get_books()', function(error, results, fields){
            connection.release();
    
            if(error) {
                callback(null, {
                    statusCode: 500,
                    headers: headers,
                    body: JSON.stringify({ error: err})
                });
            }
            else{
                callback(null, {
                    statusCode: 200,
                    headers: headers,
                    body: JSON.stringify(results[0])
                });
            }
        });
    });
};

