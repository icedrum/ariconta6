var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCuentas = function ( callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " codmacta,nommacta";
    sql += " FROM  cuentas WHERE apudirec='S'";
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result) {
            cobros = result;
        }
        callback(null, cobros);
        conector.closeConnection(connection);
    });
};


module.exports.getExtracto = function (codmacta, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fechaent,numasien,numdocum,codconce,ampconce,nommacta,"
    sql += " timported,timporteh from hlinapu left join cuentas on"
    sql += " hlinapu.ctacontr=cuentas.codmacta where fechaent>='2015-01-01'"
    sql += " AND hlinapu.codmacta = ?"
    sql += " order by fechaent,numasien,linliapu"
    sql = mysql.format(sql, codmacta);
    console.log(sql);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result) {
            cobros = result;
        }
        callback(null, cobros);
        conector.closeConnection(connection);
    });
};


