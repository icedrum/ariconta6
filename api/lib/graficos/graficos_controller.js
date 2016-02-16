var express = require('express');
var router = express.Router();
var graficosMySql = require('./graficos_mysql');

router.get('/ventas', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.FacturasMesCli( function (err, cobros) {
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

});


router.get('/compras', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.FacturasMesPro( function (err, cobros) {
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

});






// Exports
module.exports = router;
