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

      if (persona.et_estado_pago=='VENCIDO') {
        EmpresaTramite.save(emptr).promise.then(function (argument) {
          console.log('et_id------', argument.et_id);
          if (argument.msg) {
            toastr.success('Generando nuevo trámite');
            $timeout(function() {
                $location.path('/boleta-ces/'+argument.et_id);
            },1000);
          }
        });
      }
      if(!persona.et_vigencia_documento|| persona.et_estado_tramite !='APROBADO')
      {
        $timeout(function() {
            $location.path('/boleta-ces/'+persona.et_id);
        },1000);
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
              toastr.success('Generando nuevo trámite');
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

 



.controller('ListaValidadosCtrl', ['$scope', '$http', 'moment', 'ListaEmpTraEtapaEstado', 'EmpresaTramite', '$route', '$resource','$routeParams', 'toastr', '$location', '$timeout','CONFIG', function ($scope, $http, moment, ListaEmpTraEtapaEstado, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
 $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if ($scope.user.rol_id == 16) {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos validados',
      items:[
      {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:'active'},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:''}
       /*{nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},*/
      ]
    },
    pagina:{
      titulo:'Establecimientos Validados'
    }
  }
  } else {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos validados',
      items:[
       {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:'active'},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:''},
        {nombre:'Establecimientos que cancelaron', enlace:'#/lista-cancelaron', estilo:''},
       
        {nombre:'Esablecimientos que cancelaron naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Esablecimientos que cancelaron Juridicos', enlace:'#/tramites_certiJ', estilo:''}]
    },
    pagina:{
      titulo:'Establecimientos Validados'
    }
  }
  }



    $scope.sortType = 'te_fecha'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
    $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
    $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
    var condiciones={
      eta_id:1,
      te_estado:'APROBADO'

    }
  ListaEmpTraEtapaEstado.get(condiciones, function (argument) {
      $scope.establecimientos = argument.empresa_tramite;
      console.log('establecimientos', $scope.establecimientos);

      angular.forEach($scope.establecimientos, function(value, key){
            console.log( 'fecha:',value.te_fecha);
            value.te_fecha=moment(value.te_fecha,"YYYY-MM-DD").format("DD-MM-YYYY");
         });
    //PARA HACER UN LOADING EN EL TEMPLATE  
    if(argument.status){
        $scope.loading = false;
        $scope.msg = argument.status;
      }
    }); 
  



}])



.controller('ListaInspeccionadosCtrl', ['$scope', '$http', 'moment', 'ListaEmpTraEtapaEstado', 'EmpresaTramite', '$route', '$resource','$routeParams', 'toastr', '$location', '$timeout','CONFIG', function ($scope, $http, moment, ListaEmpTraEtapaEstado, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
 $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if ($scope.user.rol_id == 16) {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos inspeccionados',
      items:[
      {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:''},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:'active'}
      /* {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},*/
     ]
    },
    pagina:{
      titulo:'Establecimientos inspeccionados'
    }
  }
  } else {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos inspeccionados',
      items:[
       {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:''},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:'active'},
        {nombre:'Establecimientos que cancelaron', enlace:'#/lista-cancelaron', estilo:''},
        {nombre:'Esablecimientos que cancelaron naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Esablecimientos que cancelaron Juridicos', enlace:'#/tramites_certiJ', estilo:''}]
    },
    pagina:{
      titulo:'Establecimientos inspeccionados'
    }
  }
  }



    $scope.sortType = 'te_fecha'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
    $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
    $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
    var condiciones={
      eta_id:2,
      te_estado:'APROBADO'

    }
  ListaEmpTraEtapaEstado.get(condiciones, function (argument) {
      $scope.establecimientos = argument.empresa_tramite;
      console.log('establecimientos', $scope.establecimientos);

      angular.forEach($scope.establecimientos, function(value, key){
            console.log( 'fecha:',value.te_fecha);
            value.te_fecha=moment(value.te_fecha,"YYYY-MM-DD").format("DD-MM-YYYY");
         });
    //PARA HACER UN LOADING EN EL TEMPLATE  
    if(argument.status){
        $scope.loading = false;
        $scope.msg = argument.status;
      }
    }); 
  



}])


