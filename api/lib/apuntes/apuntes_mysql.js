var mysql = require('mysql');
var conector = require('../comun/conector_mysql');


// El query iran losq sqls que necesites encabzados por un 1
// ejemplo
//      1 AND nommacta like '%asasd%' .....
module.exports.getApuntes = function (numeroconta,misql, callback) {
    var apuntes = null;
    var sql = "SELECT";
    sql += " numasien ,fechaent , numdiari , linliapu,";
    sql += " numdocum,hlinapu.codmacta AS codmacta,";
    sql += " nommacta ,codconce,ampconce,timported,timporteh";
    sql += "  FROM  ariconta" + numeroconta + ".hlinapu,cuentas ";
    sql += " WHERE hlinapu.codmacta = cuentas.codmacta AND ";
    sql += " 1 =  " + misql; 
    sql += " ORDER BY fechaent,numasien,linliapu";
    
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result) {
            apuntes = result;
        }
        callback(null, apuntes);
        conector.closeConnection(connection);
    });
};


