'use strict';
angular.module('adminApp')

.controller('VerificarPersonaCtrl', ['$scope','$http','CONFIG', 'PersonasEstablecimiento','$route','$routeParams', 'toastr', '$location',
function ($scope, $http,CONFIG,PersonasEstablecimiento,$route,$routeParams,toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Verificar estado de persona en USACSIA',
      items:[
        {nombre:'Requisitos para el tramite de Certificado sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Verificar estado de persona en USACSIA'
    }
  }

var ess_id=1;
PersonasEstablecimiento.get({ess_id:ess_id},function(data)
{
    $scope.personas_x_establecimiento = data.personas_x_establecimiento;
    if(data.mensaje && $scope.personas_x_establecimiento.length > 0){
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

	$scope.verificarper=function(){
	  	$http.get(CONFIG.DOMINIO_SERVICIOS+'/estado_tramite_persona/'+$scope.per_ci).success(function(respuesta){
	          $scope.persona = respuesta.estado_pt;
	          if(!respuesta.persona){
	              $scope.ver=false;
	              $scope.resultado=" La persona no se encuentra registrada";              
	          } else if(respuesta.persona){
	              $scope.ver=true;
	              $scope.resultado='';
	          }  
	      });
	}
	

  console.log('LLEGO AL CONTROLADOR del crear docmuento---------');
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];
  var et_id= $routeParams.et_id;

}])

