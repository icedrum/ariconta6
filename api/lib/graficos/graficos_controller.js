var express = require('express');
var router = express.Router();
var graficosMySql = require('./graficos_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.FacturasMes( function (err, cobros) {
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

/*


select month(fecfactu),sum(totbases) from 
factpro where fecfactu>='2015-01-01' and fecfactu<='2015-12-31'
group by 1

*/




// Exports
module.exports = router;
