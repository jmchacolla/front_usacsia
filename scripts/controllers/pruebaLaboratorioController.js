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

.controller('NumeroMuestraController', ['$scope', 'PruebaLaboratorioService', '$route', 'toastr', function ($scope, PruebaLaboratorioService, $route, toastr){
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
}])

.controller('crear',['authUser', '$scope', 'Funcionarios', '$routeParams', '$location', '$timeout', 'toastr', 'CONFIG', '$resource','PaisService','$http',
function (authUser,$scope, Funcionarios, $routeParams, $location, $timeout, toastr, CONFIG, $resource,PaisService,$http)
{
    $scope.pais = {
    nac_nombre: "pais creado desde angularrrrrrr3",
    nac_capital: "capitalasdf desde angular3",
    nac_continente: "continente3"
  };

  $scope.submit = function(){
    PaisService.save($scope.pais).$promise.then(function(data){
      if(data.msg){ 
        angular.copy({}, $scope.pais);
        toastr.success('pais creado creada correctamente');
        $scope.ajustes.pagina.success = "pais creado correctamente";
      }
    });
  }   
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





