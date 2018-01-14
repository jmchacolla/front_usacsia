'use strict';
angular.module('adminApp')

.controller('VerificarPersonaCtrl', ['$scope','$http','CONFIG', 'PersonasEstablecimiento2','PersonasEstablecimiento','$route','$routeParams', 'toastr', '$location',
function ($scope, $http,CONFIG,PersonasEstablecimiento2,PersonasEstablecimiento,$route,$routeParams,toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Verificar estado de persona en USACSIA',
      items:[
        {nombre:'Registrar Empleado', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Verificar estado de persona en USACSIA'
    }
  }
  $scope.preregistro="http://localhost/usacsia_php_5.6/usacsia_git2/front_usacsia/#/servicios_ciudadanos/preregistro";

	var ess_id=12;//con inicio de sesion de empresa
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
	$scope.cambioper_ci=function(){
		$scope.estado_persona = null;
	    $scope.no_registrada=null;
	}
	$scope.verificarper=function(){
	  	$http.get(CONFIG.DOMINIO_SERVICIOS+'/estado_tramite_persona/'+$scope.per_ci).success(function(data){
	          $scope.estado_persona = data.estado_pt;
	          $scope.no_registrada=null;
	      }).error(function(data){
	      	$scope.estado_persona=null;
	  		console.log('errorrrrrrrrr-----');
	      	$scope.no_registrada="La persona no cuenta con registro en USACSIA";
	  	});
	};

	var id=null;
	$scope.get_perid=function(per_id,n,app,aps){
		id=per_id;
		$scope.nombres=n+" "+app+" "+aps;
		console.log("perid elegido", id);
	};

	$scope.submit=function(cargo){
		$scope.personaestab={
			per_id:id,
			ess_id:ess_id,
			ep_cargo:cargo
		};
		PersonasEstablecimiento2.save($scope.personaestab).$promise.then(function(data){
			if(data.status){
		        $scope.ajustes.pagina.success = "Empleado registrado exitosamente";
		        toastr.success('Empleado registrado exitosamente');
		        $route.reload();
		    }
		});
	};
	
	var id2=null;
	$scope.get_perid2=function(ep_id,n,app,aps){
		id2=ep_id;
		$scope.nombres=n+" "+app+" "+aps;
		console.log("perid elegido", id2); 
	};

	$scope.remove = function()
	{
	  PersonasEstablecimiento2.delete({ep_id:id2}).$promise.then(function(data)
	  {
	    if(data.mensaje)
	    {
	      toastr.success('Empleado retirado correctamente');
	      $route.reload();
	    }
	  })
	};
 
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];
  var et_id= $routeParams.et_id;

}])

