'use strict';
angular.module("adminApp")

.controller('BuscarPropietarioCtrl', ['$scope', '$http', 'moment', 'BuscarPropietario', 'EmpresaTramite', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', 'CONFIG', function ($scope, $http, moment, BuscarPropietario, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
    $scope.ajustes = {
      menu:{
        titulo: 'Búsqueda de Establecimiento',
        items:[
        {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites_certiJ', estilo:''},
          {nombre:'Buscar empresa solicitante', enlace:'#/buscar-propietario', estilo:'active'}
          // {nombre:'Registrar pago', enlace:'#/boleta-ces/'+et_id, estilo:''},
        ]
      },
      pagina:{
        titulo:'Búsqueda de Establecimiento'
      }
    }

    var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
 var fun_id = FunG.fun_id;
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
                fun_id:fun_id, 
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
.controller('ListNatCtrl', ['$scope','CONFIG', 'ListN', '$route', 'toastr', '$location','Personas',/*'Aprob1','Aprob2','Aprob3',*/'FirmaFun','EmpTra','CertificadoSanitario','Firm2','Firm3','BusCert', function ($scope,CONFIG, ListN, $route, toastr,$location,Personas,/*Aprob1,Aprob2,Aprob3,*/FirmaFun,EmpTra,CertificadoSanitario,Firm2,Firm3,BusCert)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites_certi', estilo:'active'},
        {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites_certiJ', estilo:''},
        {nombre:'Busqueda de personas registradas', enlace:'#/buscar-propietario', estilo:''}]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }
  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;

  $scope.CurrentDate = new Date();
  var mes=$scope.CurrentDate.getMonth()+1;
  var fecha=$scope.CurrentDate.getDate()+"-"+mes+"-"+$scope.CurrentDate.getFullYear();
  var anio2=$scope.CurrentDate.getFullYear()+1;
  var fecha2=$scope.CurrentDate.getDate()+"-"+mes+"-"+anio2;
  console.log("__para la fecha CADUCIDAD__",fecha2);

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
    var id = 0;
    var ci=0;
    $scope.rec=function(et_id, per_id){
    console.log("LLEGA A LA FUNCION",et_id);
    id=et_id;
    Personas.get({per_id:per_id}, function(data)
      {
        $scope.persona = data.persona;
        $scope.nombre=$scope.persona.persona.per_nombres+' '+$scope.persona.persona.per_apellido_primero+' '+$scope.persona.persona.per_apellido_segundo;
        ci=$scope.persona.persona.per_ci;
      });
    
  }; 

  $scope.recepcionar1=function(){
    $scope.estado1={
      et_aprobacion1:'APROBADO'
    }
    console.log('el et_id para cambiar estado',id);
  /*  Aprob1.update({et_id:id}, $scope.estado1).$promise.then(function(data)
    {
      console.log("entra a update")
      if(data.status)
      {
          console.log("lo logro...",data);
          toastr.success('Aprobacion correcta');
        
          FirmaFun.get({fun_id:fun_id}, function(data)
          {
            $scope.firmas=data.firma;
            $scope.fir=data.firma;
            console.log("obteniendo la firma del fucnionario logueado", $scope.firmas);
            console.log("__el ci de la persona__",ci);
            $scope.certificado={
                et_id:id,
                ces_numero:1234567,
                ces_fecha_inicio:'2-1-2018',
                ces_fecha_fin:'2-1-2019',
                ces_fir_url1:$scope.firmas.firma.fir_url,
                ces_fir_nombre1:$scope.firmas.firma.fir_name
            }
            console.log("PARA GUARDAR EL certificado",$scope.certificado);
            CertificadoSanitario.save($scope.certificado).$promise.then(function(data)
            {
               if(data.msg){
                angular.copy({}, $scope.certificado);
                console.log("Se registro certificado correctamente",data);
              
              }

            });//fin carnetsanitario
            $scope.fir=$scope.firmas;
            console.log("__FIRMA__dentro",$scope.fir);    
          } );//FIN DE FIRMAFUNCIONARIO
          $route.reload();
      }

    });//FIN TRAMITE ESTADO
    console.log($scope.estado1);
    console.log("__FIRMA__Fuera",$scope.fir);*/ 
  };

    $scope.recepcionar2=function(){

    EmpTra.get({et_id:id}, function(data){
    console.log('*******empresa_tramite___recep 2 ---------', data);

    $scope.emp_tra = data.establecimiento;
    console.log('*******PARA VER EMPTRA---------', $scope.emp_tra);
      if ($scope.emp_tra.empresa_tramite.et_aprobacion1=='APROBADO') {
         $scope.estado2={
            et_aprobacion2:'APROBADO'
          }
          BusCert.get({et_id:id}, function(data){
          console.log('__BUSCAR CERTIFICADO__', data);
          $scope.certificado = data.certificado;

          console.log('el et_id para cambiar estado',id);
         /* Aprob2.update({et_id:id}, $scope.estado2).$promise.then(function(data)
          {
            console.log("entra a update")
            if(data.status)
            {
                console.log("lo logro...");
                toastr.success('Aprobacion correcta');
                //tengo que obtener la firma del funcionario que se logueo y guardar en carnet recien
                console.log("PARA VER LA FIRMA", fun_id);
                FirmaFun.get({fun_id:fun_id}, function(data)
                {
                  $scope.firmas=data.firma;
                  $scope.fir=data.firma;
                  console.log("obteniendo la firma del fucnionario loguaado", $scope.firmas);
                  $scope.certificado2={
                      ces_fir_url2:$scope.firmas.firma.fir_url,
                      ces_fir_nombre2:$scope.firmas.firma.fir_name
                  }
                  console.log("__DATOS DEL certificado",$scope.certificado2);
                  console.log("__PARA EDITAR EL CERTIFICADO_",$scope.certificado.ces_id);
                  Firm2.update({ces_id:$scope.certificado.ces_id},$scope.certificado2).$promise.then(function(data)
                  {
                     if(data.msg){
                      angular.copy({}, $scope.certificado2);
                      console.log("Se registro certificado correctamente",data);
                      }

                  });//fin carnetsanitario
                     
                } );//FIN DE FIRMAFUNCIONARIO
                $route.reload();
            }
          });//FIN TRAMITE ESTADO*/
      //fin de busca certificado
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin de busca certificado
      
//FIN DEL IF
    } else {
      toastr.error('ANTES DEBE APROBAR EL RESPONSABLE DE AREA');
    }
//fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin emptra 
  };
    $scope.recepcionar3=function(){

    EmpTra.get({et_id:id}, function(data){
    console.log('*******empresa_tramite ---------', data);

    $scope.emp_tra = data.establecimiento;
    console.log('*******PARA VER EMPTRA---------', $scope.emp_tra);
    if ($scope.emp_tra.empresa_tramite.et_aprobacion2=='APROBADO') {
    $scope.estado3={
      et_aprobacion3:'APROBADO'
    }
    BusCert.get({et_id:id}, function(data){
          console.log('__BUSCAR CERTIFICADO__', data);
          $scope.certificadoFI = data.certificado;

    console.log('el et_id para cambiar estado',id);
/*    Aprob3.update({et_id:id}, $scope.estado3).$promise.then(function(data)
    {
      console.log("entra a update")
      if(data.status)
      {
          console.log("lo logro...");
          toastr.success('Aprobacion correcta');
          console.log("PARA VER LA FIRMA", fun_id);
          FirmaFun.get({fun_id:fun_id}, function(data)
          {
            $scope.firmas=data.firma;
            $scope.fir=data.firma;
            console.log("obteniendo la firma del fucnionario loguaado", $scope.firmas);
            
             $scope.certificado3={
                ces_fir_url3:$scope.firmas.firma.fir_url,
                ces_fir_nombre3:$scope.firmas.firma.fir_name
              }
              console.log("PARA GUARDAR EL certificado",$scope.certificado3);
              console.log("__PARA EDITAR EL CERTIFICADO_",$scope.certificadoFI.ces_id);
              Firm3.update({ces_id:$scope.certificadoFI.ces_id},$scope.certificado3).$promise.then(function(data)
              {
                 if(data.msg){
                  angular.copy({}, $scope.certificado3);
                  console.log("Se registro certificado correctamente",data);
                  }

              });//fin carnetsanitario
   
          } );//FIN DE FIRMAFUNCIONARIO
          $route.reload();
      }

    });//FIN TRAMITE ESTADO*/
//fin de busca certificado
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin de busca certificado

//FIN DEL IF
    } else {
      toastr.error('ANTES DEBE APROBAR EL JEFE DE UNIDAD');
    }
//fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin emptra 

  };

//hasta aqui la lista de empresa tramite naturales
    },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin de la lista de emptra
  

  var idd=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    idd = per_id;
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

 //lista tramites propietarios juridicos
.controller('ListJurCtrl', ['$scope', 'ListJ', '$route', 'toastr', '$location', function ($scope, ListJ, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites_certiJ', estilo:'active'},
        {nombre:'Busqueda de personas registradas', enlace:'#/buscar-propietario', estilo:''}]
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
/*  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
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
  }*/
}])

//lista tramites propietarios naturales segun funcionario
.controller('NatInsCtrl', ['$scope', 'NatI', '$route', 'toastr', '$location', function ($scope, NatI, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:'active'},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''}/*,
        {nombre:'Busqueda de personas registradas', enlace:'#/tramite/crear', estilo:''}*/]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }
var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
 var fun_id = FunG.fun_id;

  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];
  $scope.loading=true;//para hacer un loading

  NatI.get({fun_id:fun_id}, function(data){
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


 //lista tramites propietarios Juridicos
.controller('JurInsCtrl', ['$scope', 'JurI', '$route', 'toastr', '$location', function ($scope, JurI, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:'active'}/*,
        {nombre:'Busqueda de personas registradas', enlace:'#/tramite/crear', estilo:''}*/]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  $scope.sortType = 'et_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  
  $scope.loading=true;//para hacer un loading

  JurI.get({fun_id:fun_id}, function(data){
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


