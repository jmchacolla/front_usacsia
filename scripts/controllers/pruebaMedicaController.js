'use-strict';
angular.module("adminApp")

.controller('PruebaMedicaCtrl', ['$scope', 'PruebaMedica', 'PersonaTramite', '$route', '$resource','$routeParams', 'toastr','$location', function ($scope, PruebaMedica, PersonaTramite, $route, $resource,$routeParams, toastr, $location){
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
   pt_id = $routeParams.pt_id;
   

   //datos del persona

   PersonaTramite.get({pt_id:pt_id}, function(data)
   {
     $scope.pertramite = data.pertramite;
     if ($scope.pertramite.persona.per_genero=='F' || $scope.pertramite.persona.per_genero=='f'){
       $scope.pertramite.persona.per_genero='FEMENINO';
     }
     else if($scope.pertramite.persona.per_genero=='M' || $scope.pertramite.persona.per_genero=='m'){
       $scope.pertramite.persona.per_genero='MASCULINO';
     }
   });

   $scope.referencias={
      br_frec_cardiaca:null,
      br_frec_resp:null,
      br_pa_sistolica:null,
      br_pa_diastolica:null,
      br_temperatura:null,
      br_peso:null,
      br_talla:null,
      pt_id:pt_id,
   };
   //calculando IMC
   var peso=0;
   var talla = 0; 
   $scope.imc=null;
   $scope.calculapeso = function(a,b){
       
     if(a==null || b==null)
     {   
         $scope.imc2=0;
     }
     else if(a!=null && b!=null)
     {   
         var aa=(a).toFixed(2);
         var bb=(b).toFixed(2);
         $scope.imc2=(a/Math.pow(b,2)).toFixed(2);
     }
   }


    $scope.save = function(br_frec_cardiaca, br_frec_resp, br_pa_sistolica, br_pa_diastolica, br_temperatura, br_peso, br_peso, br_talla, br_talla, br_peso, br_talla){
      PruebaMedica.save($scope.referencias).$promise.then(function(data)
      {
          $scope.refer={
                  pt_id:pt_id,
                  br_frec_cardiaca:br_frec_cardiaca,
                  br_frec_resp:br_frec_resp,
                  br_pa_sistolica:br_pa_sistolica,
                  br_temperatura:br_temperatura,
                  br_peso:br_peso,
                  imc2
                  br_diagnostico:"",
                  br_pa_diastolica:br_pa_diastolica,
                  br_talla:br_talla,
                  br_estado_referencia:false,
                  br_servicio_referente:br_servicio_referente,
                  br_servicio_destino:br_servicio_destino
           };

          // console.log('prueba medica ---------', data);
          //   if(data.mensaje){
          //   toastr.success('Pago registrado correctamente');
          // }
      })
  }

    
    
    
    
    
    
    
    
    
    
    

  // var id=0;
  // $scope.nombre_completo = "";
  // $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
  //   id = per_id;
  //   $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  // }


  // $scope.submit = function(){
  //   Personas.delete({per_id:pt_id}).$promise.then(function(data){
  //     if(data.mensaje){
  //       toastr.success('Eliminado correctamente');
  //       $route.reload();
  //     }
  //   })
  // }
}])






