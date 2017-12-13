'use strict';
angular.module("adminApp")
// ------ parasito tratamiento-
.controller('CrearParasitoTratamientoCtrl',['$scope','CONFIG', 'ParasitoTratamiento','$routeParams', '$route', 'toastr', '$location','$timeout',
  function ($scope, CONFIG, ParasitoTratamiento,$routeParams, $route, toastr, $location,$timeout){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Contrareferencias',
      items:[
        {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
        {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
        {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:'active'}
        ]
    },
    pagina:{
      titulo:'Crear Parasito'
    }

  }
  $scope.parasitoTratamiento={
    par_id:null,
    trat_id:null
  }

  $scope.save=function()
  {

    console.log('esto llego al funcion ', $scope.parasitoTratamiento.trat_id);
    // ParasitoTratamiento.save($scope.parasitoTratamiento).$promise.then(function(data)
    // {
    //   if(data.status)
    //   {
    //     $scope.ajustes.pagina.success="Parasito creado exitosamente";
    //     toastr.success('Parásito creado correctamente');
    //   }
    // });

  }
}])