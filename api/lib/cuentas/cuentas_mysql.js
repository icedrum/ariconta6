var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCuentas = function ( callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " codmacta,nommacta,nifdatos";
    sql += " FROM  cuentas WHERE apudirec='S'";
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result) {
            cobros = result;
        }
        callback(null, cobros);
        conector.closeConnection(connection);
    });
};
