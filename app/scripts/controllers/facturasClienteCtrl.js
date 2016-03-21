var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('facturasClienteCtrl', ['$scope','$http','$state', function($scope,$http,$state) {
   
    $scope.leyendoDatos=false;
    $scope.ExistenDatos=false;
    $scope.FechaDesde = {   
        value: new Date(2015,0,1)
    };
    $scope.FechaHasta = {
        value: new Date(2016,11,31)
    };
            

    $scope.facturaDesde;
    $scope.facturaHasta;
    $scope.SerieDesde;
    $scope.SerieHasta;
    $scope.CuentaDesde;
    $scope.CuentaHasta;
    $scope.TotalDesde;
    $scope.TotalHasta;
    $scope.ampliacion;

    $scope.$on('$viewContentLoaded', function() {
        //console.log($stateParams.codmacta);
        console.log("On:" + $scope.ExistenDatos);  
        //Los extractos
        if (!$scope.ExistenDatos) CargaSQL(-1);

    });



    $scope.HacerBusqueda=function() {
        var cad="";

        //fECHA
        if (!(angular.isUndefined($scope.FechaDesde) || $scope.FechaDesde === null ))
            cad += " AND fecfactu>='" + moment($scope.FechaDesde.value).format('YYYY-MM-DD') + "'";
        if (!(angular.isUndefined($scope.FechaHasta) || $scope.FechaHasta === null ))
            cad += " AND fecfactu<='" + moment($scope.FechaHasta.value).format('YYYY-MM-DD') + "'";


        //Serie 
        if (!(angular.isUndefined($scope.SerieDesde) || $scope.SerieDesde === null ))
            if ($scope.SerieDesde!="") cad += ' AND numserie>="' + $scope.SerieDesde + '"';
        if (!(angular.isUndefined($scope.SerieHasta) || $scope.SerieHasta === null ))
            if ($scope.SerieDesde!="") cad += ' AND numserie<="' + $scope.SerieHasta + '"';
           

        //num fac
        if (!(angular.isUndefined($scope.facturaDesde) || $scope.facturaDesde === null ))
            cad += " AND numfactu>=" + $scope.facturaDesde;
        if (!(angular.isUndefined($scope.facturaHasta) || $scope.facturaHasta === null ))
            cad += " AND numfactu<=" + $scope.facturaHasta;

        //Cuenta 
        if (!(angular.isUndefined($scope.CuentaDesde) || $scope.CuentaDesde === null ))
            if ($scope.CuentaDesde!="") cad += " AND codmacta>='" + $scope.CuentaDesde + "'";
        if (!(angular.isUndefined($scope.CuentaHasta) || $scope.CuentaHasta === null ))
            if ($scope.CuentaHasta!="") cad += " AND codmacta<='" + $scope.CuentaHasta + "'";
           
        //Total 
        if (!(angular.isUndefined($scope.TotalDesde) || $scope.TotalDesde === null ))
            cad += " AND totfaccl>=" + $scope.TotalDesde ;
        if (!(angular.isUndefined($scope.TotalHasta) || $scope.TotalHasta === null ))
            cad += " AND totfaccl<=" + $scope.TotalHasta ;
             

        //ampliaci
        if (!(angular.isUndefined($scope.ampliacion) || $scope.ampliacion === null ))
           { if ($scope.ampliacion!='')
            cad += " AND observa like '%" + $scope.ampliacion + "%'" ;
            }
       

            
         
        if (cad!=''){
            cad="1 " + cad;

            CargaSQL(cad);


        }







    } //Fin funcion hacerbusqueda
   //   %20AND%20


    function CargaSQL(misql) {

        $scope.leyendoDatos=true;
        var cad;
        if (misql=="") misql="-1"
        cad="fracli?misql=" + misql;
        cad=UrlApiFinal(cad);
        $scope.ExistenDatos=true;

        console.log(cad);
        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
                
                 //console.log(c2);

                //console.log(data);

                var arr = [];
                var p1=[];
                var c2=""
                for (var j=0;j<=data.length-1;j++){
                    
                    //Boton ver apunte

                    p1=[];

                    //select numserie,numfactu,fecfactu,codmacta,nommacta,totfaccl,anofactu,escorrecta"
                    //c2=moment(data[j].fechaent).format('DD/MM/YYYY');
                    c2=moment(data[j].fecfactu).format('YYYY/MM/DD');
                    p1.push(c2,data[j].numserie,data[j].numfactu);
                    p1.push(data[j].codmacta,data[j].nommacta,currencyFormatDE(data[j].totfaccl));



                    c2='&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success btn-circle" '
                    c2=c2 + "onclick=\"angular.element(this).scope().ClickFactura('"
                    c2=c2 +  data[j].numserie + "'," +  data[j].numfactu + "," +  data[j].anofactu;
                    c2=c2 + ")\">";
                    c2=c2 + '<i class="fa fa-link"></i>'




                    p1.push(c2); //El boton'
                    arr.push(p1);
                    console.log(p1);
                }

                 if (j>0) $scope.ExistenDatos=true;


                CargaDatos(arr);
                

        });

        $scope.leyendoDatos=false;    
   
    }



function CargaDatos(data) {
    var dt = $('#tablaFraCli').dataTable({
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
        dt.fnClearTable();
        console.log('No se han encontrado registros');
    } else {
        //console.log(data);
        dt.fnClearTable();
        dt.fnAddData(data);
        dt.fnDraw();


    }
}




 $scope.ClickFactura= function(numserie,numfactu,anofactu){
       
        //c2='<a  ui-sref="dashboard.ctaExtracto1({codmacta:' + data[j].codmacta + '})" >'
       // var cad="()";.
       console.log("Serie" + numserie);
       var fra= numserie + "   ";
       console.log(fra);
       fra=fra.substring(0,3);
       console.log(fra);
       fra=fra + anofactu.toString() + numfactu.toString();
       console.log(fra);
       $state.go('dashboard.fracli',{factura1: fra });
      
    }















}]);