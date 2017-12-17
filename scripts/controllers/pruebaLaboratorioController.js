'use-strict';
angular.module("adminApp")
.controller('PruebaLaboratorioCtrl', ['$scope', 'PruebaLaboratorioService', '$route', 'toastr', function ($scope, PruebaLaboratorioService, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Ciudadanos Registrados'
    }
  }
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  $scope.loading=true;//para hacer un loading
  PruebaLaboratorioService.get(function(data){
    console.log(data);
    $scope.prueba_laboratorio = data.prueba_laboratorio;
    if(data.prueba_laboratorio.length>0){
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

  // $scope.prueba_laboratorio={

  // }

  // $scope.submit = function(){
  //   Personas.delete({per_id:id}).$promise.then(function(data){
  //     if(data.mensaje){
  //       toastr.success('Eliminado correctamente');
  //       $route.reload();
  //     }
  //   })
  // }
}])


.controller('CrearPruebaLaboratorioCtrl', ['$scope', '$routeParams','ParasitosPrueba','Parasito','ParasitosNoPrueba','PruebaLaboratorioService','PruebaPar','ParasitosPrueba', 'Muestra','$route', 'toastr','$location','$timeout',
  function ($scope,$routeParams,ParasitosPrueba,Parasito,ParasitosNoPrueba,PruebaLaboratorioService,PruebaPar,ParasitosPrueba,Muestra, $route, toastr,$location,$timeout){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Busca Número de Muestra'
    }
  }
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  var mue_id = $routeParams.mue_id;
  var fun_id=1;//remplaar con la sesion
  /*

  prueba laboratiosio deberia tener presencia de moco, y presencia de sangre*/
  $scope.CurrentDate=new Date();
  // usu=per_id
  // rol,nombre


  $scope.ver=false;



  $scope.loading=true;//para hacer un loading
  PruebaLaboratorioService.get(function(data){
    console.log(data);
    $scope.prueba_laboratorio = data.prueba_laboratorio;
    if(data.prueba_laboratorio.length>0){
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
    /*tambien deberia enviar en fun_id del laboratorisr que realiza la prueba*/
  $scope.pruebalaboratorio={
    mue_id:null
  }
  $scope.pruebapar={
      pl_id:null,
      par_id:null
    }
  


  $scope.saveplnegativo=function(mue_id){
    $scope.pruebalaboratorio.mue_id=mue_id;
    $scope.pruebalaboratorio.pl_estado='SIN OBSERVACION';
    console.log("prueba laboratorio creada",$scope.pruebalaboratorio);
    PruebaLaboratorioService.save($scope.pruebalaboratorio).$promise.then(function(data)
    {
      if(data.status){
        $scope.pruebapar.pl_id=data.prueba_laboratorio.pl_id;
        console.log("id_ de la prueba labortorio creada" , $scope.pruebapar.pl_id);
        toastr.success('Muestra Negativa');
      }
    })
  }


  /*se crea la prueba laboratorio*/

  $scope.savepl=function(mue_id){
    $scope.pruebalaboratorio.mue_id=mue_id;
    console.log("prueba laboratorio creada",$scope.pruebalaboratorio);
    PruebaLaboratorioService.save($scope.pruebalaboratorio).$promise.then(function(data)
    {
      if(data.status){
        $scope.pruebapar.pl_id=data.prueba_laboratorio.pl_id;
        console.log("id_ de la prueba labortorio creada" , $scope.pruebapar.pl_id);
        $timeout(function() {
          $location.path('/prueba-laboratorio/crear/'+$scope.pruebapar.pl_id);
        },10);
        toastr.success('Prueba Laboratorio guardada correctamente');
      }
    })
  }
}])


.controller('EditarPruebaLaboratorioCtrl', ['$scope', '$routeParams','ParasitosPrueba','Parasito','ParasitosNoPrueba','PruebaLaboratorioService','PruebaPar','ParasitosPrueba', 'Muestra','$route', 'toastr','$location','$timeout',
  function ($scope,$routeParams,ParasitosPrueba,Parasito,ParasitosNoPrueba,PruebaLaboratorioService,PruebaPar,ParasitosPrueba,Muestra, $route, toastr,$location,$timeout){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Ciudadanos',
      items:[
        {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Crea Prueba Laboratorio'
    }
  }
  
  $scope.loading=true;//para hacer un loading
  PruebaLaboratorioService.get(function(data){
    console.log(data);
    $scope.prueba_laboratorio = data.prueba_laboratorio;
    if(data.prueba_laboratorio.length>0){
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


  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  var mue_id = $routeParams.mue_id;
  var fun_id=1;//remplaar con la sesion
  $scope.CurrentDate=new Date();
  var pl_id=$routeParams.pl_id;

  /*lista de parasitos que no estan asignados en la prueba*/
    ParasitosNoPrueba.get({pl_id:pl_id},function(data){
     $scope.parasitosno = data.pruebaparasito;
     console.log("llega al parasito---",$scope.parasitosno);
  })
    $scope.pruebapar={
      pl_id:pl_id,
      par_id:null
    }
  /*se crea la prueba parasito, solo recibe pl_id y par_id*/
    $scope.saveppp=function(){
    console.log("parasitos encontrados en la prueba.....",$scope.pruebapar);
    PruebaPar.save($scope.pruebapar).$promise.then(function(data)
    {
      if(data.status)
        {
          $scope.ajustes.pagina.success="Parasito agregado exitosamente";
          toastr.success('Parasito agregado correctamente');
          $route.reload();
        }else{
        toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
      }
    })
  }

  /*lista de parasitos que estan asignados en la prueba*/
    ParasitosPrueba.get({pl_id:pl_id},function(data){
     $scope.parasitos = data.pruebaparasito;
     console.log("llega al parasito---",$scope.parasitosno);
  })
    $scope.retirar = function(pp_id) {
    PruebaPar.delete({pp_id:pp_id}).$promise.then(function(data){
        if(data.status) {
          $route.reload();
          toastr.success('Parasito retirado exitosamente');
        }else{
        toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
      }
      })
  }

/*ultimo cambio*/
  /*para l editar de la prueba laboratorio*/
    $scope.prueba_labo={
    fun_id:fun_id,
    pl_estado:"",
    pl_tipo:"",
    pl_color:"",
    pl_aspecto:"",
    pl_moco:false,
    pl_sangre:false,
    pl_estado:"",
    pl_observaciones:""
  }

$scope.checkmoco=false;
$scope.checksangre=false;
$scope.moco=function(){
  if($scope.checkmoco){
    $scope.checkmoco=false;
  }
  else{
    $scope.checkmoco=true;
  }
  console.log('check1',$scope.checkmoco);
}

$scope.sangre=function(){
  if($scope.checksangre){
    $scope.checksangre=false;
  }
  else{
    $scope.checksangre=true;
  }
  console.log('check2',$scope.checksangre);
}
      

  /*se ceditan los datos de la prueba laboratorio*/
  $scope.guardar=function(par_id){
    $scope.prueba_labo.pl_moco=$scope.checkmoco;
    $scope.prueba_labo.pl_sangre=$scope.checksangre;
    console.log("prueba laboratorio que hay ue guardar.....",$scope.prueba_labo);
    PruebaLaboratorioService.update({pl_id:$scope.pruebapar.pl_id}, $scope.prueba_labo).$promise.then(function(data){
    {
      if(data.status){
        toastr.success('Prueba de laboratorio Guardada correctamente');
        }
      }
    })
}

}])


.controller('apiAppCtrl_numeromuestra', ['$http', '$scope', 'CONFIG', buscaNumeroMuestraCtrl])
function buscaNumeroMuestraCtrl($http, $scope, CONFIG){
  $scope.buscaNumeroMuestra = function(){

    console.log('esta buscando numero de muestra', $scope.numero_muestra);
      $scope.tamanio="Cargando...";//////CAMBIADO
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/buscar_numero_muestra/'+$scope.numero_muestra).success(function(respuesta){
          $scope.muestra = respuesta.muestra;
          if(respuesta.muestra){
              $scope.tamanio="";
              $scope.ver=true;
              $scope.switch=false;
          } else if(!respuesta.muestra){
              $scope.ver=false;
              $scope.tamanio="El numero de muestra ingresado no fue asignado";
          }
          if(respuesta.pruebalabo){
              $scope.tamanio="La muestra ya fue analizada";
              $scope.verprueba=true;
          }
      });
  }
};



// function pasitosAsignadosCtrl($http, $scope, CONFIG){
//   $scope.pasitosAsignados = function(){
    
//     $http.get(CONFIG.DOMINIO_SERVICIOS+'/parasitosprueba/'+$scope.pruebapar.pl_id).success(function(respuesta){
//           $scope.pruebaparasitos = respuesta.pruebaparasito;
//           console.log('parasito_agregado', $scope.pruebapar.pl_id);
//       });
//   }
  
// }





