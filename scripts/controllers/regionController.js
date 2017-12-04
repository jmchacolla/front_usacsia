'use strict';
angular.module('adminApp')
.controller('HomeCtrlReg', ['$scope', 'Region', 
  function ($scope, Region) {
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Region',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamento', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion', estilo:'active'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''},
        ]
        
       },
    pagina:{
      titulo:'Regiones'
      
    }
  }
  $scope.sortType = 'reg_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

	Region.get(function(data){
		$scope.regiones = data.region;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
	})
}])

.factory('Region', ['$resource', function ($resource){
  return $resource("http://190.181.60.19/api_awebss/public/regiones/:reg_id", {reg_id:"@_reg_id"}, {
    update: {method: "PUT", params: {reg_id: "@reg_id"}}
  })
}])