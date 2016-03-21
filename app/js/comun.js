// leyendo la configuracion 
//var config = require('config.json');   //NO ME FUNCIONA


function comprobarLogin() {
    console.log("Aqui con $cookieStore");

    // buscar el cookie
    try {
        //var user = JSON.parse(getCookie("admin"));
        
        //var user=$cookieStore.get('Usuario')
        var user=getCookie('Usuario');
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
    console.log("Borra cock1 ");
     eliminarCookie('Usuario');
    console.log("Borra cock2 ");
 
     eliminarCookie('UsuarioObj');
}






function UrlApiFinal(UrlFinal){


    //eJEMPLO http://ocalhost:9080/api/cobros
    // LLEGARA DESDE DESPUES DE aPI/
    //UrlFinal='http://' + config.apiHost + ":" + config.apiPort + "/api/" + UrlFinal;
    UrlFinal='http://localhost:9080/api/' + UrlFinal;
    return UrlFinal;
} 


















//Funciones privadas
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function eraseCookie(name) {
    createCookie(name,"",-1);
}


var eliminarCookie = function (key) {
    console.log("eliminarCookie: " + key);
    return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function currencyFormatDE (num) {
    return num
       .toFixed(2) // always two decimal digits
       .replace(".", ",") // replace decimal point character with ,
       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " €" // use . as a separator
}


function EtiquetasMeses(){
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
}