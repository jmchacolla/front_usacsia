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
      console.log('la data',data);
    });
    $scope.cambiartrue=function (enfe_id, enf_nombre, pre_id) {
      $scope.pruebaenfermedad={
        enfe_id:enfe_id,
        pm_id: pm_id,
        pre_resultado:true,
      };
      $nombre=enf_nombre;
      PruebaEnfermedad.update($scope.pruebaenfermedad, {pre_id:pre_id}).$promise.then(function (data) {
        console.log('prueba enfermedad ---------', data);
          if(data.mensaje){
          toastr.error('Registro positivo para:  '+$nombre+' realizado correctamente');
        }
      })
    /*  $scope.prmedica={pm_estado:'OBSERVADO'};
      PruebaMedica.update($scope.prmedica, {pm_id:pm_id}, function (data) {
        console.log('la data---------', data);
        if (data.mensaje) {
          toastr.success('Estado modificado exitosamente');
        }
      })*/
      
    }
    $scope.cambiarfalse=function (enfe_id, enf_nombre, pre_id) {
      $scope.pruebaenfermedad={
        enfe_id:enfe_id,
        pm_id: pm_id,
        pre_resultado:false,
      };
      $nombre=enf_nombre;
      PruebaEnfermedad.update($scope.pruebaenfermedad, {pre_id:pre_id}).$promise.then(function (data) {
        console.log('prueba enfermedad ---------', data);
          if(data.mensaje){
          toastr.success('Registro negativo para:  '+$nombre+' realizado correctamente');
        }
      })
      
    }


    $scope.diagnostico = function (pm_diagnostico) {
      $scope.prueba={pm_diagnostico:pm_diagnostico};
      console.log($scope.prueba);
      PruebaMedica.update($scope.prueba, {pm_id:pm_id}, function (data) {
        console.log('la data---------', data);
        if (data.mensaje) {
          toastr.success('Diagnostico guardado exitosamente');
        // PruebaMedica.update()
        }
      })
    }
    
}])

// pm_id, pt_id, ser_id, fun_id, pm_fr, pm_fc, pm_peso, pm_diagnostico, pm_estado, pm_fecha, pm_pa_sistolica, pm_pa_diastolica, pm_temperatura, pm_imc, pm_talla