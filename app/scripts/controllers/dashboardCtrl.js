'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('dashboardCtrl', ['$scope', '$timeout','$http', function ($scope, $timeout,$http) {
    	
    	$scope.prueba="Conta3";

    var etiquetasMes=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];	

    $scope.dataGrafico1=[];
    ObtenerDatosGraficos();

    $scope.line = {
	    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    labels: etiquetasMes,
	    series: ['Ventas', 'Compras'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };


    $scope.line2 = {
	    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    series: ['Series A', 'Series B'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    }; 


   $scope.bar = {
	    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
		series: ['Series A', 'Series B'],

		data: [
		   [65, 59, 80, 81, 56, 55, 10],
		   [28, 48, 40, 19, 86, 180, 190]
		]
    	
    };




    function ObtenerDatosGraficos() {
        console.log("ObtenerDatosGraficos");
        var cad;
        
        UrlApiFinal(cad);
        console.log(cad);
        $http.get('http://localhost:9080/api/graficos').
        success(function(data) {
            $scope.dataGrafico1 = data;
        });
    };


}]);