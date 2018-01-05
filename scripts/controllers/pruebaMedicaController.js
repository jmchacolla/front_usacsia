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
.controller('FichaClinicaCtrl', ['$scope', 'PersonaporCI', 'FichaClinica', 'UltimaPL', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', 'CONFIG', function ($scope, PersonaporCI,FichaClinica, UltimaPL, $route, $resource,$routeParams, toastr, $location, $timeout, CONFIG) {
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
    var per_id=$routeParams.per_id;
    console.log('routeParams', per_id);

    FichaClinica.get({per_id:per_id},function (data) {
      $scope.pruebas=data.pruebas;
      $scope.persona=data.persona;
      $scope.persona.per_fecha_nacimiento=moment($scope.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
      console.log('data2p------', $scope.pruebas);
      angular.forEach($scope.pruebas, function(value, key){
            console.log( 'fecha:',value.pm_fecha);
            value.pm_fecha=moment(value.pm_fecha,"YYYY-MM-DD").format("DD-MM-YYYY");

         });
    });
    // UltimaPL.get()

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
        $scope.prueba_medica=data.prueba_medica;
        console.log('data-------', $scope.prueba_medica);
        $scope.prueba_medica.paciente.per_fecha_nacimiento=moment($scope.prueba_medica.paciente.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
        $scope.prueba_medica.prueba_medica.pm_fecha=moment($scope.prueba_medica.prueba_medica.pm_fecha,"YYYY-MM-DD").format("DD-MM-YYYY");
        
      });


}])






