'use strict';
angular.module("adminApp")
.controller('CategoriaCtrl', ['$scope', 'Categoria', 'UltimaPL', 'PruebaEnfermedad', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', '$http', 'PruebaLaboratorioService', 'PersonaTramite', 'CONFIG', 'Tratamiento', 'Receta', function ($scope, Categoria, UltimaPL, PruebaEnfermedad, $route, $resource,$routeParams, toastr, $location, $timeout, $http, PruebaLaboratorioService, PersonaTramite,  CONFIG, Tratamiento,Receta) {

    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Arancel',
        items:[
          {nombre:'Funcionarios', enlace:'#/funcionarios', estilo:'active'},
          {nombre:'Registrar funcionario', enlace:'#/funcionarios/createFun', estilo:''},
          {nombre:'Buscar Persona', enlace:'#/funcionarios/createfo', estilo:''}]
      },
      pagina:{
        titulo:'Listas de Aranceles'
      }
    }
    
    
    $scope.sortType = 'cat_id'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.loading=true;  
    Categoria.get(function (data) {
        $scope.categoria=data.categoria;
        console.log($scope.categoria);
        if(data.categoria.length>0){
          $scope.loading = false;
          $scope.msg = true;
        }
        else{
          $scope.loading = false;
          $scope.msg = false;
        }
    },function () {
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
  });
}])