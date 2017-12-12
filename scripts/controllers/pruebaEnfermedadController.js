'use-strict';
angular.module("adminApp")

.controller('PruebaEnfermedadCtrl', ['$scope', '$scope', 'PruebaMedica', 'Enfermedades','PruebaEnfermedad', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', function ($scope,$scope, PruebaMedica, Enfermedades, PruebaEnfermedad, $route, $resource,$routeParams, toastr, $location, $timeout) {


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
      $scope.save = function(pm_fc, pm_fr, pm_pa_sistolica, pm_pa_diastolica, pm_temperatura, pm_peso, pm_peso, pm_talla, pm_talla, pm_peso, pm_talla,pm_imc){
    
        PruebaMedica.save($scope.pruebamed).$promise.then(function(data)
        {
            console.log('prueba medica ---------', data);
              if(data.mensaje){
              toastr.success('Registro realizado correctamente');
              $timeout(function() {
                 $location.path('/prueba-medica/prueba/'+pt_id);
                  },1000);
            }
        })
    }
    $scope.pruebaenfermedad={
      enfe_id:null,
      pm_id: pm_id,
      pre_resultado: true,
    };

    $scope.botoncito={};

    $scope.check=false;
    $scope.boton=function (enfe_id, check) {
        console.log($scope.botoncito.check,'este es el check');
        if (!$scope.check){
          // console.log('crear'); $scope.check =true; console.log('el check'+enfe_id, $scope.check);
          $scope.pruebaenfermedad={
            enfe_id:enfe_id,
            pm_id: pm_id,
            pre_resultado: true,
          };
          PruebaEnfermedad.save($scope.pruebaenfermedad).$promise.then(function (data) {
            console.log('prueba enfermedad ---------', data);
              if(data.mensaje){
              toastr.success('Registro realizado correctamente');

            }
          })

        }else{
          console.log('destruir');
          $scope.check=false;
          console.log('el check',$scope.check);
        }
    }


    
}])
.controller('CheckController', ['$scope',function($scope){
  $scope.checkbox= {
    value : true
  };
}])