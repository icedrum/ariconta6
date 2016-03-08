var mysql = require('mysql');
var conector = require('../comun/conector_mysql');



module.exports.Listado = function (codmacta, callback) {
    var vDatos = null;
    var sql = "";

    sql += "select numserie,numfactu,fecfactu,codmacta,nommacta,totfaccl";
    sql += " from factcli where fecfactu>='2015-01-01'";
    if (codmacta!=''){
        sql += " AND codmacta = ?"
        sql = mysql.format(sql, codmacta);
    }
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

