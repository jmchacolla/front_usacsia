'use strict';
angular.module("adminApp")

.controller('ListaEstabSolCtrl', ['$scope','EstabSols', '$route', 'toastr',
  function ($scope, EstabSols, $route, toastr){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:'active'},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientossol/create', estilo:''}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Establecimientos Solicitantes'
    }
  }

  $scope.sortType = 'ess_id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.establecimientos = [];
  
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
  $scope.establecimientoss = [];

  $scope.getEstablecimientos = function(page){
    //page = 20;
    $scope.establecimientoss = Establecimientos.query({
      page: page,
      max: 10
    })
    console.log($scope.establecimientoss);
  };

  EstabSols.get(function(data){
    $scope.establecimientos = data.est_sol;
    console.log("lista de Establecimientos solicitantes",$scope.establecimientos);
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
    console.log("entro al if");
      $scope.loading = false;
      $scope.msg = data.status;
    }
  },function () {
      console.log("error");
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });

  var id = 0;
  $scope.nombre = "";
  $scope.get_es_id = function(usa_id, es_nombre){
    id=usa_id;
    $scope.nombre = es_nombre;
  }

  $scope.remove = function(es_id){
    Establecimientos.delete({es_id:id}).$promise.then(function(data){
      if(data.mensaje) {
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
  
  //PARA PAGINACIÓN 
  $scope.currentPage = 0;
  $scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
  $scope.pages = [];

  $scope.configPages = function() {
   $scope.pages.length = 0;
   var ini = $scope.currentPage - 4;
   var fin = $scope.currentPage + 5;
   if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.establecimientos.length / $scope.pageSize) > 10) fin = 10;
      else fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
   } else {
      if (ini >= Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10) {
         ini = Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10;
         fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
      }
   }
   if (ini < 1) ini = 1;
   for (var i = ini; i <= fin; i++) {
      $scope.pages.push({ no: i });
   }
   if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  };
  $scope.setPage = function(index) {
     $scope.currentPage = index - 1;
  };
  //para llamar a la función:
  $scope.configPages();
  //fin paginación 
}])