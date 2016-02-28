var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('CuentasCtrl', ['$scope','$http','$state', function($scope,$http,$state) {
   
    $scope.leyendoDatos=true;

    $scope.$on('$viewContentLoaded', function() {
        //call it here
        initForm();
    });



    $scope.ClickConExt= function(codmacta){
       
        //c2='<a  ui-sref="dashboard.ctaExtracto1({codmacta:' + data[j].codmacta + '})" >'
        var cad="()";
          $state.go('dashboard.ctaExtracto',{codmacta: codmacta });
    }


    function initForm() {

        
        var cad;
        cad="cuentas"
        cad=UrlApiFinal(cad);
  

        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
              
              //console.log(data.length);

                var arr = [];
                var p1=[];
                for (var j=0;j<=data.length-1;j++){
                    
                    var c2=""
                    c2=c2 + '<button type="button" class="btn btn-primary btn-circle" ';

                    c2=c2 + "onclick=\"angular.element(this).scope().ClickConExt('"+  data[j].codmacta +"')\">";
                    c2=c2 + '<i class="fa fa-list"></i></button>';
    

                    c2=c2 + '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success btn-circle"><i class="fa fa-link"></i>'
                    //console.log(c2);
                    p1=[];
                    p1.push(data[j].codmacta,data[j].nommacta,c2);
                    arr.push(p1);
                }



                CargaDatos(arr);
    
                $scope.leyendoDatos=false;

            });
   
    }



function CargaDatos(data) {
    var dt = $('#example2').dataTable({
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
        console.log(data);
        dt.fnClearTable();
        dt.fnAddData(data);
        dt.fnDraw();


    }
}


}]);