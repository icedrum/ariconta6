var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.FacturasMesCli = function ( callback) {
    var cobros = null;
    var sql = "";
    sql += " select month(fecfactu) mes,sum(totbases) importe from "
    sql += " factcli where fecfactu>='2015-01-01' and fecfactu<='2015-12-31'"
    sql += " group by 1 ORDER BY 1";
    
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



module.exports.FacturasMesPro = function ( callback) {
    var cobros = null;
    var sql = "";
    sql += " select month(fecfactu) mes,sum(totbases) importe from "
    sql += " factpro where fecfactu>='2015-01-01' and fecfactu<='2015-12-31'"
    sql += " group by 1 ORDER BY 1";
    
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




