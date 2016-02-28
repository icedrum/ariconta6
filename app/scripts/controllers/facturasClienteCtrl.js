var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('facturasClienteCtrl', ['$scope','$http', function($scope,$http) {
   
    $scope.leyendoDatos=false;
  
    $scope.FechaDesde = {
        value: new Date(2015,1,1,00,0,0)
    };
    $scope.FechaHasta = {
        value: new Date(2016,12,31,23,59,59)
    };


    $scope.AsientoDesde;
    $scope.AsientoHasta;
    $scope.ConceptoDesde;
    $scope.ConceptoHasta;
    $scope.CuentaDesde;
    $scope.CuentaHasta;
    $scope.DebeDesde;
    $scope.DebeHasta;
    $scope.documen;
    $scope.ampliacion;

    $scope.$on('$viewContentLoaded', function() {
        //console.log($stateParams.codmacta);

        //Los extractos
        CargaSQL(-1);
    });



    $scope.HacerBusqueda=function() {
        var cad="";


        //ASIENTO
        if (!(angular.isUndefined($scope.AsientoDesde) || $scope.AsientoDesde === null ))
            cad += " AND numasien>= " + $scope.AsientoDesde;
        if (!(angular.isUndefined($scope.AsientoHasta) || $scope.AsientoHasta === null ))
            cad += " AND numasien<= " + $scope.AsientoHasta;

        //Cuenta 
        if (!(angular.isUndefined($scope.CuentaDesde) || $scope.CuentaDesde === null ))
            cad += " AND codmacta >=" + $scope.CuentaDesde ;
        if (!(angular.isUndefined($scope.CuentaHasta) || $scope.CuentaHasta === null ))
            cad += " AND codmacta <=" + $scope.CuentaHasta ;
           
        //Numdocum
        if (!(angular.isUndefined($scope.documen) || $scope.documen === null ))
           { if ($scope.documen!='')
            cad += " AND Numdocum like '%" + $scope.documen + "%'" ;
            }
        //ampliaci
        if (!(angular.isUndefined($scope.ampliacion) || $scope.ampliacion === null ))
           { if ($scope.ampliacion!='')
            cad += " AND ampliaci like '%" + $scope.ampliacion + "%'" ;
            }
       


         
        if (cad!=''){
            cad="1 " + cad;

            CargaSQL(cad);


        }







    } //Fin funcion hacerbusqueda
   //   %20AND%20


    function CargaSQL(misql) {

        
        var cad;
        if (misql=="") misql="-1"
        cad="apuntes?misql=" + misql;
        cad=UrlApiFinal(cad);
        $scope.ExistenDatos=false;

        console.log(cad);
        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
              
                 console.log(c2);

                //console.log(data);

                var arr = [];
                var p1=[];
                var c2=""
                for (var j=0;j<=data.length-1;j++){
                    
                    //Boton ver apunte
                    
                    p1=[];
                    //c2=moment(data[j].fechaent).format('DD/MM/YYYY');
                    c2=moment(data[j].fechaent).format('YYYY/MM/DD');
                    p1.push(c2,data[j].numasien,data[j].numdocum,data[j].codconce);
                    p1.push(data[j].ampconce,data[j].nommacta,data[j].timported,data[j].timporteh);

                    c2= '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success btn-circle"><i class="fa fa-link"></i>'
                    p1.push(c2); //El boton'
                    arr.push(p1);
                }

                 if (j>0) $scope.ExistenDatos=true;


                CargaDatos(arr);
                
                $scope.leyendoDatos=false;    


            });
   
    }



function CargaDatos(data) {
    var dt = $('#tablaAsiento').dataTable({
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