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
    	
    

    var etiquetasMes=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];	

	$scope.dataGraficoVentas=[];     //Ventas
    $scope.dataGraficoCompras=[];
    $scope.dataGraficoDebe=[];     
    $scope.dataGraficoHaber=[];


    ObtenerDatosGraficos();
    CuentasBancarias();

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



   
   $scope.bar = {
	    labels: etiquetasMes,
		series: ['Gastos', 'Ingresos'],

		data: [$scope.dataGraficoDebe,$scope.dataGraficoHaber]
    	
    };


    function ObtenerDatosGraficos() {
        var i;
    	console.log('*******Preparamos multiarrya');

    	
   		for (var j=0;j<12;j++)
        {
            $scope.dataGraficoVentas[j]=0.00;
            $scope.dataGraficoCompras[j]=0.00;
            $scope.dataGraficoVentas[j]=0.00;
            $scope.dataGraficoHaber[j]=0.00;
        }


        for (var j=0;j<4;j++)
        {
             LlamadaURL(j);
        }
       



    };



    function LlamadaURL(Opcion) {
        
        var cad="";
        var cad2="";
        
        cad= "graficos/"; 


        switch(Opcion) {
        case 0:
            cad2= "compras";
            break;
        case 1:
            cad2= "ventas";
            break;
        case 2:
            cad2= "BalSituacionDebe";
            break;
        case 3:
            cad2= "BalSituacionHaber";
            break;
        default:
            
        }
        cad2=cad + cad2;
        cad=UrlApiFinal(cad2); 	
        console.log("ObtenerDatosGraficos: " + cad);

        $http.get(cad).
        success(function(data) {
            $scope.dataGraficoAux = data;
            angular.forEach(data, function(val) {
                //console.log(val.mes + ' ' + val.importe);
                if (Opcion==0)
                    $scope.dataGraficoCompras[val.mes-1]=val.importe;
                else
                if (Opcion==1)
                    $scope.dataGraficoVentas[val.mes-1]=val.importe;
                else
                if (Opcion==2)
                    $scope.dataGraficoDebe[val.mes-1]=val.importe;
                else
                    $scope.dataGraficoHaber[val.mes-1]=val.importe;
            });



        });

    };


    function CuentasBancarias(){

        var cad;
        cad="graficos/ResumenBanco"
        cad=UrlApiFinal(cad);
  
        $http.get(cad).
        success(function(data) {
            $scope.CtaBancos = data;
        });
    };



    function HacerElLogOFF(){
        console.log ('Haciendo log off');
    } 


}]);