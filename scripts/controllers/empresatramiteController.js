'use strict';
angular.module("adminApp")

.controller('EmpresaTramiteCtrl', ['CONFIG',/*'authUser',*/'$scope','Funcionarios','$route','$routeParams','toastr','$location',
  function (CONFIG,/*authUser,*/$scope,Funcionarios,$route,$routeParams,toastr,$location){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Trámites',
      items:[
        {nombre:'Tramites Certificado', enlace:'#/tramites-cer', estilo:'active'},
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


.controller('BuscarPropietarioCtrl', ['$scope', '$http', 'moment', 'BuscarPropietario', 'EmpresaTramite', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', 'CONFIG', function ($scope, $http, moment, BuscarPropietario, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
    $scope.ajustes = {
      menu:{
        titulo: 'Búsqueda de Establecimiento',
        items:[
          {nombre:'Funcionarios', enlace:'#/funcionarios', estilo:'active'},
          {nombre:'Registrar funcionario', enlace:'#/funcionarios/createFun', estilo:''},
          {nombre:'Buscar Persona', enlace:'#/funcionarios/createfo', estilo:''}]
      },
      pagina:{
        titulo:'Búsqueda de Establecimiento'
      }
    }
    $scope.buscar=function () {
      console.log('parametro---------', $scope.parametro);
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/buscarpropietario/'+$scope.parametro).success(function (respuesta) {
        $scope.personas=respuesta.persona;
        console.log('persona---------', $scope.personas);
        if(respuesta.persona.length<=0){
            $scope.ver=false;
            $scope.resultado=" No se encuentra resultados";              
        } else if(respuesta.persona.length>0){
            $scope.ver=true;
            $scope.resultado='';
        }
      })
    }
    // var fconcluido=new Date(DD-MM-YY);
    // var today=new Date(YYYY-MM-DD);
    // 
    function restaFechas(f1,f2)
     {
     var aFecha1 = f1.split('/'); 
     var aFecha2 = f2.split('/'); 
     var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
     var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
     var dif = fFecha2 - fFecha1;
     var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
     return dias;
     }

    $scope.boleta =function (persona) {

      var emptr={
                ess_id:persona.ess_id,
                fun_id:1, /*-------------------------por defecto debe guardar de la sesion*/
                et_tipo_tramite:'RENOVACION'
              };

      if(!persona.et_vigencia_documento|| persona.et_estado_tramite !='APROBADO')
      {
        $timeout(function() {
            $location.path('/boleta-ces/'+persona.et_id);
        },1000);
      }
      if (persona.et_estado_pago=='VENCIDO') {
        EmpresaTramite.save(emptr).promise.then(function (argument) {
          console.log('et_id------', argument.et_id);
          if (argument.msg) {
            $timeout(function() {
                $location.path('/boleta-ces/'+argument.et_id);
            },1000);
          }
        });
      }
        var today= moment().format('DD/MM/YYYY');
        var vigencia=moment(persona.et_vigencia_documento).format('DD/MM/YYYY');
        var c=restaFechas(today,vigencia);
        console.log('haber----',c);

      if(persona.et_estado_tramite=='APROBADO'&& c<=30)
      {   
        
          EmpresaTramite.save(emptr).promise.then(function (argument) {
            console.log('et_id------', argument.et_id);
            if (argument.msg) {
              $timeout(function() {
                  $location.path('/boleta-ces/'+argument.et_id);
              },1000);
            }
          })
      }
      if(persona.et_estado_tramite=='APROBADO'&& c>=30)
      {
        toastr.error('El docuemnto aún se encuentra en vigencia');
      }
    }
}])


/*$scope.buscaPersona = function(){
    console.log('esta buscando persona');
      $scope.resultado="Cargando...";
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/personas_ci/'+$scope.per_ci).success(function(respuesta){
          $scope.persona = respuesta.persona;
          if(!respuesta.persona){
              $scope.ver=false;
              $scope.resultado=" La persona no se encuentra registrada";              
          } else if(respuesta.persona){
              $scope.ver=true;
              $scope.resultado='';
          }  
      });
  }*/

  //lista tramites propietarios naturales
.controller('ListNatCtrl', ['$scope', 'ListN', '$route', 'toastr', '$location', function ($scope, ListN, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites-car', estilo:'active'},
        {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites-car', estilo:''},
        {nombre:'Busqueda de personas registradas', enlace:'#/tramite/crear', estilo:''}]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }


  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  
  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  ListN.get( function(data){
    console.log('*******empresa_tramite ---------', data);
    $scope.empresa_tramite = data.empresa_tramite;
 
    if(data.empresa_tramite.length>0){
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

 //lista tramites propietarios naturales
.controller('ListJurCtrl', ['$scope', 'ListJ', '$route', 'toastr', '$location', function ($scope, ListJ, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites-car', estilo:'active'},
        {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites-car', estilo:''},
        {nombre:'Busqueda de personas registradas', enlace:'#/tramite/crear', estilo:''}]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }


  
  $scope.sortType = 'et_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  
  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  ListJ.get( function(data){
    console.log('*******empresa_tramite ---------', data);
    $scope.empresa_tramite = data.empresa_tramite;
 
    if(data.empresa_tramite.length>0){
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

.controller('BoletaCesCtrl', ['$scope', '$http', 'EmpTra', 'Tramite','PagoPendienteTramite', 'PagoPendiente', 'EmpresaTramite', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', 'CONFIG', function ($scope, $http,EmpTra, Tramite, PagoPendienteTramite, PagoPendiente, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
  $scope.ajustes = {
    menu:{
      titulo: 'Búsqueda de Establecimiento',
      items:[
        {nombre:'Funcionarios', enlace:'#/funcionarios', estilo:'active'},
        {nombre:'Registrar funcionario', enlace:'#/funcionarios/createFun', estilo:''},
        {nombre:'Buscar Persona', enlace:'#/funcionarios/createfo', estilo:''}]
    },
    pagina:{
      titulo:'Boleta de pago Formulario N° 1'
    }
  }

  var et_id=$routeParams.et_id;

  EmpTra.get({et_id:et_id}, function (argument) {
    console.log('argument-------', argument);
    $scope.establecimiento=argument.establecimiento;
  })
  Tramite.get(function(data){
  $scope.tramite = data.tramites;
  console.log("tramite del get",$scope.tramite);
    $scope.monto = function(costo){
        $scope.persona_tramite.pt_monto=costo;  
    }
  })
  $scope.verpagos=function (tra_id) {
    if (tra_id==2) {
        
        $scope.verdeudas=true;
        PagoPendienteTramite.get({et_id:et_id}, function (argument) {
          console.log('argument-------', argument);
          if (argument.pagop.length<=0) {
            $scope.verdeudas=false;
          }
          else{
            $scope.pagop=argument.pagop;
          }
        })
    }
    
  }
  $scope.save=function (pp_id) {
    var today=moment().format('DD-MM-YYYY');
    var ppendiente={
            fun_id:1,/*-------debe recoger de la sesion*/
            pp_estado_pago:'CANCELADO',
            pp_fecha_pagado: today,
        };

    PagoPendiente.update(ppendiente,{pp_id:pp_id}, function (argument) {
/*      if(argument.mesaje){
      }else{
        toastr.error('Error al registrar pago');
      }*/
        toastr.success('Pago registrado exitosamente');
      console.log('pagop', argument);
    })

    var emptramite={
      fun_id:1,/*----------------debe recoger de la sesion*/
      et_estado_pago:'PAGADO',
      et_estado_tramite:'INICIADO',
    };
    EmpresaTramite.update(emptramite, {et_id:et_id}, function (data) {
      /*if(data.mesaje){
      }else{
        toastr.error('Error al registrar pago');
      }*/
        toastr.success('Pago registrado exitosamente');
      console.log('empt', data);
    })


  }


}])

