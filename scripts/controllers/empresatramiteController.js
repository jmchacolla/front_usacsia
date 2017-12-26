'use strict';
angular.module("adminApp")

.controller('EmpresaTramiteCtrl', ['CONFIG',/*'authUser',*/'$scope','Funcionarios','$route','$routeParams','toastr','$location',
  function (CONFIG,/*authUser,*/$scope,Funcionarios,$route,$routeParams,toastr,$location){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Trámites',
      items:[
        {nombre:'Funcionarios', enlace:'#/funcionarios', estilo:'active'},
        {nombre:'Registrar funcionario', enlace:'#/funcionarios/createFun', estilo:''},
        {nombre:'Buscar Persona', enlace:'#/funcionarios/createfo', estilo:''}]
    },
    pagina:{
      titulo:'Trámites de Certificado Sanitario'
    }
  }
  
  $scope.sortType = 'fun_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.loading=true;  
  
 /* if (authUser.isLoggedIn())
  { */
  /*  if(CONFIG.ROL_CURRENT_USER == 1){
      
    }
    else{*/
      var FunG = localStorage.getItem("Funcionario");
      var FunG = JSON.parse(FunG);
  
  /*  }*/
 /* }
  else{
    var es_id = $routeParams.es_id;
  }
  */
  Funcionarios.get(function(data)
  {
    $scope.funcionarios = data.funcionario;
    if($scope.funcionarios.length >0){
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

  var id = 0;
  $scope.nombre_completo = "";
  $scope.funcionarioPer = {
    fe_cargo : "",
   fe_profesion:"",
   /* fe_memorandum : "",*/
    fe_estado : "INACTIVO"
  };

  $scope.get_fe_id = function(fun_id, fe_paterno, fe_materno, fe_nombre, fe_cargo,fun_profesion/*, fe_estado_laboral, fe_inicio_trabajo,fe_fin_trabajo,fe_memorandum*/) {
    id = fun_id;
    $scope.nombre_completo = fe_paterno + " " + fe_materno + " " + fe_nombre;
    $scope.funcionarioPer.fe_cargo = fe_cargo;
    $scope.funcionarioPer.fe_profesion = fun_profesion;
    /* $scope.funcionarioPer.fe_estado_laboral = fe_estado_laboral;
   $scope.funcionarioPer.fe_inicio_trabajo = fe_inicio_trabajo;
    $scope.funcionarioPer.fe_fin_trabajo = fe_fin_trabajo;
    $scope.funcionarioPer.fe_memorandum = fe_memorandum;*/
    $scope.funcionarioPer.fun_estado = "INACTIVO";
    console.log($scope.funcionarioPer,id);
  }

  $scope.remove = function(fun_id)
  {
    /*if($scope.funcionarios.fe_estado_laboral == "POR CONTRATAR"){
      $scope.funcionarioPer.fe_memorandum = null;
    } 

    ///MIENTRAS NO SE USEN LAS FECHAS
    if($scope.funcionarioPer.fe_inicio_trabajo == null){
       $scope.funcionarioPer.fe_inicio_trabajo="01-01-2001";
    }
    if($scope.funcionarioPer.fe_fin_trabajo == null){
       $scope.funcionarioPer.fe_fin_trabajo="01-01-2001";
    }*/
      
    Funcionarios.delete({fun_id:id}, $scope.funcionarioPer).$promise.then(function(data){
      if(data.status){
        toastr.success('ELIMINADO CORRECTAMENTE');
         $timeout(function() {
          $route.reload();
           /*$location.path('/funcionarios');*/
        },1000);
      }
    })
  } 
}])
