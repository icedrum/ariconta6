var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('CtaExtractoCtrl', ['$scope','$http', function($scope,$http,$routeParams) {
   


    $scope.$on('$viewContentLoaded', function() {
        
        //call it here
        initForm();
    });

    function initForm() {

        
        var cad;
        cad="572000003"
        cad="cuentas/extr?codmacta=" + cad;
        cad=UrlApiFinal(cad);
  

        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
              
                 //console.log(c2);

                console.log(data);

                var arr = [];
                var p1=[];
                for (var j=0;j<=data.length-1;j++){
                    
                    //Boton ver apunte
                    var c2=""
                    c2= '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success btn-circle"><i class="fa fa-link"></i>'
                    p1=[];

                    
                    p1.push(data[j].fechaent,data[j].numasien,data[j].numdocum,data[j].codconce);
                    p1.push(data[j].ampconce,data[j].nommacta,data[j].timported,data[j].timporteh);

                    p1.push(c2); //El boton'
                    arr.push(p1);
                }

                console.log(arr.length);
//                for(var x in c2){
//                  arr.push(c2[x]);
  //              }





                CargaDatos(arr);
                
                console.log("iu");
    


            });
   
    }



function CargaDatos(data) {
    var dt = $('#extracto').dataTable();
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