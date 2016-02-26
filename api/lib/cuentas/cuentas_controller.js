var express = require('express');
var router = express.Router();
var cobrosMysql = require('./cuentas_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            cobrosMysql.getCuentas( function (err, result) {
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
        cobrosMysql.getCuentas(query.codmacta, function (err, result) {
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
router.get('/extr', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {            
        res.status(400).send('Formato de la petición incorrecto');
    }    
    else
        cobrosMysql.getExtracto(query.codmacta, function (err, result) {
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
