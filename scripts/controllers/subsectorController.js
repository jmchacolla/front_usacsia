'use strict';
angular.module("adminApp")
.controller('HomeCtrlSub', ['$scope', 'Subsector', 
	function($scope, Subsector)
{
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Subsectores',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:'active'},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]
        
       },
    pagina:{
      titulo:'Gestión de Subsectores'
      
    }
  }
   $scope.sortType = 'ss_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

	Subsector.get(function(data)
	{
		$scope.subsector = data.subsector;
		//PARA HACER UN LOADING EN EL TEMPLATE
    if(data.msg){
      $scope.loading = false;
      $scope.msg = data.msg;
    }
	})

}])


.controller('CreateCtrlSub', ['$scope','Subsector','$location', '$timeout', 'toastr', 
  function ($scope, Subsector, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Subsectores',
      items:[
        {nombre:'Crear Subsector', enlace:'#/createsubsector', estilo:'active'},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''}]
    },
    pagina:{
      titulo:'Crear Subsector',
      action:'AÑADIR'
    }
  }
  
  $scope.subsector = {
    ss_nombre: ""
    
  };

  $scope.submit = function(){
    Subsector.save($scope.subsector).$promise.then(function(data){
      if(data.msg){ 
        angular.copy({}, $scope.subsector);
        $scope.ajustes.pagina.success = "Subsector creado correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Subsector creado correctamente');
        $timeout(function() {
          $location.path('/homesubsector');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
     
    });
  }
}])
.factory('Subsector', ['$resource', function ($resource){
  return $resource("http://190.181.60.19/api_awebss/public/subsector/:ss_id", {ss_id:"@_ss_id"}, {
    update: {method: "PUT", params: {ss_id: "@ss_id"}}
  })
}])