'use-strict';
angular.module("adminApp")
.controller('NumeroFichaController', ['$http','CONFIG','$scope','Ficha', '$route', 'toastr', function ($http,CONFIG,$scope,Ficha, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Fichas',
      items:[
        {nombre:'Asignacion de Número de Ficha', enlace:'#/numero-ficha/crear', estilo:'active'}]
    },
    pagina:{
      titulo:'Asignacion de Número de Ficha'
    }
  }
  $scope.CurrentDate=new Date();
  $scope.ficha={
    pt_id:null
  }
  $scope.num_ficha_traido_del_crear=0;
  $scope.aux=null;
  //guarda la ficha input pt_id
  $scope.savef=function(a)
  {
     $scope.ficha.pt_id=a;
     console.log('hasta aqui llego la funcion',$scope.ficha);
    Ficha.save($scope.ficha).$promise.then(function(data)
    {
      if(data.status)
      {
        $scope.ajustes.pagina.success="Muestra asignada exitosamente";
        $scope.aux2=data.ficha.fic_id;
        console.log('ESTE ES EL NUMERO DE FICHA QUE SE ASIGNÓ',$scope.aux2);
        verNumeroFicha($scope.aux2);
        toastr.success('Número de ficha asignada correctamente');
      }
    });
  }
  function verNumeroFicha(fic_id){
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/ficha/'+fic_id).success(function(respuesta){
          $scope.num_ficha_traido_del_crear = respuesta.ficha.fic_numero;
          console.log('llamo a la funcion', $scope.num_ficha_traido_del_crear);
      });
  }


  $scope.recarga=function(){
    $route.reload();
  }

}])

.controller('apiAppCtrl_persona_ficha', ['$http', '$scope', 'CONFIG', '$route', buscaPersonaController])
function buscaPersonaController($http, $scope, CONFIG, $route){
  $scope.buscaPersona = function($per_ci){
    console.log('esta buscando persona');
      $scope.tamanio="Cargando...";//////CAMBIADO
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/buscar_persona_tramite_ficha/'+$scope.per_ci).success(function(respuesta){
          $scope.persona_tramite = respuesta.persona_tramite;
          $scope.tamanio="";
          if(respuesta.persona_tramite){
              $scope.tamanio="";
              $scope.ver=true;
              $scope.switch=false;
          } else if(!respuesta.persona_tramite){
              $scope.ver=false;
              $scope.tamanio="La persona con el carnet ingresado, no inició un Trámite";
          }
          if(respuesta.ficha){
              $scope.tamanio="La persona ya cuenta con un numero de ficha";
              $scope.verprueba=true;
          }
      });
  }
}