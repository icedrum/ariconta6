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

//http://localhost:9080/api/cuentas/extrcab?codmacta=572000003

module.exports.getExtractoCabecera = function (codmacta, callback) {
    var datos1 = null;
    var sql = "SELECT cuentas.codmacta,nommacta,sum(coalesce(timported,0)) debe,sum(coalesce(timporteh,0)) haber";
    sql += " FROM cuentas,hlinapu WHERE cuentas.codmacta=hlinapu.codmacta";
    sql += " AND cuentas.codmacta= ? AND fechaent>='2015-01-01'";
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
            datos1 = result;
        }
        callback(null, datos1);
        conector.closeConnection(connection);
    });
};




module.exports.getDetalleCuenta = function (codmacta, callback) {
    var datos1 = null;
    var sql = "SELECT codmacta,nommacta,nifdatos,model347,dirdatos,codposta,"
    sql += "despobla,desprovi,pais,maidatos,"
    sql += "obsdatos,cuentas.iban,entidad,oficina,control,cuentaba"
    sql += ",cuentas.forpa,nomforpa"
    sql += " from cuentas left join formapago on cuentas.forpa=formapago.codforpa"
    sql += " WHERE cuentas.codmacta= ?";
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
            datos1 = result;
        }
        callback(null, datos1);
        conector.closeConnection(connection);
    });
};