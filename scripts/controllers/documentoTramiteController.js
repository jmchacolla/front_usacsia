'use strict';
angular.module("adminApp")

.controller('CrearDocumentoTramiteCtrl', ['$scope', 'DocumentoTramite', '$route','$routeParams', 'toastr', '$location',
function ($scope, DocumentoTramite, $route,$routeParams,toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Requisitos para el tramite de Certificado sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Documentos requeridos para el registro del establecimiento'
    }
  }

  console.log('LLEGO AL CONTROLADOR del crear docmuento---------');
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];
  var et_id= $routeParams.et_id;

  $scope.obs=false;
  $scope.cambio = function(){
    if($scope.obs){
      $scope.obs=false;
    }else{
      $scope.obs=true;
    }
    console.log('raidoooooooos',$scope.obs);
  }
    $scope.obs2=false;
  $scope.cambio2 = function(){
    if($scope.obs2){
      $scope.obs2=false;
    }else{
      $scope.obs2=true;
    }
    console.log('raidoooooooos',$scope.obs2);
  }
    $scope.obs3=false;
  $scope.cambio3 = function(){
    if($scope.obs3){
      $scope.obs3=false;
    }else{
      $scope.obs3=true;
    }
    console.log('raidoooooooos',$scope.obs3);
  }
  
  $scope.documentoTramite1={
    doc_id:1,
    et_id:et_id,
    dt_url: "./img-nit",
    dt_observacion:"",
  }

    $scope.documentoTramite2={
    doc_id:1,
    et_id:et_id,
    dt_url: "./img-licfun",
    dt_observacion:"",
  }

  $scope.documentoTramite3={
    doc_id:1,
    et_id:et_id,
    dt_url: "./img-ci",
    dt_observacion:"",
  }
  
    $scope.submit = function(a){
      if(a==1){
        $scope.documentoTramite=$scope.documentoTramite1;
      }
      if(a==2){
        $scope.documentoTramite=$scope.documentoTramite2;
      }
      if(a==3){
        $scope.documentoTramite=$scope.documentoTramite3;
      }
      
    console.log($scope.documentoTramite, "documento que se va a guardar",$scope.documentoTramite,a);

    DocumentoTramite.save($scope.documentoTramite).$promise.then(function(data){
      if(data.msg){
        $scope.ajustes.pagina.success = "El ciudadano registrada exitosamente";
        toastr.success('Documento Guardado correctamente');
      }
    });
  }

}])



.controller('EditarDocumentoTramiteCtrl', ['$scope', 'DocumentoTramite2', 'DocumentoTramiteL','PersonasEstablecimiento','Documento','$route','$routeParams', 'toastr', '$location',
function ($scope, DocumentoTramite2,DocumentoTramiteL,PersonasEstablecimiento,Documento, $route,$routeParams,toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Requisitos para el tramite de Certificado sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Requisitos presentados del Tramite:'
    }
  }

  var et_id=$routeParams.et_id;
  var ess_id=null;
    DocumentoTramite2.get({et_id:et_id},function(data){
    $scope.documentos=data.documentotramite;
    $scope.tramite=data.tramite;
    ess_id=data.tramite.ess_id;
          PersonasEstablecimiento.get({ess_id:ess_id},function(data)
        {
          $scope.personas_x_establecimiento = data.personas_x_establecimiento;
            if($scope.personas_x_establecimiento.length > 0){
              $scope.loading = false;
              $scope.msg = true;
            }
            else {
              $scope.loading = false;
              $scope.msg = false;
            }
        },function () {
              $scope.loading = false;
              $scope.msg = false;
         });
      


    });
      
  


  /*guasrda modificaciones*/
      $scope.ids = [];
      $scope.observaciones = [];

        $scope.editado = function (dt_id,observado,observacion) {
            
              var idx = $scope.ids.indexOf(dt_id);
              if (idx > -1){
                if(observado){
                $scope.observaciones[idx].dt_observado=observado;
                $scope.observaciones[idx].dt_observacion=observacion;
                }else{
                  $scope.observaciones.splice(idx,1);
                }
              }
              else{
                $scope.ids.push(dt_id);
                $scope.dt_observacion={
                  dt_id:dt_id,
                  dt_observado:observado,
                  dt_observacion:observacion
                };
                $scope.observaciones.push($scope.dt_observacion);
              }
            $scope.final= $scope.ids;
            $scope.final2= $scope.observaciones;
        };

        $scope.update_lista = function(a){
          $scope.vector={
            observaciones:$scope.observaciones
          };
        DocumentoTramiteL.save($scope.vector).$promise.then(function(data){
          if(data.status) {
            $scope.ajustes.pagina.success = "CONFIGURACION GUARDADA";
                toastr.success('CONFIGURACIÓN GUARDADA');
          }
        })
      }
      /*----------------------*/
  
}])
