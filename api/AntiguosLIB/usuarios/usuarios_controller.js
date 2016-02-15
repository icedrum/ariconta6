var express = require('express');
var router = express.Router();
var usuariosDb = require("./usuarios_db_mysql");


//Este lo quitaremos. Ahor lo dejo para el comprobar funcionamiento
router.get('/', function (req, res) {
    
    if (req !=null)
    {

        console.log(req.params);

    }
  
        usuariosDb.getUsuarios( function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros');
            }
        });
  

});


router.get('/:login', function (req, res) {
     console.log(req.params);
    if (!req.params.login) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    var login = req.params.login;
    if (login) {
        usuariosDb.loginUsuario(login, function (err, clipot) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(clipot)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});



// Exports
module.exports = router;