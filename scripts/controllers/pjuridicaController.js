'use strict';
angular.module("adminApp")

.controller('CrearPJuridicaCtrl', ['$scope','Propietario', '$route', 'toastr',
  function ($scope, Propietario,$route, toastr){
    $scope.pjur={
      pjur_razon_social:"",
      pjur_nit:null,
      pro_tipo:"J"
    }

    $scope.save_pjuridica=function(){
      console.log("es lo que se va a crear",$scope.pjur);
      Propietario.save($scope.pjur).$promise.then(function(data){
        if(data.status){
          $scope.ajustes.pagina.success = "Empresa creada correctamente";
          toastr.success('Empresa creada correctamente');
        }
      });
    }

}])
