var express = require('express');
var router = express.Router();
var apuntesMysql = require('./apuntes_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.misql==null) { query.misql="-1"}
    console.log (query.misql);
    apuntesMysql.getApuntes(1,query.misql, function (err, apuntes) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (apuntes) {
            res.json(apuntes)
        } else {
            res.status(404).send('No se han encontrado apuntes con esos valores');
        }
    });


});






// Exports
module.exports = router;
