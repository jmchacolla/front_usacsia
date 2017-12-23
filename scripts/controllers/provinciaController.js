'use strict';
angular.module('adminApp')
.controller('HomeCtrlPro', ['$scope', 'Provincia','Departamento', 
  function ($scope, Provincia, Departamento) {
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Provincias',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia', estilo:'active'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]
        
       },
    pagina:{
      titulo:'Provincias'
      
    }
  }
  $scope.sortType = 'pro_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

	Provincia.get(function(data){
		$scope.provincias = data.provincia;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
    Departamento.get(function(data){
      $scope.departamentos = data.departamento;
    })
	})
}])

