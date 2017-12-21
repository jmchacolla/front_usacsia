'use strict';
angular.module('adminApp')

.controller('HomeCtrlDep',['$scope','Departamento','$route', function ($scope, Departamento, $route) {

$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Departamento',
      items:[
         {nombre:'Gestión de Parasitos', enlace:'#/parasito', estilo:''},
        {nombre:'Gestión de Tratamientos', enlace:'#/tratamiento', estilo:''},
        {nombre:'Gestión de Enferemdades', enlace:'#/homeenfermedad', estilo:''},
         {nombre:'Paises', enlace:'#/homepais', estilo:'active'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'}]
        
    },
    pagina:{
      titulo:'Departamentos'
    }
  }
  $scope.sortType = 'dep_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

Departamento.get(function(data) {
		$scope.departamentos = data.departamento;
	//PARA HACER UN LOADING EN EL TEMPLATE	
	if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
	}); 
$scope.remove = function(dep_id) {
	Departamento.delete({dep_id:dep_id}).$promise.then(function(data){
		if(data.msg){
			$route.reload();
		}
	})
}

}])
.controller('EditCtrlDep', ['$scope', 'Departamento','$routeParams',
 function ($scope, Departamento, $routeParams) {
	 $scope.ajustes = {
    menu:{
      titulo: 'Gestión de departamentos',
      items:[
        {nombre:'Crear Departamento', enlace:'#/createdepartamento', estilo:''},
        {nombre:'Lista de departamentos', enlace:'#/homedepartamento', estilo:''}]
    },
    pagina:{
      titulo:'Editar Vacuna',
      action:'EDITAR'
    }
  }
	$scope.settings= { 
		pageTitle:"Editar departamento",
		action: "EditDepartamento"
	}
	var dep_id = $routeParams.dep_id; //Obtiene el id
	Departamento.get({dep_id:dep_id}, function(data){
	$scope.departamento = data.departamento;
	});
	$scope.submit = function(){ 
		Departamento.update({dep_id:$scope.departamento.dep_id}, $scope.departamento).$promise.then(function(data)
		{
		if(data.mensaje){	
			angular.copy({}, $scope.departamento);
			$scope.settings.success = "Departamento editado correctamente"
			}
		})
	}

}])
.controller('VerCtrlDep', ['$scope', 'Departamento','$routeParams',
 function ($scope, Departamento, $routeParams) {
	 $scope.ajustes = {
    menu:{
      titulo: 'Gestión de departamentos',
      items:[
        {nombre:'Crear Departamento', enlace:'#/createdepartamento', estilo:''},
        {nombre:'Lista de departamentos', enlace:'#/homedepartamento', estilo:''}]
    },
    pagina:{
      titulo:'Editar Vacuna',
      action:'EDITAR'
    }
  }
	$scope.settings= { 
		pageTitle:"Editar departamento",
		action: "EditDepartamento"
	}
	var dep_id = $routeParams.dep_id; //Obtiene el id
	Departamento.get({dep_id:dep_id}, function(data){
	$scope.departamento = data.departamento;
	});
	

}])
.controller('CreateCtrlDep', ['$scope','Departamento','$location', '$timeout', 'toastr', 
	function ($scope, Departamento, $location, $timeout, toastr){
	 $scope.ajustes = {
    menu:{
      titulo: 'Gestión de departamentos',
      items:[
        {nombre:'Crear Departamento', enlace:'#/createdepartamento', estilo:'active'},
        {nombre:'Lista de departamentos', enlace:'#/homedepartamento', estilo:''}]
    },
    pagina:{
      titulo:'Crear Departamento',
      action:'CREAR'
    }
  }
	$scope.settings = {
		pageTitle: "Crear Departamento",
		action: "CrearDepartamento"
	}

	$scope.departamento= {

		dep_nombre: ""
	};

	$scope.submit = function(){
		Departamento.save($scope.departamento).$promise.then(function(data){
			if(data.mensaje){	
			angular.copy({}, $scope.departamento);
			$scope.settings.success = "Departamento creado correctamente"
			}
		});
	}
}])



 