'use strict';
angular.module("adminApp")

.controller('IndexCargoCtrl', ['$scope','CONFIG', 'Cargo', '$route',
 function($scope,CONFIG, Cargo, $route){
    $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Cargos',
      items:[
        {nombre:'Listar Cargos', enlace:'#/homecargo', estilo:'active'}]

       },
    pagina:{
      titulo:'Lista de Cargos'
      
    }
  }  
$scope.sortType = 'car_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
  Cargo.get(function(data){
        $scope.cargos = data.cargo;
        //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
      })

    if(CONFIG.ROL_CURRENT_USER==1){
    	$scope.cargos = [
    		{
		      "car_id": 1,
		      "car_tipo": "MEDICO"
    
		    },
		    {
		      "car_id": 15,
		      "car_tipo": "RESPONSABLE DE ESTABLECIMIENTO"
             
        
		    }
    	]
    }
    else{
    	Cargo.get(function(data){
	      $scope.cargos = data.cargo;
	    })

    }
    
    
}])

.controller('HomeCtrlCargo', ['$scope', 'Cargo', 
  function($scope, Cargo)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Cargos',
      items:[
      
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio'},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Institucion', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de  Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:'active'}]
        
       },
    pagina:{
      titulo:'Gestión de Cargos'
    }
  }
  $scope.sortType = 'car_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading = true;//PARA HACER UN LOADING EN EL TEMPLATE

  Cargo.get(function(data)
  {
    $scope.cargos = data.cargo;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.msg){
      $scope.loading = false;
      $scope.msg = data.msg;
    }
  })

}])