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

	$scope.dataGraficoVentas=[];     //Ventas
    $scope.dataGraficoCompras=[];

    ObtenerDatosGraficos();

    $scope.line = {
	    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    labels: etiquetasMes,
	    series: ['Ventas', 'Compras'],
	    data: [
	      $scope.dataGraficoVentas,
	      $scope.dataGraficoCompras
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
        var i;
    	console.log('*******Preparamos multiarrya');

    	
   		for (var j=0;j<12;j++)
        {
            $scope.dataGraficoVentas[j]=0.00;
            $scope.dataGraficoCompras[j]=0.00;
        }

        LlamadaURL(false);
    
        LlamadaURL(true);

        


        
        
        //Las compras





    };



    function LlamadaURL(A_Compras) {
        
        var cad="";
        
        UrlApiFinal(cad);
        cad=cad + "graficos/"; 
        if (A_Compras)
            cad=cad + "compras";
        else
            cad=cad + "ventas";
        cad=UrlApiFinal(cad);
         	
        console.log("ObtenerDatosGraficos: " + cad);

        $http.get(cad).
        success(function(data) {
            $scope.dataGraficoAux = data;
            angular.forEach(data, function(val) {
                console.log(val.mes + ' ' + val.importe);
                if (A_Compras)
                    $scope.dataGraficoCompras[val.mes-1]=val.importe;
                else
                    $scope.dataGraficoVentas[val.mes-1]=val.importe;
            });



        });

    };



    


}]);