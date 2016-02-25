var myApp2 = angular.module('sbAdminApp',[]); 


myApp2.controller('CuentasCtrl', ['$scope','$http', function($scope,$http) {
   


    $scope.$on('$viewContentLoaded', function() {
        //call it here
        initForm();
    });

    function initForm() {

        
        var cad;
        cad="cuentas"
        cad=UrlApiFinal(cad);
  

        $http.get(cad).
        success(function(data) {
                var c2= JSON.stringify(data);
              
                 //console.log(c2);

                console.log(data.length);

                var arr = [];
                var p1=[];
                for (var j=0;j<=data.length-1;j++){
                    //console.log("v " + data[j].codmacta);
                    p1=[];
                    p1.push(data[j].codmacta,data[j].nommacta);
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
    var dt = $('#example2').dataTable();
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