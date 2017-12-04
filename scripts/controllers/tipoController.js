'use strict'
angular.module("adminApp")
.controller('TipoCtrl', ['$scope', 'Tipos', 
	function ($scope,Tipos) {
	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Tipos de Estableimientos de Salud',
      items:[
        {nombre:'Paises', enlace:'#/homepais', estilo:''},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:'active'},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestion de  Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]

       },
    pagina:{
      titulo:'Gestión de Tipos'
      
    }
  }
  $scope.sortType = 'tip_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

  	Tipos.get(function(data){
	$scope.tipos = data.tipo;
	 //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.msg){
      $scope.loading = false;
      $scope.msg = data.msg;
    }
  })
}])