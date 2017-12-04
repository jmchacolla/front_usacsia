'use strict';
angular.module('adminApp')

.controller('HomeCtrlDosVac', ['$scope','VacunaDosis', 'DosisVacuna', '$route', '$routeParams', 'toastr',
			 function ($scope, VacunaDosis, DosisVacuna, $route, $routeParams, toastr) 
{
$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Vacunas',
      items:[
        {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
    },
    pagina:{
      titulo:'Lista de Dosis Vacuna'
    }
  }
	$scope.sortType = 'dov_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
	$scope.sortReverse = false; //PARA ORDENAR ASCENDENTEMENTE O DESCENTENTEMENTE
	$scope.loading = true; // PARA HACER UN LOADING EN EL TEMPLATE

	var vac_id = $routeParams.vac_id;
	VacunaDosis.get({vac_id:vac_id},function(data) {
		console.log(data.vacuna_dosis);
		$scope.dosisvacuna = data.vacuna_dosis;
	}); 

	var id=0;
	$scope.numero = 0;
	$scope.tipo = "";
	$scope.get_dov_id  = function(dov_id, dov_numero_dosis, dov_tipo){
	    id=dov_id;
	    console.log(id);
	    $scope.numero = dov_numero_dosis;
	    console.log($scope.numero);
	    $scope.tipo = dov_tipo;
	    console.log($scope.tipo);
	}

  $scope.remove = function() {
    console.log(id);
  	DosisVacuna.delete({dov_id:id}).$promise.then(function(data){
  		if(data.mensaje){
  			//MENSAJE CON TOAST
	        toastr.success('Dosis eliminada correctamente');
	        $route.reload();
  		}
  	})
  }

}])
.controller('EditCtrlDosVac', ['authUser', '$scope', 'DosisVacuna','$routeParams', 'Vacunas','$location', '$timeout', 'toastr',
 function (authUser, $scope, DosisVacuna, $routeParams, Vacunas,$location, $timeout, toastr) {
  if(authUser.isLoggedIn()){
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión Vacunas',
      items:[
        {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
    },
    pagina:{
      titulo:'Editar Dosis Vacuna',
      action: "EDITAR"
    }
  }
	
	var dov_id = $routeParams.dov_id; //Obtiene el id
	DosisVacuna.get({dov_id:dov_id}, function(data){
	$scope.dosis_vacuna = data.dosis_vacuna;
	var vac_id = $scope.dosis_vacuna.vac_id;
	Vacunas.get({vac_id:vac_id}, function(data){
		$scope.vacuna = data.vacuna;
	})
	});
	$scope.submit = function(){ 
		DosisVacuna.update({dov_id:$scope.dosis_vacuna.dov_id}, $scope.dosis_vacuna).$promise.then(function(data)
		{
			if(data.mensaje){	
				angular.copy({}, $scope.dosis_vacuna);
				toastr.success('Datos de la dosis editados correctamente');
				$scope.ajustes.pagina.success = "Datos de la dosis editados correctamente"
				$timeout(function() {
		          $location.path('/vervacuna/'+data.dosis_vacuna.vac_id);
		        },0);
			}
		})
	}

  } else{
  	$location.path('/inicio');
  }
}])

.controller('CreateCtrlDosVac', ['authUser', '$scope','DosisVacuna','Vacunas','$routeParams','$route','toastr', 'VacunaDosis', '$location',
	function (authUser, $scope, DosisVacuna, Vacunas, $routeParams, $route, toastr, VacunaDosis, $location){
	
  if(authUser.isLoggedIn()){
    
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Vacunas',
      items:[
        {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
    },
    pagina:{
      titulo:'Crear Dosis',
      action: 'CREAR'
    }
  }

  var vac_id = $routeParams.vac_id; //Obtiene el id
  Vacunas.get({vac_id:vac_id}, function(data){
  $scope.vacuna = data.vacuna;

  });

	$scope.aux =0;
	VacunaDosis.get({vac_id:vac_id},function(data) {
	console.log(data.vacuna_dosis);
		$scope.dosisvacuna = data.vacuna_dosis;
		$scope.aux=$scope.dosisvacuna.vacuna_dosis.length + 1;
		console.log($scope.aux);
		$scope.dosis_vacuna = {
		vac_id:$routeParams.vac_id,
		dov_tipo:null,
		dov_suministro:null,
		dov_edad_inicio:null,
		dov_edad_fin:null,
		dov_numero_dosis:$scope.aux
		
	};
if($scope.aux<= $scope.dosisvacuna.vacuna.vac_cant_dosis) {
	$scope.submit = function() {
		DosisVacuna.save($scope.dosis_vacuna).$promise.then(function(data){
			if(data.mensaje){	
			angular.copy({}, $scope.dosis_vacuna);
			toastr.success('Dosis vacuna creada correctamente');
			$route.reload();
			}
		});
	}
	}
	else
	{
		console.log('Error');
	}
	}); 
	
  } else {
  	$location.path('/inicio');
  }
}])

