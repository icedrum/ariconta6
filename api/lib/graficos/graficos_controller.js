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


router.get('/BalSituacionDebe', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.BalSituacionDebe( function (err, debe) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (debe) {
                res.json(debe)
            } else {
                res.status(404).send('No se han encontrado valores');
            }
        });
    }

});


router.get('/BalSituacionHaber', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.BalSituacionHaber( function (err, haber) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (haber) {
                res.json(haber)
            } else {
                res.status(404).send('No se han encontrado valores');
            }
        });
    }

});


router.get('/UnaCtaHaber', function (req, res) {
    var query = req.query;
    if (query.codmacta!=null) {
            graficosMySql.UnaCtaHaber(query.codmacta, function (err, Haber)  {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (Haber) {
                res.json(Haber)
            } else {
                res.status(404).send('No se han encontrado valores');
            }
        });
    }

});

router.get('/UnaCtaDebe', function (req, res) {
    var query = req.query;
    console.log(query + "Va¿");
    if (query.codmacta!=null) {
            graficosMySql.UnaCtaDebe(query.codmacta, function (err, Debe)      {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (Debe) {
                res.json(Debe)
            } else {
                res.status(404).send('No se han encontrado valores');
            }
        });
    }

});

router.get('/ResumenBanco', function (req, res) {
    var query = req.query;
    if (query.codmacta==null) {
            graficosMySql.ResumenBanco( function (err, bancos) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (bancos) {
                res.json(bancos)
            } else {
                res.status(404).send('No se han encontrado valores');
            }
        });
    }

});


// Exports
module.exports = router;
