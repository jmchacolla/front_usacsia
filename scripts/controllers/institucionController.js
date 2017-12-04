'use strict';
angular.module('adminApp')
.controller('InstitucionCtrl', ['$scope', 'Institucion',
 function ($scope, Institucion) {
 	$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Instituciones',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Instituciones', enlace:'#/homeinstitucion', estilo:'active'},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]

       },
    pagina:{
      titulo:'Gestión de Instituciones'
      
    }
  }
  $scope.sortType = 'ins_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
	Institucion.get(function(data){
		$scope.instituciones = data.institucion;
		//PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
	});

  $scope.get_nac_id = function(ins_id, ins_nombre) {
    $scope.nombre = ins_nombre;
  }
}])

.controller('EditCtrlIns', ['$scope', 'Institucion','$routeParams','$location', '$timeout', 'toastr',
         function ($scope, Institucion, $routeParams, $location, $timeout, toastr) {
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Institución',
      items:[
        {nombre:'Crear Institución', enlace:'#/createinstitucion', estilo:''},
        {nombre:'Gestión de Instituciones', enlace:'#/homeinstitucion', estilo:''}]
    },
    pagina:{
      titulo:'Editar Institución',
      action:'EDITAR'
    }
  }
  
  var ins_id = $routeParams.ins_id; //Obtiene el id
  Institucion.get({ins_id:ins_id}, function(data){
  $scope.institucion = data.institucion;
  });
  $scope.submit = function(){ 
    Institucion.update({ins_id:$scope.institucion.ins_id}, $scope.institucion).$promise.then(function(data)
    {
    if(data.status){ 
      angular.copy({}, $scope.institucion);
      $scope.ajustes.pagina.success = "Datos de la Institucion editado correctamente"
      //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Institucion  editada correctamente');
        $timeout(function() {
          $location.path('/homeinstitucion');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      }
    })
  }

}])

.controller('CreateCtrlIns', ['$scope','Institucion','$location', '$timeout', 'toastr', 
  function ($scope, Institucion, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Institución',
      items:[
         {nombre:'Crear Institución', enlace:'#/createinstitucion', estilo:''},
        {nombre:'Gestión de Institución', enlace:'#/homeinstitucion', estilo:''}]
    },
    pagina:{
      titulo:'Crear Institución',
      action:'AÑADIR'
    }
  }
  
  $scope.institucion = {
    ins_nombre: "",
    ins_cod_sice: 0,
    ss_id: 0
   };

  $scope.submit = function(){
    Institucion.save($scope.institucion).$promise.then(function(data){
      if(data.status){ 
        angular.copy({}, $scope.institucion);
        $scope.ajustes.pagina.success = "Institucion creado correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Institución creado correctamente');
        $timeout(function() {
          $location.path('/homeinstitucion');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
     
    });
  }
}])
