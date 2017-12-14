'use-strict';
angular.module("adminApp")

.controller('PruebaMedicaCtrl', ['$scope', 'PruebaMedica', 'PersonaTramite', '$route', '$resource','$routeParams', 'toastr','$location', '$timeout', function ($scope, PruebaMedica, PersonaTramite, $route, $resource,$routeParams, toastr, $location, $timeout){
    $scope.ajustes = {
      menu:{
        titulo: 'Gestion de Consultas',
        items:[
          {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
      },
      pagina:{
        titulo:'Ficha Clínica'
      }
    }
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  $scope.loading=true;//para hacer un loading
  var pt_id = $routeParams.pt_id;
  console.log(pt_id,'es el pt');
   

   //datos del persona

   PersonaTramite.get({pt_id:pt_id}, function(data)
   {
     $scope.pertramite = data.pertramite;
     console.log(data);
     console.log('llego');
     if ($scope.pertramite.persona.per_genero=='F' || $scope.pertramite.persona.per_genero=='f'){
       $scope.pertramite.persona.per_genero='FEMENINO';
     }
     else if($scope.pertramite.persona.per_genero=='M' || $scope.pertramite.persona.per_genero=='m'){
       $scope.pertramite.persona.per_genero='MASCULINO';
     }
   });

   $scope.pruebamed={
      pt_id:pt_id,
      ser_id:1,//---------medicina general
      fun_id:1,//----------debe ser de sesion
      pm_fc:"",
      pm_fr:"",
      pm_pa_sistolica:"",
      pm_pa_diastolica:"",
      pm_temperatura:"",
      pm_peso:null,
      pm_talla:null,
      pm_imc:null,
      // pm_fecha:"",
      // pm_diagnostico:"",
   };
   //calculando IMC
   var peso=0;
   var talla = 0; 
   
   $scope.calculapeso = function(a,b){
       
     if(a==null || b==null)
     {   
         $scope.pruebamed.pm_imc=0;
     }
     else if(a!=null && b!=null)
     {   
         var aa=(a).toFixed(2);
         var bb=(b).toFixed(2);
         $scope.pruebamed.pm_imc=(a/Math.pow(b,2)).toFixed(2);
     }
   }


    $scope.save = function(pm_fc, pm_fr, pm_pa_sistolica, pm_pa_diastolica, pm_temperatura, pm_peso, pm_imc,  pm_talla){
 
      PruebaMedica.save($scope.pruebamed).$promise.then(function(data)
      {
          console.log('prueba medica ---------', data);
            if(data.mensaje){
            toastr.success('Registro realizado correctamente');
            $timeout(function() {
               $location.path('/prueba-medica/prueba/'+data.prueba_medica.prueba_medica.pm_id);
                },1000);
          }
      })
  }


}])






