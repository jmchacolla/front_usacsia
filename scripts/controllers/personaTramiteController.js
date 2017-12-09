'use strict';
angular.module("adminApp")
.controller('PersonaTramiteController', ['$scope', 'ListarTramitesService', '$route', 'toastr', function ($scope, ListarTramitesService, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Tramites de Carné Sanitario'
    }
  }

  console.log('LLEGO AL CONTROLADOR---------');
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];


  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  ListarTramitesService.get({tra_id:1}, function(data){
    console.log('*******persona_tramite ---------', data);
    $scope.persona_tramite = data.persona_tramite;
    // for (var i=0; i=$scope.persona_tramite.length; i++)
    // {
    // 	 if ($scope.persona_tramite[i].per_genero=='F' || $scope.persona_tramite[i].per_genero=='f'){
    //     $scope.persona_tramite[i].per_genero='FEMENINO';
    //   }
    //   else if($scope.persona_tramite[i].per_genero=='M' || $scope.persona_tramite[i].per_genero=='m'){
    //     $scope.persona_tramite[i].per_genero='MASCULINO';
    //   }
    // }

    
    if(data.persona_tramite.length>0){
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

  var id=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = per_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  }

  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])


