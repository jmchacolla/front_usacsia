'use strict';
angular.module('adminApp')

.controller('HomeCtrlVac', ['$scope','Vacunas','$route', 'toastr', function ($scope, Vacunas, $route, toastr) 
{
$scope.ajustes = {
    menu:{
      titulo: 'Gestión de Vacunas',
      items:[
        {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:'active'}]
    },
    pagina:{
      titulo:'Programa Ampliado de Inmunización'
    }
  }
  $scope.sortType = 'vac_id'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
  $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

  Vacunas.get(function(data) {
    $scope.vacuna = data.vacuna;
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
      $scope.loading = false;
      $scope.msg = data.status;
    }
  }); 
  
  //PARA OBTENER EL ID DE LA VACUNA Y QUE NO SE PIERDA AL USAR LA VENTANA MODAL
  var id=0;
  $scope.nombre = "";
  $scope.get_vac_id  = function(vac_id, vac_nombre){
    id=vac_id;
    console.log(id);
    $scope.nombre = vac_nombre;
    console.log($scope.nombre);
  }
  $scope.remove = function() {
    console.log(id);
    Vacunas.delete({vac_id:id}).$promise.then(function(data){
      if(data.mensaje){
        //MENSAJE CON TOAST
        toastr.success('Vacuna eliminada correctamente');
        $route.reload();
      }
    })
  }

}])
.controller('EditCtrlVac', ['authUser', '$scope', 'Vacunas','$routeParams','$location', '$timeout', 'toastr',
         function (authUser, $scope, Vacunas, $routeParams, $location, $timeout, toastr) {
  if(authUser.isLoggedIn()){
    
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Vacunas',
      items:[
        {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
    },
    pagina:{
      titulo:'Editar Vacuna',
      action:'EDITAR'
    }
  }
  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  $scope.patternCadenaNumero2 = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ., 0-9()-º]*$/;
  
  var vac_id = $routeParams.vac_id; //Obtiene el id
  Vacunas.get({vac_id:vac_id}, function(data){
  $scope.vacuna = data.vacuna;
  });
  $scope.submit = function(){ 
    Vacunas.update({vac_id:$scope.vacuna.vac_id}, $scope.vacuna).$promise.then(function(data)
    {
    if(data.status){ 
      angular.copy({}, $scope.vacuna);
      $scope.ajustes.pagina.success = "Datos de la vacuna editado correctamente"
      //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Vacuna editada correctamente');
        $timeout(function() {
          $location.path('/vervacuna/'+data.vacuna.vac_id);
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      }
    })
  }
}
  else{
  $location.path('/inicio');
  }
}])

.controller('VerCtrlVac', ['authUser', '$scope', 'Vacunas', '$routeParams', '$location', function (authUser, $scope, Vacunas, $routeParams, $location) {
  if(authUser.isLoggedIn()){
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Vacunas',
        items:[
          {nombre:'Crear vacuna', enlace:'#/createvacuna', estilo:''},
          {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
      },
      pagina:{
        titulo:'Ver Vacuna'
      }
    }
    
    var vac_nombre = $routeParams.vac_nombre; 
    var vac_id = $routeParams.vac_id; //Obtiene el id
    Vacunas.get({vac_id:vac_id}, function(data){
    $scope.vacuna = data.vacuna;
    });
  
  } else
  {$location.path('/inicio');}
}])

.controller('CreateCtrlVac', ['$scope','Vacunas','$location', '$timeout', 'toastr', 
  function ($scope, Vacunas, $location, $timeout, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Vacunas',
      items:[
        {nombre:'Crear Vacuna', enlace:'#/createvacuna', estilo:'active'},
        {nombre:'PAI', enlace:'#/homevacuna', estilo:''}]
    },
    pagina:{
      titulo:'Crear Vacuna',
      action:'CREAR'
    }
  }
  
  $scope.vacuna = {
    vac_nombre: "",
    vac_cant_dosis: null,
    vac_descripcion: ""
    
  };

  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  $scope.patternCadenaNumero2 = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ., 0-9()-º]*$/;
  
  $scope.submit = function(){
    Vacunas.save($scope.vacuna).$promise.then(function(data){
      if(data.mensaje){ 
        angular.copy({}, $scope.vacuna);
        $scope.ajustes.pagina.success = "Vacuna creada correctamente";   
        //INICIO MENSAJE TOAST Y PARA REDIRECCIONAR
        toastr.success('Vacuna creada correctamente');
        $timeout(function() {
          $location.path('/createdosisvacuna/' + data.vacuna.vac_id);
        },0);
        //FIN MENSAJE TOAST Y PARA REDIRECCIONAR
      };
    });
  }

  $scope.reset = function(form) {
    if (form) {
      //console.log(form);
      form.$setPristine();
      form.$setUntouched();
    }
  };
}])