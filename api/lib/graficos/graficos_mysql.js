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

//Compras- Hber
module.exports.BalSituacionDebe = function ( callback) {
    var vDatos = null;
    var sql = "";
    sql += " select month(fechaent) mes,abs(sum(coalesce(timporteh,0)-coalesce(timported,0))) importe"
    sql += " from hlinapu where fechaent>='2015-01-01' and fechaent<='2015-12-31'"
    sql += " and substring(codmacta,1,1) ='6' group by 1 order by 1"
    
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result) {
            vDatos = result;
        }
        callback(null, vDatos);
        conector.closeConnection(connection);
    });
};


//Ventas-- Haber
module.exports.BalSituacionHaber = function ( callback) {
    var vDatos = null;
    var sql = "";
    sql += " select month(fechaent) mes,abs(sum(coalesce(timporteh,0)-coalesce(timported,0))) importe"
    sql += " from hlinapu where fechaent>='2015-01-01' and fechaent<='2015-12-31'"
    sql += " and substring(codmacta,1,1) ='7' group by 1 order by 1"

    
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result) {
            vDatos = result;
        }
        callback(null, vDatos);
        conector.closeConnection(connection);
    });
};


//Aunque no es de un grafico,
module.exports.ResumenBanco = function ( callback) {
    var vDatos = null;
    var sql = "";
    sql += " select hlinapu.codmacta codmacta,nommacta,count(*) numero,"
    sql += " sum(coalesce(timported,0)-coalesce(timporteh,0)) saldo"
    sql += " from hlinapu,cuentas where hlinapu.codmacta=cuentas.codmacta and "
    sql += " fechaent>='2015-01-01' and hlinapu.codmacta in (select codmacta from bancos)"
    sql += " group by 1 having count(*)>0"

    
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result) {
            vDatos = result;
        }
        callback(null, vDatos);
        conector.closeConnection(connection);
    });
};




//  Datos de una codmacta solo
//Compras- Hber
module.exports.UnaCtaHaber = function (codmacta, callback) {
    var vDatos = null;
    var sql = "";
    sql += " select month(fechaent) mes,sum(coalesce(timporteh,0)) importe"
    sql += " from hlinapu where fechaent>='2015-01-01' and fechaent<='2015-12-31'"
    sql += "  AND hlinapu.codmacta = ?  GROUP BY 1 ORDER BY 1"
    sql = mysql.format(sql, codmacta);

    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result) {
            vDatos = result;
        }
        callback(null, vDatos);
        conector.closeConnection(connection);
    });
};

module.exports.UnaCtaDebe = function (codmacta, callback) {
    console.log("Aqui");
    var vDatos = null;
    var sql = "";
    sql += " select month(fechaent) mes,sum(coalesce(timported,0)) importe"
    sql += " from hlinapu where fechaent>='2015-01-01' and fechaent<='2015-12-31'"
    sql += "  AND hlinapu.codmacta = ? GROUP BY 1 ORDER BY 1"
    console.log(sql);
    sql = mysql.format(sql, codmacta);
    

    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result) {
            vDatos = result;
        }
        callback(null, vDatos);
        conector.closeConnection(connection);
    });
};