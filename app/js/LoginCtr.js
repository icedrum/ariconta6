var myApp2 = angular.module('sbAdminApp3',['ngCookies']); 

myApp2.controller('LoginCtr', ['$scope','$http', '$cookieStore', function($scope,$http,$cookieStore) {
    
    $scope.data={
        login: "David",
        nombre:"David G",
        password:"",
        nivel:-1
    }
    $scope.resultado="";
	$scope.ComprobarLogin=function() {
        var UsuOK;

        $scope.resultado="";
        if ($scope.data.login=="")
            $scope.resultado="Introduzca el login"
        else
        {
            if ($scope.data.password=="")
                $scope.resultado="Introduzca el password";
                
            else
            {
                var url="http://localhost:9080/api/usuarios" + "/" + $scope.data.login;
                console.log (url);
                UsuOK=false;
                


                //Esto habra que quitarlo
                $cookieStore.put("Usuario", 'David desde cooke');
                window.open('index.html#/dashboard/home', '_self');     
                return;  
/*
                $http.get(url).
                 success(function(data1) {
                    $scope.UsuBD= data1;
                     console.log(data1);
                     UsuOK=true;



                

                    if (data1.passwordpropio==$scope.data.password)
                        $scope.resultado="OK user";
                    else
                    {
                        UsuOK=false;
                        $scope.resultado="Usuario incorrECTO";       
                    }   


                    if(UsuOK)
                    {
                        $cookieStore.put("Usuario", 'David desde cooke');
                        $cookieStore.put("UsuarioObj", data1);
                        window.open('index.html#/dashboard/home', '_self');                
                    
                    }



                 });    
  */              
           $http.get(url)
            .success(function (data1, status, headers, config) {
        
    
                // this callback will be called asynchronously
                // when the response is available
                    $scope.UsuBD= data1;
                    console.log(data1);
                    UsuOK=true;



                

                    if (data1.passwordpropio==$scope.data.password)
                        $scope.resultado="OK user";
                    else
                    {
                        UsuOK=false;
                        $scope.resultado="Usuario incorrECTO";       
                    }   


                    if(UsuOK)
                    {
                        $cookieStore.put("Usuario", 'David desde cooke');
                        $cookieStore.put("UsuarioObj", data1);
                        window.open('index.html#/dashboard/home', '_self');                
                    
                    }

            }).error(function (data, status, headers, config) {
                
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.resultado="Error accediendo BD";       
              });


            }
        }


		
            
    };





   }]);