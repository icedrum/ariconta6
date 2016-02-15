var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getCobros = function (codmacta, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " numserie as numserie,";
    sql += " numfactu as numfactu,";
    sql += " numorden as numorden,";
    sql += " CONCAT(numserie,RIGHT(CONCAT('00000000',CAST(numfactu AS CHAR)),7)) AS numfact,";
    sql += " fecfactu AS fechafact,";
    sql += " cobros.codforpa AS codforpa,";
    sql += " nomforpa AS nomforpa,";
    sql += " impcobro AS impcobro,";
    sql += " impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) AS total";
    sql += " FROM  cobros";
    sql += " INNER JOIN formapago ON cobros.codforpa=formapago.codforpa";
    sql += " WHERE cobros.codmacta = ?";
    sql += " AND impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) <> 0";
    sql += " ORDER BY fecvenci";
    sql = mysql.format(sql, codmacta);
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





module.exports.getCobrosSin = function ( callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " numserie as numserie,";
    sql += " numfactu as numfactu,";
    sql += " numorden as numorden,";
    sql += " CONCAT(numserie,RIGHT(CONCAT('00000000',CAST(numfactu AS CHAR)),7)) AS numfact,";
    sql += " fecfactu AS fechafact,";
    sql += " cobros.codforpa AS codforpa,";
    sql += " nomforpa AS nomforpa,";
    sql += " impcobro AS impcobro,";
    sql += " impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) AS total";
    sql += " FROM  cobros";
    sql += " INNER JOIN formapago ON cobros.codforpa=formapago.codforpa";
    sql += " WHERE ";
    sql += "  impvenci+IF(gastos IS NULL,0,gastos)-IF(impcobro IS NULL,0,impcobro) <> 0";
    sql += " ORDER BY fecvenci";
    
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


// getCobro
// Devuelve las lineas de cobro asociada con la clave primaria compuesta 
module.exports.getCobro = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT * FROM cobros WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, res);
    });
};

// getNextId
// obtiene el siguiente id de la tabla cobroslin
var getNextId = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT MAX(id) + 1 AS nxt FROM cobroslin WHERE numserie = ?";
    sql += " AND codfaccl = ?";
    sql += " AND fecfaccl = ?";
    sql += " AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) nxt = 1;
        callback(null, nxt);
    });
};




module.exports.getImportePdteTotal = function ( callback) {
    var cobros = null;
    var sql = "SELECT sum(impvenci + coalesce(gastos,0) -coalesce(impcobro,0))  ";
    sql += " FROM cobros";
    
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


module.exports.getImportePdteCta = function (codmacta, callback) {
    var cobros = null;
    var sql = "SELECT sum(impvenci + coalesce(gastos,0) -coalesce(impcobro,0))  ";
    sql += " FROM cobros WHERE codmacta =  ? ";
        sql = mysql.format(sql, [codmacta]);

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