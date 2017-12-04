'use strict';
angular.module('adminApp')
.controller('SeguroCtrl', ['$scope', 'Seguros',
 function ($scope, Seguros) {
 	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Seguros',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:'active'},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]
       },
    pagina:{
      titulo:'Gestión de Seguros'
      
    }
  }
$scope.sortType = 'seg_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
	Seguros.get(function(data){
		$scope.seguros = data.seguro;
	//PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
	})

  $scope.get_seg_id = function(seg_id, seg_nombre) {
    $scope.nombre = seg_nombre;
  }
}])
.controller('CreateCtrlSeg', ['$scope','Seguros','$location', '$timeout', 'toastr', 
  function ($scope, Seguros, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Seguro',
      items:[
        {nombre:'Crear Seguro', enlace:'#/createseguro', estilo:'active'},
        {nombre:'Gestión de Seguro', enlace:'#/homeseguro', estilo:''}]
    },
    pagina:{
      titulo:'Crear Seguro',
      action:'AÑADIR'
    }
  }
  
  $scope.seguro = {
    seg_nombre: "",
    seg_descripcion: ""
    
  };

  $scope.submit = function(){
    Seguros.save($scope.seguro).$promise.then(function(data){
      if(data.status){ 
        angular.copy({}, $scope.seguro);
        $scope.ajustes.pagina.success = "Seguro creado correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Seguro creado correctamente');
        $timeout(function() {
          $location.path('/homeseguro');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
     
    });
  }
}])
.controller('EditCtrlSeg', ['$scope', 'Seguros','$routeParams','$location', '$timeout', 'toastr',
         function ($scope, Seguros, $routeParams, $location, $timeout, toastr) {
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Seguros',
      items:[
        {nombre:'Crear Seguro', enlace:'#/createseguro', estilo:''},
        {nombre:'Gestion de Seguros', enlace:'#/homeseguro', estilo:''}]
    },
    pagina:{
      titulo:'Editar Seguro',
      action:'EDITAR'
    }
  }
  
  var seg_id = $routeParams.seg_id; //Obtiene el id
  Seguros.get({seg_id:seg_id}, function(data){
  $scope.seguro = data.seguro;
  });
  $scope.submit = function(){ 
    Seguros.update({seg_id:$scope.seguro.seg_id}, $scope.seguro).$promise.then(function(data)
    {
    if(data.status){ 
      angular.copy({}, $scope.seguro);
      $scope.ajustes.pagina.success = "Datos del seguro editado correctamente"
      //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Seguro editada correctamente');
        $timeout(function() {
          $location.path('/homeseguro');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      }
    })
  }

}])