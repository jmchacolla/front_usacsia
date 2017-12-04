'use strict';
angular.module("adminApp")
.controller('RolCtrl', ['$scope', 'RolResource', 
	function ($scope, RolResource){
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Rol',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:'active'},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]

       },
    pagina:{
      titulo:'Gestión de Roles'
      
    }
  }	
  $scope.sortType = 'rol_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading = true; //PARA HACER UN LOADING EN EL TEMPLATE
  RolResource.get(function(data){
  	$scope.roles = data.rol;
  	//PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
  })
}])
.controller('CreateCtrlRol', ['$scope','RolResource','$location', '$timeout', 'toastr', 
  function ($scope, RolResource, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Subsectores',
      items:[
        {nombre:'Crear Rol', enlace:'#/createrol', estilo:'active'},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''}]
    },
    pagina:{
      titulo:'Crear Rol',
      action:'AÑADIR'
    }
  }
  
  $scope.roles = {
    
    rol_nombre: "",
    rol_descripcion: ""
    
  };

  $scope.submit = function(){
    RolResource.save($scope.roles).$promise.then(function(data){
      if(data.msg){ 
        angular.copy({}, $scope.roles);
        $scope.ajustes.pagina.success = "Rol creado correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Rol creado correctamente');
        $timeout(function() {
          $location.path('/homerol');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
     
    });
  }
}])