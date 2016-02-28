// AriGesMovApi
console.log("AriGesMovApi --------");
// Cargar los módulos básicos
var express = require('express');
var bodyParser = require("body-parser"); // proceso de los cuerpos de mensaje
var pjson = require('./package.json'); // read vrs and more information
var cors = require('cors'); // cross origin resopurce sharing management

// modulos encargados de las rutas
var usuario_router = require('./lib/usuarios/usuarios_controller');
var cobros_router = require('./lib/cobros/cobros_controller');
var graficos_router = require('./lib/graficos/graficos_controller');
var cuentas_router = require('./lib/cuentas/cuentas_controller');
var apuntes_router = require('./lib/apuntes/apuntes_controller');

// express
var app = express();

// CORS management
app.options('*', cors()); // include before other routes
app.use(cors());


// leyendo la configuracion 
var config = require('./config/config.json');

// activar el procesador de los cuerpos de mensajes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



//-------------------------------------------------------------
// RUTAS
//-------------------------------------------------------------

var router = express.Router();

// paso común de cualquier ruta
router.use(function(req, res, next){
	// aquí va el código común
	// ----------------------------
	// continúa la ejecución
	next();
});

// ruta raiz
router.get('/', function (req, res){
    var str = JSON.stringify(pjson, null, 2); //
    res.end(str);
});

//---------- Rutas relacionadas con los usuarios
app.use('/api/usuarios', usuario_router);

//---------- Rutas relacionadas con la gestión de cobros
app.use('/api/cobros', cobros_router);

//Graficos
app.use('/api/graficos', graficos_router);

//Cuentas contables
app.use('/api/cuentas', cuentas_router);


//Historico de apuntes
app.use('/api/apuntes', apuntes_router);



// Registrar rutas base
app.use('/api', router);

// START SERVER
//==========================
app.listen(config.apiPort);
console.log("AtriGesMovApiNode en puerto: " + config.apiHost + ":" + config.apiPort);
