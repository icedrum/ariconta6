var express = require('express');
var router = express.Router();
var cuentasMysql = require('./cuentas_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            cuentasMysql.getCuentas( 1,function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                res.json(result)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    }
    else
    if (query.codmacta) {
        cuentasMysql.getCuentas(1,query.codmacta, function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                res.json(result)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});


// Consulta extracto   http://localhost:9080/api/cuentas/extr?codmacta=1
//Datos de la cuenta y saldo
router.get('/extrCab', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {            
        res.status(400).send('Formato de la petición incorrecto');
    }    
    else
        cuentasMysql.getExtractoCabecera(1,query.codmacta, function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                res.json(result)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    
});



router.get('/extr', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {            
        res.status(400).send('Formato de la petición incorrecto');
    }    
    else
        cuentasMysql.getExtracto(1,query.codmacta, function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                res.json(result)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    
});



router.get('/ctaDetalle', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {            
        res.status(400).send('Formato de la petición incorrecto');
    }    
    else
        cuentasMysql.getDetalleCuenta(1,query.codmacta, function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                res.json(result)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    
});



// Exports
module.exports = router;
