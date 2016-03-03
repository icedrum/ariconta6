var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('cuentaDetalleCtrl', ['$scope','$http','$stateParams', function($scope,$http,$stateParams) {
   
    $scope.leyendoDatos=true;
    $scope.CampoCta=".."
    $scope.DatosCta;
    $scope.MostrarDatos = {
       fiscales : false,
       tesoreria : false
     };
    $scope.$on('$viewContentLoaded', function() {
        //console.log($stateParams.codmacta);

        //Los datos de la cabecera
        DatosCabecera();
        TraeCobros();
        $scope.leyendoDatos=false;
    });


    function DatosCabecera(){

        var cad;
        cad=$stateParams.codmacta;
        cad="cuentas/ctaDetalle?codmacta=" + cad;
        cad=UrlApiFinal(cad);
  
        $http.get(cad).
        success(function(data) {
            
            $scope.CampoCta=data[0].codmacta +  "   "  + data[0].nommacta;
            $scope.DatosCta=data[0];
             
            cad="";
            if(!!data[0].iban) cad =  data[0].iban ;

            $scope.DatosCCC=cad;
            if (cad.length==24)    
            {
                $scope.DatosCCC=cad.substring(0,4) + " " + cad.substring(4,8) + " " + cad.substring(8,12);
                $scope.DatosCCC=$scope.DatosCCC + " " + cad.substring(12,16) + " " + cad.substring(16,20);
                $scope.DatosCCC=$scope.DatosCCC + " " + cad.substring(20,24) ;
            }
            console.log(cad + " s--> " + cad.substring(4,16));
          

        });
    };


   


    function TraeCobros() {

        
        var cad;
        cad=$stateParams.codmacta;
        cad="cobros/?codmacta=" + cad;
        cad=UrlApiFinal(cad);
  

        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
              
                var arr = [];
                var p1=[];
                var c2=""
                for (var j=0;j<=data.length-1;j++){
                    
                    //Boton ver apunte
                    
                    p1=[];
                    //c2=moment(data[j].fechaent).format('DD/MM/YYYY');
                    c2=moment(data[j].fechafact).format('YYYY/MM/DD');
                    p1.push(c2,data[j].numserie,data[j].numfactu,data[j].numorden);
                    p1.push(data[j].codforpa,data[j].nomforpa)
                    c2=moment(data[j].fechavenci).format('YYYY/MM/DD');
                    p1.push(c2,data[j].total);
                    c2= '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success btn-circle"><i class="fa fa-link"></i>'
                    p1.push(c2); //El boton'
                    arr.push(p1);
                }

         


                CargaDatos(arr);
                
                $scope.leyendoDatos=false;    


            });
   
    }



function CargaDatos(data) {
    var dt = $('#extracto').dataTable({
        language: {
            processing: "Procesando...",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            loadingRecords: "Cargando...",
            "search": "Buscar :",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });


    if (data !== null && data.length === 0) {
        console.log('No se han encontrado registros');
    } else {
        //console.log(data);
        dt.fnClearTable();
        dt.fnAddData(data);
        dt.fnDraw();


    }
}




















}]);