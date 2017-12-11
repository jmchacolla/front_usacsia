'use-strict';
angular.module("adminApp")

.controller('PruebaEnfermedadCtrl', ['$scope', '$scope', 'PruebaMedica', 'Enfermedades', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', function ($scope,$scope, PruebaMedica, Enfermedades, $route, $resource,$routeParams, toastr, $location, $timeout) {


    $scope.ajustes = {
      menu:{
        titulo: 'Gestion de Consultas',
        items:[
          {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
      },
      pagina:{
        titulo:'Prueba Clínica'
      }
    }
    // ver datos persona y prueba medica
    var pm_id = $routeParams.pm_id;
    // console.log(pm_id);
    PruebaMedica.get({pm_id:pm_id}, function(data)
    {
      $scope.prueba_medica = data.prueba_medica;

    });

    // listar enfermedades
    
    Enfermedades.get(function(data)
    {
      $scope.enfermedad = data.enfermedad;

    });
    $scope.boton=function (enfe_id) {
        console.log(enfe_id,'este es');
    }


    
}])
.controller('CheckController', ['$scope',function($scope){
  $scope.checkbox= {
    value : true
  };
}])