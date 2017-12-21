'use-strict';
angular.module("adminApp")

.controller('PruebaEnfermedadCtrl', ['$scope', '$scope', 'PruebaMedica', 'UltimaPL','PruebaEnfermedad', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', '$http', 'PruebaLaboratorioService', 'PersonaTramite', 'CONFIG', function ($scope,$scope, PruebaMedica, UltimaPL, PruebaEnfermedad, $route, $resource,$routeParams, toastr, $location, $timeout, $http, PruebaLaboratorioService, PersonaTramite,  CONFIG) {
  var pm_id = $routeParams.pm_id;
  $scope.ajustes = {
      menu:{
        titulo: 'Gestion de Pruebas Medicas',
        items:[
          {nombre:'Crear prueba medica', enlace:'#/prueba-medica/prueba/'+pm_id, estilo:'active'}]
      },
      pagina:{
        titulo:'Prueba Clínica'
      }
    }
    // ver datos persona y prueba medica
    
    // console.log(pm_id);
    PruebaMedica.get({pm_id:pm_id}, function(data)
    {
      $scope.prueba_medica = data.prueba_medica;
      console.log('la data',data);

      pt_id=$scope.prueba_medica.persona_tra.pt_id;

      UltimaPL.get({pt_id:pt_id}, function (argument) {
        $scope.prueba_laboratorio=argument.prueba_laboratorio;
        $scope.prupar=argument.prupar;
        $scope.fun=argument.fun;
        $scope.per=argument.per;
        console.log('argument-------', argument);
      });

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
        //-----generar estado prueba medica
          $http.get(CONFIG.DOMINIO_SERVICIOS+'/estadopruebamedica/'+pm_id).success(function(respuesta){
              $scope.pruebamedica = respuesta.pruebamedica;
              console.log('---prueba_medica:', $scope.pruebamedica);
              if ($scope.pruebamedica) {
                  var estadopm={pm_estado:'OK'}
              }
              else{
                  var estadopm={pm_estado:'OBSERVADO'}
              }
              // -----actualizando pm
              PruebaMedica.update(estadopm, {pm_id:pm_id}, function (prme) {//--modificando estado pm
                console.log('condiciones', prme.prueba_medica.pm_estado, $scope.prueba_laboratorio.pl_estado)
                if (prme.prueba_medica.pm_estado=='OK' && $scope.prueba_laboratorio.pl_estado=='NO OBSERVADO') {
                  // var fconcluido=new Date(DD-MM-YY);
                  estadotramite={pt_estado_tramite:'CONCLUIDO'/*, pt_fecha_fin:fconcluido*/};
                }else{
                estadotramite={pt_estado_tramite:'OBSERVADO'};
                }
                //----actualizando estado de tramite
                console.log('estado', estadotramite);
                PersonaTramite.update(estadotramite,{pt_id:pt_id}).$promise.then(function (pt) {
                  console.log('tramite', pt_id, '-------pt:', pt);
                });
              });
          });
        }
      });
      $timeout(function() {
         $location.path('/atencion');
          },1000);
    }
    
}])


