var express = require('express');
var router = express.Router();
var fracliMySql = require('./fracli_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.misql==null) { query.misql="-1"} 
    fracliMySql.Listado(1,query.misql, function (err, fras) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (fras) {
                res.json(fras)
            } else {
                res.status(404).send('No se han encontrado cobros');
            }
    });

});

router.get('/factura', function (req, res) {
    var query = req.query;
    if (query.misql==null) { query.misql="-1"} 
    fracliMySql.DatosFactura(1,query.misql, function (err, fras) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (fras) {
                res.json(fras)
            } else {
                res.status(404).send('No se han encontrado cobros');
            }
    });

});

// Exports
module.exports = router;
