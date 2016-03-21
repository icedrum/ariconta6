var mysql = require('mysql');
var conector = require('../comun/conector_mysql');


// El query iran losq sqls que necesites encabzados por un 1
// ejemplo
//      1 AND nommacta like '%asasd%' .....
module.exports.Listado = function (numeroconta,misql, callback) {
    var vDatos = null;
    var sql = "";

    sql += "select numserie,numfactu,fecfactu,codmacta,nommacta,totfaccl,anofactu,escorrecta";
    sql += " from ariconta" + numeroconta + ".factcli where fecfactu>='2015-01-01'";
    sql += " AND 1 = " + misql;
     //   sql = mysql.format(sql, misql);
    
    console.log(sql);
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



module.exports.DatosFactura = function (numeroconta,misql, callback) {
    var vDatos = null;
    var sql = "";

    sql += "select concat(numserie,'-',right(concat('00000000',numfactu),8)),fecfactu,fecliqcl,"
    sql += " factcli.codmacta,cuentas.nommacta,totbases,totbasesret,totivas,totrecargo"
    sql += " escorrecta,factcli.observa,nomforpa"
    sql += " from ariconta" + numeroconta + ".factcli" 
    sql += " left join ariconta" + numeroconta + ".cuentas on factcli.codmacta=cuentas.codmacta"
    sql += " left join ariconta" + numeroconta + ".formapago on factcli.codforpa=formapago.codforpa"
    sql += " WHERE 1 = " + misql;
     //   sql = mysql.format(sql, misql);
    
    console.log(sql);
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

