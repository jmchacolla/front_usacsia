'use-strict';
angular.module("adminApp")
.controller('NumeroMuestraController', ['$scope','Muestra', '$route', 'toastr', function ($scope,Muestra, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Asignacion de Número de Muestra', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Asignacion de Número de Muestra'
    }
  }

  $scope.muestra={
    pt_id:null,
    mue_num_muestra:null
  }
  $scope.savem=function(a,b)
  {
     $scope.muestra.pt_id=a;
     $scope.muestra.mue_num_muestra=b;
    Muestra.save($scope.muestra).$promise.then(function(data)
    {
      if(data.status)
      {
        $scope.ajustes.pagina.success="Muestra asignada exitosamente";
        toastr.success('Muestra asignada correctamente');
      }
    });
  }
}])

.controller('ListarMuestraController', ['$scope','Muestra', '$route', 'toastr', function ($scope,Muestra, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Asignacion de Número de Muestra', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Números de muestra asignados'
    }
  }
    Muestra.get(function(data){
    $scope.muestra = data.muestra;
    if(data.muestra.length>0){
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

}])


.controller('apiAppCtrl_persona', ['$http', '$scope', 'CONFIG', buscaPersonaController])
function buscaPersonaController($http, $scope, CONFIG){
  

  $scope.buscaPersona = function($per_ci){
    console.log('esta buscando persona');
      $scope.tamanio="Cargando...";//////CAMBIADO
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/buscar_persona_tramite/'+$scope.per_ci).success(function(respuesta){
          $scope.persona_tramite = respuesta.res.persona_tramite;
          $scope.numero_muestra = respuesta.res.numero_muestra;
          $scope.tamanio=respuesta.res.persona_tramite.length;
          if(respuesta.res.persona_tramite.length != 0){
              $scope.aa="cero";
              $scope.msg=true;
              $scope.switch=false;
          } else if(respuesta.persona_tramite.length == 0){
              $scope.aa="uno";
              $scope.msg=false;
              $scope.tamanio="No se encontraron resultados";
          }  
      });
  }
}
