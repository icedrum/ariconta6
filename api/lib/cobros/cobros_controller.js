var express = require('express');
var router = express.Router();
var cobrosMysql = require('./cobros_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            cobrosMysql.getCobrosSin( 1,function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros');
            }
        });
    }
    else
    if (query.codmacta) {
        cobrosMysql.getCobros(1,query.codmacta, function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros para la cuenta');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});


// Total pendiente de cobrar
router.get('/pendiente', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            cobrosMysql.getImportePdteTotal(1, function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado datos');
            }
        });
    }
    else
    if (query.codmacta) {
        cobrosMysql.getImportePdteCta(1,query.codmacta, function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros para la cuenta');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});





// Exports
module.exports = router;
