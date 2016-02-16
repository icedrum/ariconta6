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
    	
    	$scope.prueba="Conta32";

    var etiquetasMes=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];	

	$scope.dataGraficoAux=[];     //Temporal
	$scope.dataGraficoVentas=[];     //Ventas

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

    	console.log('********');
    	$scope.dataGrafico1=[];		
    	LlamadaURL(true);
    	
   		if ($scope.dataGrafico1.length =0) LlamadaURL(true);






    };



    function LlamadaURL(A_Compras) {
        console.log("ObtenerDatosGraficos");
        var cad;
        
        cad="compras";
        if (!A_Compras) cad="ventas";
        cad="graficos" + cad; 	

        UrlApiFinal(cad);
        
        $http.get(cad).
        success(function(data) {
            $scope.dataGrafico1 = data;
            console.log(data);
        });
        console.log("De vuelta");
    };



    


}]);