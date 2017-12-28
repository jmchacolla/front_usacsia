'use strict';
angular.module("adminApp")

.controller('FirmaCrearCtrl', ['$scope','CONFIG','PersonaporCI','EstabSols', '$route', 'toastr',
  function ($scope, CONFIG,PersonaporCI,EstabSols, $route, toastr){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Crear firma',
      items:[
        {nombre:'Firma', enlace:'#/firma/crear', estilo:'active'}
        ]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Crear firma'
    }
  }
  var SesionG = localStorage.getItem("Sesion");
  if (SesionG != null)
  {
    var SesionG = JSON.parse(SesionG);
    PersonaporCI.get({per_ci:SesionG.usu_nick}, function(data)
    {
      $scope.persona = data.persona;
    });
    console.log("entra a usuario controller para ver persona y logra verla persona con personaporci");
  }

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
}])
