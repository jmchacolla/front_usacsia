'use strict'
angular.module("adminApp")
// ------ REDES -------
.controller('RedCtrl', ['$scope', 'Redes',
 function ($scope,Redes) {
$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Redes',
      items:[
        {nombre:'Paises', enlace:'#/homepais'},
        {nombre:'Departamentos', enlace:'#/homedepartamento'},
        {nombre:'Provincias', enlace:'#/homeprovincia'},
        {nombre:'Regiones', enlace:'#/homeregion'},
        {nombre:'Gestión de Municipios', enlace:'#/homemunicipio', estilo:''},
        {nombre:'Listar Tipos de Establecimientos de Salud', enlace:'#/hometipo', estilo:''},
        {nombre:'Gestión de Seguros', enlace:'#/homeseguro', estilo:''},
        {nombre:'Gestión de Instituciones', enlace:'#/homeinstitucion', estilo:''},
        {nombre:'Gestión de Subsectores', enlace:'#/homesubsector', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:'active'},
        {nombre:'Gestión de Roles', enlace:'#/homerol', estilo:''},
        {nombre:'Gestión de Cargos', enlace:'#/homecargo', estilo:''}]

       },
    pagina:{
      titulo:'Gestión de Redes'
      
    }
  }
  $scope.sortType = 'red_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
	  Redes.get(function(data){
    $scope.reds = data.red;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
  });
  $scope.get_red_id = function(red_id, red_nombre){
    $scope.nombre = red_nombre;
  }
}])
.controller('EditCtrlRed', ['$scope', 'Redes','$routeParams','$location', '$timeout', 'toastr',
         function ($scope, Redes, $routeParams, $location, $timeout, toastr) {
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Redes',
      items:[
        {nombre:'Crear Red', enlace:'#/createred', estilo:''},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''}]
    },
    pagina:{
      titulo:'Editar Red',
      action:'EDITAR'
    }
  }
  
  var red_id = $routeParams.red_id; //Obtiene el id
  Redes.get({red_id:red_id}, function(data){
  $scope.reds = data.red;
  });
  $scope.submit = function(){ 
    Redes.update({red_id:$scope.reds.red_id}, $scope.reds).$promise.then(function(data)
    {
    if(data.msg){ 
      angular.copy({}, $scope.reds);
      $scope.ajustes.pagina.success = "Datos de la red editado correctamente"
      //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Red editada correctamente');
        $timeout(function() {
          $location.path('/homered');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      }
    })
  }

}])

.controller('CreateCtrlRed', ['$scope','Redes','$location', '$timeout', 'toastr', 
  function ($scope, Redes, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Redes',
      items:[
        {nombre:'Crear Redes', enlace:'#/createred', estilo:'active'},
        {nombre:'Gestión de Redes', enlace:'#/homered', estilo:''}]
    },
    pagina:{
      titulo:'Crear Red',
      action:'AÑADIR'
    }
  }
  
  $scope.reds = {
    red_nombre: "",
    red_cod_sice: 0,
    red_descripcion:""
       
  };

  $scope.submit = function(){
    Redes.save($scope.reds).$promise.then(function(data){
      if(data.msg){ 
        angular.copy({}, $scope.reds);
        $scope.ajustes.pagina.success = "Red creado correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Red creado correctamente');
        $timeout(function() {
          $location.path('/homered');
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
     
    });
  }
}])


.controller('apiApppCtrl', ['$http', controladorPrincipal])

    function controladorPrincipal($http){
        var vm=this;
        /*$http.get(vm.url)*/
        vm.buscaEnRegion = function(){
        	/*console.log("res:", vm.establecimiento, vm.establecimiento.es_id);*/
        $http.get('http://190.181.60.19/api_awebss/public/establecimiento_salud/'+vm.establecimiento.es_id).success(function(respuesta){
                console.log("res:", respuesta,vm.establecimiento.es_id);
                 vm.estabs = respuesta.establecimiento;
            });
        }
    }
;