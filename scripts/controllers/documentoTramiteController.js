'use strict';
angular.module("adminApp")

.controller('CrearDocumentoTramiteCtrl', ['$scope', 'DocumentoTramite', '$route','$routeParams', 'toastr', '$location',
function ($scope, DocumentoTramite, $route,$routeParams,toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
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


  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])
