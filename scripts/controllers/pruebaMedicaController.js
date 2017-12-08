'use-strict';
angular.module("adminApp")

.controller('PruebaMedicaCtrl', ['$scope', 'PruebaMedica', '$route', '$resource','$routeParams', 'toastr','$location', function ($scope, PruebaMedica, $route, $resource,$routeParams, toastr, $location){
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
   id = $routeParams.pt_id;

   $scope.referencias={
      br_frec_cardiaca:null,
      br_frec_resp:null,
      br_pa_sistolica:null,
      br_pa_diastolica:null,
      br_temperatura:null,
      br_peso:null,
      br_peso:null,
      br_talla:null,
      br_talla:null,
      br_peso:null,
      br_talla:null,
      pt_id:id
   };

    $scope.save = function(){
      PruebaMedica.save($scope.referencias).$promise.then(function(data)
      {
          console.log('*******prueba medica ---------', data);
            if(data.mensaje){
            toastr.success('Pago registrado correctamente');
          }
      })
  }

    
    
    
    
    
    
    
    
    
    
    

  // var id=0;
  // $scope.nombre_completo = "";
  // $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
  //   id = per_id;
  //   $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  // }


  $scope.submit = function(){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])






