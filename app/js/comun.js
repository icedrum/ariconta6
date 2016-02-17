// leyendo la configuracion 
//var config = require('config.json');   //NO ME FUNCIONA


function comprobarLogin($cookieStore) {
    console.log("Aqui con $cookieStore");

    // buscar el cookie
    try {
        //var user = JSON.parse(getCookie("admin"));
        
        var user=$cookieStore.get('Usuario')
        console.log(user);

        //var user="David";
    } catch (e) {
        // volver al login
        console.log("Error login");
        window.open('index.html#/login', '_self');
    }
    if (!user) {
        console.log("not user");
        window.open('index.html#/login', '_self');
    } else {
        //nivelesUsuario(user.nivel);
        // cargar el nombre en la zona correspondiente
        //$('#userName').text(user.nombre);
        console.log("OK");
    }
}


function HacerLogOut(){
     $cookieStore.remove('Usuario');
     $cookieStore.remove('UsuarioObj');
}

function UrlApiFinal(UrlFinal){


    //eJEMPLO http://ocalhost:9080/api/cobros
    // LLEGARA DESDE DESPUES DE aPI/
    //UrlFinal='http://' + config.apiHost + ":" + config.apiPort + "/api/" + UrlFinal;
    UrlFinal='http://localhost:9080/api/' + UrlFinal;
    return UrlFinal;
} 