.controller('ListaCancelaronCtrl', ['$scope', '$http', 'moment', 'ListaEmpTraEtapaEstado', 'EmpresaTramite', '$route', '$resource','$routeParams', 'toastr', '$location', '$timeout','CONFIG','EstabSols', function ($scope, $http, moment, ListaEmpTraEtapaEstado, EmpresaTramite, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG,EstabSols) {
 $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if ($scope.user.rol_id == 16) {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos que pagaron arancel',
      items:[
      {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:''},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:''},
        {nombre:'Establecimientos que cancelaron', enlace:'#/lista-cancelaron', estilo:'active'}
      /* {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},*/
     ]
    },
    pagina:{
      titulo:'Establecimientos que pagaron arancel'
    }
  }
  } else {
    $scope.ajustes = {
    menu:{
      titulo: 'Lista de establecimientos que pagaron arancel',
      items:[
       {nombre:'Establecimientos validados', enlace:'#/lista-validacion', estilo:''},
        {nombre:'Establecimientos inspeccionados', enlace:'#/lista-inspeccionados', estilo:''},
        {nombre:'Establecimientos que cancelaron', enlace:'#/lista-cancelaron', estilo:'active'}/*,
        {nombre:'Esablecimientos que cancelaron naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Esablecimientos que cancelaron Juridicos', enlace:'#/tramites_certiJ', estilo:''}*/]
    },
    pagina:{
      titulo:'Establecimientos que pagaron arancel'
    }
  }
  }



    $scope.sortType = 'te_fecha'; // ESTABLECIENDO EL TIPO DE ORDENAMIENTO
    $scope.sortReverse  = true;  // PARA ORDENAR ASCENDENTEMENTO O DESCENDENTEMENTE
    $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
    var condiciones={
      eta_id:3,
      te_estado:'APROBADO'

    }
  ListaEmpTraEtapaEstado.get(condiciones, function (argument) {
      $scope.establecimientos = argument.empresa_tramite;
      console.log('establecimientos', $scope.establecimientos);

      angular.forEach($scope.establecimientos, function(value, key){
            console.log( 'fecha:',value.te_fecha);
            value.te_fecha=moment(value.te_fecha,"YYYY-MM-DD").format("DD-MM-YYYY");
         });
    //PARA HACER UN LOADING EN EL TEMPLATE  
    if(argument.status){
        $scope.loading = false;
        $scope.msg = argument.status;
      }

    var id = 0;
    var ci=0;
    $scope.rec=function(et_id, per_id){

    id=et_id;
    EstabSols.get({ess_id:per_id}, function(data){
            $scope.persona = data.establecimiento;
            console.log("para ver est___",$scope.persona);
            $scope.nombre=$scope.persona.est_sol.ess_razon_social;
            //console.log("GUARDANDO DATOS DE PERSONA EN LOCALSTORAGE",persona)
  
          });

    /*Personas.get({per_id:per_id}, function(data)
      {
        $scope.persona = data.persona;
        $scope.nombre=$scope.persona.persona.per_nombres+' '+$scope.persona.persona.per_apellido_primero+' '+$scope.persona.persona.per_apellido_segundo;
        ci=$scope.persona.persona.per_ci;
      });*/
  

    var q=6;

    
     $scope.datos={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos2={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos3={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos4={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    
  }; 






    }); 
  



}])
 //lista tramites propietarios naturales etapa 3=aprobada arancel
.controller('ListNatCtrl', ['$scope','CONFIG', 'ListN', '$route', 'toastr', '$location','Personas','FirmaFun','EmpTra','CertificadoSanitario','Firm2','Firm3','BusCert','Prueba','wen','VerEs', function ($scope,CONFIG, ListN, $route, toastr,$location,Personas,FirmaFun,EmpTra,CertificadoSanitario,Firm2,Firm3,BusCert,Prueba,wen,VerEs)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
        {nombre:'Esablecimientos que cancelaron naturales', enlace:'#/tramites_certi', estilo:'active'},
        {nombre:'Esablecimientos que cancelaron Juridicos', enlace:'#/tramites_certiJ', estilo:''},
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

    id=et_id;
    Personas.get({per_id:per_id}, function(data)
      {
        $scope.persona = data.persona;
        $scope.nombre=$scope.persona.persona.per_nombres+' '+$scope.persona.persona.per_apellido_primero+' '+$scope.persona.persona.per_apellido_segundo;
        ci=$scope.persona.persona.per_ci;
      });
  
    $scope.pruebas={
      fun_id:1,         
      te_estado:'ok',
      te_observacion:'NINGUNA',
      te_fecha:'8-1-2018'
    };
    var q=6;
    console.log("antes de update__",$scope.pruebas)
    
     $scope.datos={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos2={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos3={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos4={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    
  }; 


  $scope.recepcionar1=function(obs){
    VerEs.get({et_id:id,eta_id:3}, function(data){
      $scope.estado3 =data.tramitecerestado;
      if ($scope.estado3.te_estado=='APROBADO') { 
        VerEs.get({et_id:id,eta_id:4}, function(data){
      $scope.estado4 =data.tramitecerestado;
      if ($scope.estado4.te_estado!='APROBADO') {

    if (obs!='NINGUNA') {
      $scope.datos={
          fun_id:fun_id,
          te_estado:'OBSERVADO',
          te_observacion:obs,
          te_fecha:fecha
      }
      console.log("observado",obs);
    } else {
        $scope.datos={
            fun_id:fun_id,
            te_estado:'APROBADO',
            te_observacion:'NINGUNA',
            te_fecha:fecha
        }
        console.log("No observado");
    }
    
    console.log('el et_id para cambiar estado',id);
    Prueba.update({et_id:id,eta_id:4}, $scope.datos).$promise.then(function(data)
    {
      if(data.status)
      {
          console.log("lo logro...",data);
          toastr.success('Guardado correctamente');
        if ($scope.datos.te_observacion=='NINGUNA') {
          FirmaFun.get({fun_id:fun_id}, function(data)
          {
            $scope.firmas=data.firma;
            $scope.fir=data.firma;
            console.log("obteniendo la firma del fucnionario logueado", $scope.firmas);
            console.log("__el ci de la persona__",ci);
            $scope.certificado={
                et_id:id,
                ces_numero:ci,
                ces_fecha_inicio:fecha,
                ces_fecha_fin:fecha2,
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
         /* $route.reload();*/
         }
      }

    });//FIN TRAMITE ESTADO
     }
    else{
      toastr.error('Ya se aprobó este trámite');
    }
    });//estado 1
    }
    else{
      toastr.error('Aun no se realizó pago de arancel');
    }
    });//estado 33
  };

  
  $scope.recepcionar2=function(obs){
VerEs.get({et_id:id,eta_id:5}, function(data){
      $scope.estado5 =data.tramitecerestado;
      if ($scope.estado5.te_estado!='APROBADO') {
    EmpTra.get({et_id:id}, function(data){
    /*console.log('*******empresa_tramite___recep 2 ---------', data);*/

    $scope.emp_tra = data.establecimiento;
   /* console.log('*******PARA VER EMPTRA---------', $scope.emp_tra);*/
      
    var b=4;
    VerEs.get({et_id:id,eta_id:b}, function(data){
      $scope.busca =data.tramitecerestado;
      console.log("hizo el get",$scope.busca.te_estado);
      if ($scope.busca.te_estado=='APROBADO') {
          if (obs!='NINGUNA') {
            $scope.datos2={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:obs,
                te_fecha:fecha
            };
            console.log("observado",obs);
          } else {
              $scope.datos2={
                  fun_id:fun_id,
                  te_estado:'APROBADO',
                  te_observacion:'NINGUNA',
                  te_fecha:fecha
              };
            console.log("No observado");
            }
          BusCert.get({et_id:id}, function(data){
          /*console.log('__BUSCAR CERTIFICADO__', data);*/
          $scope.certificado = data.certificado;
         /* console.log('el et_id para cambiar estado',id);*/
          Prueba.update({et_id:id,eta_id:5}, $scope.datos2).$promise.then(function(data)
          {
              console.log("entra a update")

          /*wen.get({et_id:1,eta_id:5}, function(data){
            $scope.busca =data.tramitecerestado;
            console.log("hizo el get",$scope.busca);
            
          });*/
          /*Aprob2.update({et_id:id}, $scope.datos2).$promise.then(function(data)
          {*/
            console.log("entra a update")
            if(data.status)
            {
                console.log("lo logro...");
                toastr.success('Aprobacion correcta');
                //tengo que obtener la firma del funcionario que se logueo y guardar en carnet recien
                console.log("PARA VER LA FIRMA", fun_id);
                if ($scope.datos2.te_observacion=='NINGUNA') {
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
              }
                $route.reload();
            }

          });//FIN TRAMITE ESTADO
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
       });
    });//fin emptra 
}
    else{
      toastr.error('Ya se aprobó este trámite');
    }
    });//estado 1
  };


  $scope.recepcionar4=function(obs){
VerEs.get({et_id:id,eta_id:6}, function(data){
      $scope.estado6 =data.tramitecerestado;
      if ($scope.estado6.te_estado!='APROBADO') {
    EmpTra.get({et_id:id}, function(data){
    $scope.emp_tra = data.establecimiento;
    var b=5;
    VerEs.get({et_id:id,eta_id:b}, function(data){
      $scope.busca =data.tramitecerestado;

      if ($scope.busca.te_estado=='APROBADO') {
          if (obs!='NINGUNA') {
            $scope.datos4={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:obs,
                te_fecha:fecha
            };
            console.log("observado",obs);
          } else {
              $scope.datos4={
                  fun_id:fun_id,
                  te_estado:'APROBADO',
                  te_observacion:'NINGUNA',
                  te_fecha:fecha
              };
            console.log("No observado");
            };
            var d=6;
          Prueba.update({et_id:id,eta_id:d}, $scope.datos4).$promise.then(function(data)
          {
            console.log("entra a update___________________________")
            if(data.status)
            {
                console.log("lo logro...");
                toastr.success('Aprobacion correcta');
                //tengo que obtener la firma del funcionario que se logueo y guardar en carnet recien
                
                $route.reload();
            }

          });//FIN TRAMITE ESTADO
      //fin de busca certificado
  
//FIN DEL IF
    } else {
      toastr.error('ANTES DEBE APROBAR EL JEFE DE UNIDAD ');
    }
//fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
       });
    });//fin emptra 
}
    else{
      toastr.error('Ya se aprobó este trámite');
    }
    });//estado 4
  };






    $scope.recepcionar3=function(obs){
VerEs.get({et_id:id,eta_id:6}, function(data){
      $scope.estadoq =data.tramitecerestado;
      if ($scope.estadoq.te_estado!='APROBADO') {
    EmpTra.get({et_id:id}, function(data){
    /*console.log('*******empresa_tramite ---------', data);*/
    $scope.emp_tra = data.establecimiento;
    console.log('*******PARA VER EMPTRA---------', $scope.emp_tra);
    var b=5;
    VerEs.get({et_id:id,eta_id:b}, function(data){
      $scope.busca =data.tramitecerestado;
      console.log("hizo el get",$scope.busca.te_estado);
      if ($scope.busca.te_estado=='APROBADO') {
          if (obs!='NINGUNA') {
            $scope.datos3={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:obs,
                te_fecha:fecha
            };
            console.log("observado",obs);
          } else {
              $scope.datos3={
                  fun_id:fun_id,
                  te_estado:'APROBADO',
                  te_observacion:'NINGUNA',
                  te_fecha:fecha
              };
            console.log("No observado");
            }
          BusCert.get({et_id:id}, function(data){
              console.log('__BUSCAR CERTIFICADO__', data);
              $scope.certificadoFI = data.certificado;

              console.log('el et_id para cambiar estado',id);
          Prueba.update({et_id:id,eta_id:7}, $scope.datos3).$promise.then(function(data)
          {
              console.log("entra a update")

   /* Aprob3.update({et_id:id}, $scope.estado3).$promise.then(function(data)
    {*/
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

    });//FIN TRAMITE ESTADO
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
  });//fin de ver estado
//fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    });//fin emptra 
}
    else{
      toastr.error('Ya se aprobó este trámite');
    }
    });//estado 4
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
/*
  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }*/
}])

 //lista tramites propietarios juridicos etapa 3=aprobada arancel
.controller('ListJurCtrl', ['$scope', 'ListJ', '$route', 'toastr', '$location','CONFIG','FirmaFun','EmpTra','CertificadoSanitario','Firm2','Firm3','BusCert','Prueba','VerEs', function ($scope, ListJ, $route, toastr,$location,CONFIG,FirmaFun,EmpTra,CertificadoSanitario,Firm2,Firm3,BusCert,Prueba,VerEs)
{//en este caso el rec debe ver al propietario juridico
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Certificado Sanitario',
      items:[
       {nombre:'Esablecimientos que cancelaron naturales', enlace:'#/tramites_certi', estilo:''},
        {nombre:'Esablecimientos que cancelaron Juridicos', enlace:'#/tramites_certiJ', estilo:'active'},
        {nombre:'Busqueda de personas registradas', enlace:'#/buscar-propietario', estilo:''}]
    },
    pagina:{
      titulo:'Tramites de Certificado Sanitario'
    }
  }

  $scope.sortType = 'et_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

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

     var id = 0;
    var ci=0;
    $scope.rec=function(et_id, pjur_razon_social){
    console.log("LLEGA A LA FUNCION",et_id);
    id=et_id;
    $scope.nombre=pjur_razon_social;
/*    Personas.get({per_id:per_id}, function(data)
      {
        $scope.persona = data.persona;
        $scope.nombre=$scope.persona.persona.per_nombres+' '+$scope.persona.persona.per_apellido_primero+' '+$scope.persona.persona.per_apellido_segundo;
        ci=$scope.persona.persona.per_ci;
      });*/  
     $scope.datos={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos2={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos3={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    };
    $scope.datos4={
      fun_id:null,         
      te_estado:'',
      te_observacion:'NINGUNA',
      te_fecha:''
    }; 
  }; 

  $scope.recepcionar1=function(obs){
    VerEs.get({et_id:id,eta_id:3}, function(data){
      $scope.estado3 =data.tramitecerestado;
      if ($scope.estado3.te_estado=='APROBADO') {
          VerEs.get({et_id:id,eta_id:4}, function(data){
              $scope.vert =data.tramitecerestado;
              if ($scope.vert.te_estado!='APROBADO') {
                if (obs!='NINGUNA') {
                    $scope.datos={
                        fun_id:fun_id,
                        te_estado:'OBSERVADO',
                        te_observacion:obs,
                        te_fecha:fecha
                    }
                    console.log("observado",obs);
                } else {
                    $scope.datos={
                        fun_id:fun_id,
                        te_estado:'APROBADO',
                        te_observacion:'NINGUNA',
                        te_fecha:fecha
                    }
                    console.log("No observado");
                }
                Prueba.update({et_id:id,eta_id:4}, $scope.datos).$promise.then(function(data)
                {
                    console.log("entra a update")
                    if(data.status)
                    {
                        console.log("lo logro...",data);
                        toastr.success('Se aprobo trámite');
                        if ($scope.datos.te_observacion == 'NINGUNA') {
                            FirmaFun.get({fun_id:fun_id} ,function(data)
                            {
                                $scope.firmas=data.firma;
                                $scope.fir=data.firma;
                                console.log("obteniendo la firma del fucnionario logueado", $scope.firmas);
                                //      console.log("__el ci de la persona__",ci);
                                $scope.certificado={
                                    et_id:id,
                                    ces_numero:1234567,
                                    ces_fecha_inicio:'2-1-2018',
                                    ces_fecha_fin:'2-1-2019',
                                    ces_fir_url1:$scope.firmas.firma.fir_url,
                                    ces_fir_nombre1:$scope.firmas.firma.fir_name
                                };   
                                CertificadoSanitario.save($scope.certificado).$promise.then(function(data)
                                {
                                    if(data.msg){
                                        angular.copy({}, $scope.certificado);
                                        console.log("Se registro certificado correctamente",data);
                                    }

                                });//fin carnetsanitario
                            } );//FIN DE FIRMAFUNCIONARIO
                            // $route.reload();
                        }
                    }

                });//FIN prueba
              }
              else{
                toastr.error('Ya se aprobo este trámite');
              }
          });//fin de ver estado
    }
    else{
      toastr.error('Aun no se realizó pago de arancel');
    }
    });//estado 33
  };

    $scope.recepcionar2=function(obs){
      VerEs.get({et_id:id,eta_id:5}, function(data){
          $scope.vert =data.tramitecerestado;
          if ($scope.vert.te_estado!='APROBADO') {
          EmpTra.get({et_id:id}, function(data){
          $scope.emp_tra = data.establecimiento;
          var b=4;
          VerEs.get({et_id:id,eta_id:b}, function(data){
            $scope.busca =data.tramitecerestado;
            console.log("hizo el get",$scope.busca.te_estado);
            if ($scope.busca.te_estado=='APROBADO') {
                if (obs!='NINGUNA') {
                  $scope.datos2={
                      fun_id:fun_id,
                      te_estado:'OBSERVADO',
                      te_observacion:obs,
                      te_fecha:fecha
                  };

                } else {
                    $scope.datos2={
                        fun_id:fun_id,
                        te_estado:'APROBADO',
                        te_observacion:'NINGUNA',
                        te_fecha:fecha
                    };

                  }
              BusCert.get({et_id:id}, function(data){
              $scope.certificado = data.certificado;      
              Prueba.update({et_id:id,eta_id:5}, $scope.datos2).$promise.then(function(data)
              {
                if(data.status)
                {
              
                    toastr.success('Se aprobo el trámite correctamente');

                    if ($scope.datos2.te_observacion=='NINGUNA') {
                    FirmaFun.get({fun_id:fun_id}, function(data)
                    {
                      $scope.firmas=data.firma;
                      $scope.fir=data.firma;
                      
                      $scope.certificado2={
                          ces_fir_url2:$scope.firmas.firma.fir_url,
                          ces_fir_nombre2:$scope.firmas.firma.fir_name
                      }
                     
                      Firm2.update({ces_id:$scope.certificado.ces_id},$scope.certificado2).$promise.then(function(data)
                      {
                         if(data.msg){
                          angular.copy({}, $scope.certificado2);
                         
                          }

                      });//fin carnetsanitario
                         
                    } );//FIN DE FIRMAFUNCIONARIO
                  }
                   /* $route.reload();*/
                }

              });//FIN TRAMITE ESTADO
          
          //fin de busca certificado
            },function () {
          toastr.error("ERROR INESPERADO, por favor actualize la página");
          $scope.loading = false;
          $scope.msg = false;

       });//fin de busca certificado
//FIN DEL IF
      } else {
        toastr.error('Antes debe aprobar el responsable de certificado');
      }
      //fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
       });
    });//fin emptra 
  }//fin if
           else{
              toastr.error('Ya se aprobo este trámite');
            }
      });//fin de ver tramitecer


  };


  $scope.recepcionar4=function(obs){

    EmpTra.get({et_id:id}, function(data){
    $scope.emp_tra = data.establecimiento;
    var b=5;
    VerEs.get({et_id:id,eta_id:b}, function(data){
      $scope.busca =data.tramitecerestado;
      console.log("hizo el get de recep 4",$scope.busca.te_estado);
      if ($scope.busca.te_estado=='APROBADO') {
          if (obs!='NINGUNA') {
            $scope.datos4={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:obs,
                te_fecha:fecha
            };
            console.log("observado",obs);
          } else {
              $scope.datos4={
                  fun_id:fun_id,
                  te_estado:'APROBADO',
                  te_observacion:'NINGUNA',
                  te_fecha:fecha
              };
            console.log("No observado");
            };
          VerEs.get({et_id:id,eta_id:6}, function(data){
          $scope.vert =data.tramitecerestado;
          if ($scope.vert.te_estado!='APROBADO') {
            var d=6;
          Prueba.update({et_id:id,eta_id:d}, $scope.datos4).$promise.then(function(data)
          {
            if(data.status)
            {
                toastr.success('Se aprobo el trámite correctamente');
              /*
                $route.reload();*/
            }

          });//FIN TRAMITE ESTADO
        }
        else{
          toastr.error('Ya se aprobo este trámite');
        }
});//fin de ver tramitecer
      //fin de busca certificado
  
//FIN DEL IF
    } else {
      toastr.error('Antes debe aprobar el Jefe de Unidad');
    }
//fin de emptra 
        },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
       });
    });//fin emptra 

  };





    $scope.recepcionar3=function(obs){
      VerEs.get({et_id:id,eta_id:7}, function(data){
          $scope.vert =data.tramitecerestado;
          console.log("wwwwwwwwwwwww",$scope.vert.te_estado);
          if ($scope.vert.te_estado!='APROBADO') {
        EmpTra.get({et_id:id}, function(data){
        $scope.emp_tra = data.establecimiento;
        var b=6;
        VerEs.get({et_id:id,eta_id:b}, function(data){
            $scope.busca =data.tramitecerestado;
            if ($scope.busca.te_estado=='APROBADO') {
                if (obs!='NINGUNA') {
                  $scope.datos3={
                      fun_id:fun_id,
                      te_estado:'OBSERVADO',
                      te_observacion:obs,
                      te_fecha:fecha
                  };
                  console.log("observado",obs);
            } else {
                    $scope.datos3={
                        fun_id:fun_id,
                        te_estado:'APROBADO',
                        te_observacion:'NINGUNA',
                        te_fecha:fecha
                    };
                  console.log("No observado");
            }
            BusCert.get({et_id:id}, function(data){
                $scope.certificadoFI = data.certificado;
               /*if($scope.certificadoFI.ces_fir_nombre3 ==null)
               {*/
                Prueba.update({et_id:id,eta_id:7}, $scope.datos3).$promise.then(function(data)
                {
                   if(data.status)
                   {
                        toastr.success('Se aprobo el trámite correctamente');
                /*console.log("PARA VER LA FIRMA", fun_id)*/;
                        FirmaFun.get({fun_id:fun_id}, function(data)
                        {
                            $scope.firmas=data.firma;
                            $scope.fir=data.firma;
                            $scope.certificado3={
                                ces_fir_url3:$scope.firmas.firma.fir_url,
                                ces_fir_nombre3:$scope.firmas.firma.fir_name
                            }
                            Firm3.update({ces_id:$scope.certificadoFI.ces_id},$scope.certificado3).$promise.then(function(data)
                            {
                                 if(data.msg){
                                  angular.copy({}, $scope.certificado3);
                          
                                  }

                            });//fin de firma3
                        } );//FIN DE FIRMAFUNCIONARIO
            /*$route.reload();*/
                    }
                 });//FIN prueba
     
      //fin de busca certificado
              },function () {
                toastr.error("ERROR INESPERADO, por favor actualize la página");
                $scope.loading = false;
                $scope.msg = false;
              });//fin de busca certificado

              //FIN DEL IF de aprobado anterior
                  } else {
                    toastr.error('Antes debe aprobar Tesoreria');
                  }
        });//fin de ver estado
        //fin de emptra 
        },function () {
              toastr.error("ERROR INESPERADO, por favor actualize la página");
              $scope.loading = false;
              $scope.msg = false;
            });//fin emptra 
}
      else{
        toastr.error("Ya se aprobo este trámite");
      }
//fin de ver estao
});



  };
   



  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 


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

.controller('VerEmpresaCtrl', ['CONFIG', 'authUser','$scope','EstabSols','Funcionario', '$routeParams', '$location', '$timeout',
  function (CONFIG, authUser,$scope, EstabSols, Funcionario, $routeParams, $location, $timeout){
  /*if(authUser.isLoggedIn()){*/

    if(CONFIG.ROL_CURRENT_USER == 1)
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Empresas Solicitantes',
          items:[
            {nombre:'Propietarios Naturales', enlace:'#/tramites_certi', estilo:''},
            {nombre:'Propietarios Juridicos', enlace:'#/tramites_certiJ', estilo:''}/*,
            {nombre:'Nuevo Establecimiento', enlace:'#/establecimientos/create', estilo:''},
            {nombre:'Establecimientos por Red', enlace:'#/red/establecimientos', estilo:''}*/]
        },
        pagina:{
          titulo:'Información General del Establecimiento'
        }
      }
    }
   /* else if(CONFIG.ROL_CURRENT_USER == 2 || CONFIG.ROL_CURRENT_USER == 9){
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión del Establecimiento de Salud',
          items:[
            {nombre:'Establecimiento', enlace:'#/establecimientos/ver', estilo:'active'},
            {nombre:'Editar Establecimiento', enlace:'#/establecimientos/edit', estilo:''}]
        },
        pagina:{
          titulo:'Información General del Establecimiento'
        }
      }
    }
    else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión del Establecimiento de Salud',
          items:[
            {nombre:'Establecimiento', enlace:'#/establecimientos/ver', estilo:'active'}]
        },
        pagina:{
          titulo:'Información General del Establecimiento'
        }
      }
    }*/
  /*  var es_id = 0;
    if(CONFIG.ROL_CURRENT_USER == 1)
    {
      es_id = $routeParams.es_id;
    }else{
      var FunG = localStorage.getItem("Funcionario");
      var FunG = JSON.parse(FunG);
      es_id = FunG.es_id;
    }*/
    var ess_id=$routeParams.ess_id;
    EstabSols.get({ess_id:ess_id}, function(data){
      $scope.establecimiento = data.establecimiento;
      if (Object.keys($scope.establecimiento.propietario).length==7) {
      $scope.propietario=$scope.establecimiento.propietario.pjur_razon_social;
      }
      if (Object.keys($scope.establecimiento.propietario).length==22) {
        $scope.propietario=$scope.establecimiento.propietario.per_nombres+' '+$scope.establecimiento.propietario.per_apellido_primero+' '+$scope.establecimiento.propietario.per_apellido_segundo;
      }
      
    });

    function toTime(timeString){
      var timeTokens = timeString.split(':');
      return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
    }

 /* } else {
    $location.path('/inicio');
  }*/
}])