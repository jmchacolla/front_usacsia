'use-strict';
angular.module("adminApp")
.controller('PruebaLaboratorioController', ['$scope', 'PruebaLaboratorioService', '$route', 'toastr', function ($scope, PruebaLaboratorioService, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Ciudadanos Registrados'
    }
  }
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  $scope.loading=true;//para hacer un loading
  PruebaLaboratorioService.get(function(data){
    console.log(data);
    $scope.prueba_laboratorio = data.prueba_laboratorio;
    if(data.prueba_laboratorio.length>0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
    
  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 

  $scope.prueba_laboratorio={

  }

  // var id=0;
  // $scope.nombre_completo = "";
  // $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
  //   id = per_id;
  //   $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  // }


  $scope.submit = function(){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])

