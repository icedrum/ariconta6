var myApp2 = angular.module('sbAdminApp2',['ngCookies']); 


myApp2.controller('ClientesDatosCtrl', ['$scope','$http', '$cookieStore', function($scope,$http,$cookieStore) {
    comprobarLogin($cookieStore);
    
    $scope.greeting = 'Hola!';
    $scope.greeting2 = {
          id:0,
          content:"Arconada de portero"   
        };

    Paises();

    $scope.sayHello = function() {
        $scope.greeting = 'Hello  Pepe!we';
        $scope.greeting2.id=1;
        $scope.greeting2.content="Atila"
        console.log("asda");
    };

    $scope.Hello=function() {
        console.log("asdasdasdadad");
        $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting2 = data;
            console.log(data);
        });
    };

    function Paises() {
        console.log("De cobros");
        var cad;
        cad="cobros"
        UrlApiFinal(cad);
        console.log(cad);
        $http.get('http://localhost:9080/api/cobros').
        success(function(data) {
            $scope.ColPaises = data;
        });
    };



}]);