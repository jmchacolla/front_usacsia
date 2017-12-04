'use strict';
angular.module('adminApp')

.controller('HomeCtrlEnf', ['$scope','Enfermedades','$route', 'toastr', function ($scope, Enfermedades, $route, toastr) 
{
$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Enfermedades',
      items:[
        {nombre:'Crear Enfermedad', enlace:'#/createenfermedad', estilo:''},
        {nombre:'Enfermedades', enlace:'#/homeenfermedad', estilo:'active'}]
        
    },
    pagina:{
      titulo:'Lista de Enfermedades'
    }
  }
  $scope.sortType = 'enf_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

  Enfermedades.get(function(data) {
		$scope.enfermedad = data.enfermedad;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
	}); 

  //PARA OBTENER EL ID DE LA VACUNA Y QUE NO SE PIERDA AL USAR LA VENTANA MODAL
  var id=0;
  $scope.nombre = "";
  $scope.get_enf_id  = function(enf_id, enf_nombre){
    id=enf_id;
    console.log(id);
    $scope.nombre = enf_nombre;
    console.log($scope.nombre);
  }

  $scope.remove = function() {
    console.log(id);
  	Enfermedades.delete({enf_id:id}).$promise.then(function(data){
  		if(data.msg){
  			//MENSAJE CON TOAST
        toastr.success('Vacuna eliminada correctamente');
        $route.reload();
  		}
  	})
  }

}])

.controller('EditCtrlEnf', ['authUser', '$scope', 'Enfermedades','$routeParams', '$location', '$timeout', 'toastr',
 function (authUser, $scope, Enfermedades, $routeParams, $location, $timeout, toastr) {
	if(authUser.isLoggedIn()){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Enfermedades',
      items:[
        {nombre:'Crear Enfermedad', enlace:'#/createenfermedad', estilo:''},
        {nombre:'Enfermedades', enlace:'#/homeenfermedad', estilo:''}]
        
    },
    pagina:{
      titulo:'Editar Enfermedad',
      action:'EDITAR'
    }
  }
  $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]*$/;
  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  $scope.patternCadenaNumero2 = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ., 0-9()-º]*$/;
  var enf_id = $routeParams.enf_id; //Obtiene el id
	Enfermedades.get({enf_id:enf_id}, function(data){
	 $scope.enfermedad = data.enfermedad;
   $scope.submit = function(){ 
    $scope.enfer = 
    { enf_nombre : $scope.enfermedad.enfermedad.enf_nombre,
      enf_causas : $scope.enfermedad.enfermedad.enf_causas,
      enf_consecuencia : $scope.enfermedad.enfermedad.enf_consecuencia,
      enf_descripcion : $scope.enfermedad.enfermedad.enf_descripcion,
      enf_prevencion : $scope.enfermedad.enfermedad.enf_prevencion,}
    Enfermedades.update({enf_id:$scope.enfermedad.enfermedad.enf_id}, $scope.enfer).$promise.then(function(data)
    {
      if(data.status){ 
        angular.copy({}, $scope.enfermedad);
        $scope.ajustes.pagina.success = "Datos de la enfermedad editados correctamente"
        toastr.success('Enfermedad editada correctamente');
        $timeout(function() {
          $location.path('/verenfermedad/'+data.enfermedad.enf_id);
        },0);
      }
    })
   }
	});
} else {
  $location.path('/inicio');
}	
}])

.controller('VerCtrlEnf', ['authUser', '$scope', 'Enfermedades','$routeParams', '$location', 
  function (authUser, $scope, Enfermedades, $routeParams, $location) {
  if(authUser.isLoggedIn()){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Enfermedades',
      items:[
        
        {nombre:'Crear Enfermedad', enlace:'#/createenfermedad', estilo:''},
        {nombre:'Enfermedades', enlace:'#/homeenfermedad', estilo:''}]
    },
    pagina:{
      titulo:'Ver Enfermedad'
    }
  }
  
  $scope.enf_id = $routeParams.enf_id;
  $scope.enf_nombre = $routeParams.enf_nombre;
  var enf_id = $routeParams.enf_id; //Obtiene el id
  Enfermedades.get({enf_id:enf_id}, function(data){
  $scope.enfermedad = data.enfermedad.enfermedad;
  });
        
} else {
  $location.path('/inicio');
}
}])
.controller('CreateCtrlEnf', ['$scope','Enfermedades', '$location', '$timeout', 'toastr',
  function ($scope, Enfermedades, $location, $timeout, toastr){
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Enfermedades',
      items:[
        {nombre:'Crear Enfermedad', enlace:'#/createenfermedad', estilo:'active'},
        {nombre:'Enfermedades', enlace:'#/homeenfermedad', estilo:''}]
    },
    pagina:{
      titulo:'Crear Enfermedad',
      action:'GUARDAR'
    }
  }
	$scope.enfermedad = {
		enf_nombre: "",
		enf_causas: "",
		enf_consecuencia: "",
		enf_descripcion: "", 
		enf_prevencion: ""
		
	};

  $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]*$/;
  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  $scope.patternCadenaNumero2 = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ., 0-9()-º]*$/;
  
	$scope.submit = function(){
		Enfermedades.save($scope.enfermedad).$promise.then(function(data){
			if(data.msg){	
  			angular.copy({}, $scope.enfermedad);
  			toastr.success('Enfermedad creada correctamente');
        $scope.ajustes.pagina.success = "Enfermedad creada correctamente";
        $timeout(function() {
          $location.path('/homeenfermedad');
        },0);
			}
		});
	}

  $scope.reset = function(form) {
    //$scope.establecimiento = {};
    if (form) {
      //console.log(form);
      form.$setPristine();
      form.$setUntouched();
    }
  };
}])



