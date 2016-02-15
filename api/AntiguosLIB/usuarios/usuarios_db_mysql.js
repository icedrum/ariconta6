// administradores_db_mysql
// Manejo de la tabla administradores en la base de datos
var mysql = require("mysql"); // librería para el acceso a bases de datos MySQL
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS

//  leer la configurción de MySQL
var conector = require('../comun/conector_mysql');
var sql = "";



// comprobarUsuario
// comprueba que tiene la estructura de objeto mínima
// necesaria para guardarlo en la base de datos
// Por ejemplo, que es del tipo correcto y tiene los atributos 
// adecuados.
function comprobarUsuario(usuario){
	// debe ser objeto del tipo que toca
	var comprobado = "object" === typeof usuario;
	// en estas propiedades no se admiten valores nulos
	comprobado = (comprobado && usuario.hasOwnProperty("codusu"));
	comprobado = (comprobado && usuario.hasOwnProperty("nombre"));
	comprobado = (comprobado && usuario.hasOwnProperty("login"));
	comprobado = (comprobado && usuario.hasOwnProperty("password"));
	return comprobado;
}


// getUsuarios
// lee todos los registros de la tabla usuarios y
// los devuelve como una lista de objetos
module.exports.getUsuarios = function(callback){
	var usuarios = null;
	sql = "SELECT * FROM usuarios.usuarios where nivelusu>=0";
	var connection = conector.getConnectionConta();
	connection.query(sql, function(err, result){
		if (err){
			callback(err, null);
			conector.closeConnection(connection);
			return;
		}
		usuarios = result;
		callback(null, usuarios);
	});	
	conector.closeConnection(connection);
}

// loginAdministradores
// busca un administrador con el login y contraseña pasados
// si lo encuentra lo devuelve, si no devuelve nulo.
module.exports.loginUsuario = function(usuario, callback){
	
	//if (usuario && usuario.login && usuario.password){
	if (usuario!="")
	{
		var sql = "select codusu,nomusu,login,passwordpropio,md5(passwordpropio)" 
		sql=sql + " FROM usuarios.usuarios WHERE nivelusu>=0 and login = ? ";
		sql = mysql.format(sql, [usuario]);
		var connection = conector.getConnectionConta();
		connection.query(sql, function(err, result){
			if (err){
				callback(err, null);
				conector.closeConnection(connection);
				return;
			}
			if (result.length == 0){
				callback(null, null);
				conector.closeConnection(connection);
				return;
			}
			callback(null, result[0]);
			return;
		});
	}else{
		var err = new Error('API: No se ha proporcionado un usuario con login ');
		callback(err, null);
		return;
	}
	return;
}
