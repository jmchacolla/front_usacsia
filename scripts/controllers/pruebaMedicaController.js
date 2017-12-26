'use-strict';
angular.module("adminApp")

.controller('PruebaMedicaCtrl', ['$scope', 'PruebaMedica', 'PersonaTramite', '$route', '$resource','$routeParams', 'toastr','$location', '$timeout', 'UltimaFichaAtendida', function ($scope, PruebaMedica, PersonaTramite, $route, $resource,$routeParams, toastr, $location, $timeout, UltimaFichaAtendida){
  var pt_id = $routeParams.pt_id;  
  $scope.ajustes = {
      menu:{
        titulo: 'Gestion de Pruebas Medicas',
        items:[
          {nombre:'Crear prueba medica', enlace:'#/prueba-medica/'+pt_id, estilo:'active'}]
      },
      pagina:{
        titulo:'Ficha Clínica'
      }
    }
  
    $scope.sortType = 'per_id'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.Personas = [];
    $scope.loading=true;//para hacer un loading
    
    console.log(pt_id,'es el pt');
   
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  $scope.fun_id = FunG.fun_id;
  console.log("es el id del funcionario",$scope.fun_id);
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
      fun_id:$scope.fun_id,//----------debe ser de sesion
      fic_id:null,
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
   var ficha=0;
   UltimaFichaAtendida.get({pt_id:pt_id}, function (f) {
     $scope.pruebamed.fic_id=f.ficha.fic_id;
     console.log('-----ficha', $scope.pruebamed);
   })

    $scope.save = function(){
        console.log('prueba medica ---------', $scope.pruebamed);
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
.controller('FichaClinicaCtrl', ['$scope', 'PersonaporCI', 'FichaClinica', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', function ($scope, PersonaporCI,FichaClinica, $route, $resource,$routeParams, toastr, $location, $timeout) {
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
    var per_ci=$routeParams.per_ci;
    PersonaporCI.get({per_ci:per_ci},function (data) {
      console.log('data-------', data);
      $scope.persona=data.persona;
      console.log('data-------', $scope.persona);
    });
    FichaClinica.get({per_ci:per_ci},function (data) {
      console.log('data-------', data);
      $scope.pruebas=data.pruebas;
      console.log('data-------', $scope.pruebas);
      if ($scope.pertramite.persona.per_genero=='F' || $scope.pertramite.persona.per_genero=='f'){
       $scope.pertramite.persona.per_genero='FEMENINO';
     }
     else if($scope.pertramite.persona.per_genero=='M' || $scope.pertramite.persona.per_genero=='m'){
       $scope.pertramite.persona.per_genero='MASCULINO';
     }
    });

}])
/*--ver prueba medica por pm_id*/
.controller('PruebaMedicaVerCtrl', ['$scope', 'PruebaMedica', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', function ($scope, PruebaMedica, $route, $resource,$routeParams, toastr, $location, $timeout) {

      $scope.ajustes = {
        menu:{
          titulo: 'Gestion de Consultas',
          items:[
            {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
        },
        pagina:{
          titulo:'Resultados de prueba medica'
        }
      }
      var pm_id=$routeParams.pm_id;
      PruebaMedica.get({pm_id:pm_id},function (data) {
        console.log('data-------', data);
        $scope.prueba_medica=data.prueba_medica;
        
      });


}])






