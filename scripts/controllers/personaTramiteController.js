'use strict';
angular.module("adminApp")
.controller('PersonaTramiteController', ['$scope', 'ListarTramitesService', '$route', 'toastr', function ($scope, ListarTramitesService, $route, toastr)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Tramites de Carné Sanitario'
    }
  }

  console.log('LLEGO AL CONTROLADOR---------');
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];


  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  ListarTramitesService.get({tra_id:1}, function(data){
    console.log('*******persona_tramite ---------', data);
    $scope.persona_tramite = data.persona_tramite;
    // for (var i=0; i=$scope.persona_tramite.length; i++)
    // {
    // 	 if ($scope.persona_tramite[i].per_genero=='F' || $scope.persona_tramite[i].per_genero=='f'){
    //     $scope.persona_tramite[i].per_genero='FEMENINO';
    //   }
    //   else if($scope.persona_tramite[i].per_genero=='M' || $scope.persona_tramite[i].per_genero=='m'){
    //     $scope.persona_tramite[i].per_genero='MASCULINO';
    //   }
    // }

    
    if(data.persona_tramite.length>0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
    
  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 

  var id=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = per_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  }

  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])



.controller('BusquedaPersonaController', ['$scope', '$route','PersonaTramite', 'toastr', function ($scope, $route, PersonaTramite,toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestion de solicitudes de trámite',
      items:[
        {nombre:'Busqueda de personas registradas', enlace:'#/', estilo:'active'}]
    },
    pagina:{
      titulo:'Personas registradas'
    }
  }
 
    $scope.persona_tramite={
      tra_id:1, 
      per_id:14,
      pt_numero_tramite:5555, 
      pt_vigencia_pago:"",
      pt_fecha_ini :"",
      pt_fecha_fin :"",
      pt_estado_pago:"sin concluir",
      pt_estado_tramite:"sin concluir",
      pt_monto:25.00,
      pt_tipo_tramite:"renovacion"
    };

  $scope.save = function(){
    PersonaTramite.save($scope.persona_tramite).$promise.then(function(data)
    {
      console.log($scope.persona_tramite);
        if(data.mensaje){
          toastr.success('Pago registrado correctamente');
        }
    })
  }
}])

.controller('BuscaPersonaCtrl', ['$http', '$scope', 'CONFIG', buscaPersonaController])


.controller('AtencionCtrl', ['$scope', 'FichasfechaService', '$route', 'toastr', function ($scope, FichasfechaService, $route, toastr) 
{
    $scope.today=moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YY");
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de tramites de Carné Sanitario',
        items:[
          {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
      },
      pagina:{
        titulo:'Atención para el Carné Sanitario '+$scope.today
      }
    }
    $scope.fecha={
       /*var fecha2=($scope.referencias.referencia.created_at).split(' ');
      $scope.fecharef=moment(fecha2,"YYYY-MM-DD").format("DD-MM-YYYY");*/
      
      fecha1:moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YYYY"),
      fecha2:moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YYYY")
    };
    $scope.sortType = 'per_id'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.Personas = [];


  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  FichasfechaService.get($scope.fecha, function(data){
    console.log('*******persona_tramite ---------', data);
    $scope.fichas = data.fichas;
    // for (var i=0; i=$scope.fichas.length; i++)
    // {
    //   if ($scope.fichas[i].per_genero=='F' || $scope.fichas[i].per_genero=='f'){
    //     $scope.fichas[i].per_genero='FEMENINO';
    //   }
    //   else if($scope.fichas[i].per_genero=='M' || $scope.fichas[i].per_genero=='m'){
    //     $scope.fichas[i].per_genero='MASCULINO';
    //   }
    // }

    
    if(data.fichas.length>0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
    
  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 

  var id=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = per_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;

  }
  $scope.atender = function (f_id) {
    // body...
    id=f_id;
    $scope.ficha={
      fic_estado:'ATENDIDO',
      fic_id:id
    }
    FichaServices.update({fic_id:id},$scope.ficha).$promise.then(function (data) {
      // body...
    })
  }
  // $scope.remove = function(per_id){
  //   Personas.delete({per_id:id}).$promise.then(function(data){
  //     if(data.mensaje){
  //       toastr.success('Registrando paciente');
  //       $route.reload();
  //     }
  //   })
  // }

  
}])
function buscaPersonaController($http, $scope, CONFIG){
  $scope.buscaPersona = function($per_ci){
    console.log('esta buscando persona');
      $scope.resultado="Cargando...";
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/personas_ci/'+$scope.per_ci).success(function(respuesta){
          $scope.persona = respuesta.persona;
          if(!respuesta.persona){
              $scope.msg=false;
              $scope.resultado="No se encontraron resultados";              
          } else if(respuesta.persona){
              $scope.msg=true;
          }  
      });
  }
}