'use-strict';
angular.module("adminApp")
.controller('CrearAsignacionCtrl', ['$http','CONFIG','$scope','ZonIn','ListZon','Distritos','Inspectores', '$route', 'toastr', function ($http,CONFIG,$scope,ZonIn,ListZon,Distritos,Inspectores, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Asignación de zonas a inspectores',
      items:[
        {nombre:'Crear Asignación', enlace:'#/asignacion_zonas/crear', estilo:'active'}]
    },
    pagina:{
      titulo:'Crear Asignación de Zonas'
    }
  }

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;


    Distritos.get(function(data){
    $scope.distritos=data.distrito;
    console.log("_________DISTRITOS LISTA_",$scope.distritos);
   
  },function () {
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
  });

  Inspectores.get(function(data)
  {
    $scope.funcionarios = data.funcionario;
    if($scope.funcionarios.length >0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
  },function () {
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
  });

  $scope.zon=false;
  $scope.ver_zonas=function(dist){
    $scope.distri={
      distrito:dist.zon_distrito
    }
      console.log($scope.distri.distrito+"_________DISTRITO");
      $scope.zon=false;
      
      ListZon.get($scope.distri, function(data){
          $scope.zonas=data.zona;
          console.log("ZOnasss",$scope.zonas);
          if($scope.zonas.length == 0){
                $scope.zon=true;
          }
          console.log("length "+$scope.zonas.length);
      })
  };


  $scope.asignacion = {
      fun_id :null,
      zon_id :null
    };
    $scope.submit = function(a)
    {
       /* $scope.ficha1.fun_id=fun_id;
       $scope.asignacion.fun_id=a;
       $scope.asignacion.zon_id=b;*/
       
     console.log("_______GURDANDO_______",$scope.asignacion);
    
      ZonIn.save($scope.asignacion).$promise.then(function(data)
      {
        console.log("------GUARDADO.---------",data);
        if(data.msg)
        {
          console.log("data",data);
          angular.copy({}, $scope.ficha1);
          $scope.ajustes.pagina.success = "ASIGNACIÓN REGISTRADA CORRECTAMENTE";
          toastr.success('ASIGNACIÓN REGISTRADA CORRECTAMENTE');
          $route.reload();
         /* $timeout(function() {
            $location.path('/funcionarios');
          },1000);*/
        }
      },function () {
        toastr.error("Error inesperado");
      })
    }//fin submit
    $scope.reset = function(form) {
      $scope.asignacion = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };




/*  $scope.recarga=function(){
    $route.reload();
  }*/

}])