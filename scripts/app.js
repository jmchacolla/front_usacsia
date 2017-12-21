'use strict';
angular.module("adminApp", ["authService", "ngRoute", "ngResource", "satellizer", "toastr", "platypus.tabs", 'ngMap', 'vcRecaptcha','angular.filter'])
/*.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  console.log($httpProvider.interceptors);
})*/
.config(['$routeProvider', '$authProvider', 'CONFIG', 'ROLES', function ($routeProvider, $authProvider, CONFIG, ROLES){
  $authProvider.loginUrl = CONFIG.DOMINIO_SERVICIOS+'/login';
//$authProvider.signupUrl = CONFIG.DOMINIO_SERVICIOS+'/usuarios';

  $routeProvider
  // ======================================jhon===========================================================================
 
//persona_tramite lista para atender pacientes

.when('/atencion', {//--------medico
  templateUrl: 'templates/personatramite/atencion.html',
  controller: 'AtencionCtrl',
  /*    data: {
        authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
      }*/
})
//---ver carne sanitario ver por pt_id
.when('/carne-sanitario/:pt_id', {
  templateUrl: 'templates/carne/ver.html',
  controller: 'CarneSanitarioCtrl'
})
// crear prueba medica form registro de signos vitales
.when('/prueba-medica/:pt_id', {
  templateUrl: 'templates/pruebamedica/create.html',
  controller: 'PruebaMedicaCtrl'
})
// realizar los examenes prueba enfermedad
.when('/prueba-medica/prueba/:pm_id', {
  templateUrl: 'templates/pruebamedica/prueba.html',
  controller: 'PruebaEnfermedadCtrl'
})
//ver prueba medica por pm_id
.when('/prueba-medica/ver/:pm_id', {
  templateUrl: 'templates/pruebamedica/ver.html',
  controller: 'PruebaMedicaVerCtrl'
})
//historial clinico por ci
.when('/ficha-clinica/:per_ci', {
  templateUrl: 'templates/pruebamedica/ficha-clinica.html',
  controller: 'FichaClinicaCtrl'
})

//jhon==========================================================================






    // ========================= PAGINA PUBLICA  ============================================================================
  //pagina inicial de la aplicacion
  .when('/inicio', {
    templateUrl: 'templates/publico/index.html'
  })

//30-11-2017*****************WENDY*******************************
/************************************************PERSONA****************************************/
//8-12-17
.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  //Página de inicio de el usuario que inicio sesión
  .when('/', {
    templateUrl: 'templates/usuario/index.html', 
    controller: 'InicioCtrl'
  })
    .when('/persona/create', {
    templateUrl: 'templates/persona/crear.html',
    controller: 'CrearPersona2Ctrl'
   /* data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })

      .when('/personas', {
    templateUrl: 'templates/persona/index.html',
    controller: 'ListaPersonasCtrl',
 /*   data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })

   .when('/personas/ver/:per_id', {
    templateUrl: 'templates/persona/ver.html',
    controller: 'VerPersonaCtrl',
    // data: {
    //   authorized: [ROLES.ADMIN_SEDES.ROL]
    // }
  })
     .when('/personas/edit/:per_id', {
    templateUrl: 'templates/persona/edit.html',
    controller: 'EditPersonaCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
/******************************************funcionario**********************************/
    .when('/funcionarios', {  //lista a los funcionarios de un establecimiento
    templateUrl: 'templates/funcionario/funcionarios.html',
    controller: 'FuncionarioCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  .when('/funcionarios/ver/:fun_id', {
    templateUrl: 'templates/funcionario/ver.html',
    controller: 'VerFuncionarioCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })

  .when('/funcionarios/createFun', {
  /*  templateUrl: 'forms/funcionario/create_fun_per.html',*/
    templateUrl: 'templates/funcionario/create_fun_per.html',
    controller: 'CreateFuncionarioPersonaCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  //crar funcionario cuando ya existe la persona
    .when('/funcionarios/createfo', {
    templateUrl: 'templates/funcionario/create.html',
    controller: 'CreateFunCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
    //**********************REVISAR
  .when('/funcionarios/edit/:fun_id', {
    templateUrl: 'templates/funcionario/edit.html',
    controller: 'EditFuncionarioCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  /************************************CONSULTORIOS***********************************/
  .when('/consultorios', {//arreglar la ruta con establecimientos
    templateUrl: 'templates/consultorio/consultorios.html',
    controller: 'ListaConsultorioCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })

    .when('/consultorios/ver/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/consultorio/ver.html',
    controller: 'VerConsultorioCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })

    .when('/consultorios/create', {
    templateUrl: 'templates/consultorio/create.html',
    controller: 'CrearConsultorioCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  .when('/consultorios/edit/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/consultorio/edit.html',
    controller: 'EditConsultorioCtrl',
    /*data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
/***************************************************LABORATORIOS********************************/
   .when('/laboratorios', {//arreglar la ruta con establecimientos
    templateUrl: 'templates/laboratorio/laboratorios.html',
    controller: 'ListaLaboratorioCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  
.when('/laboratorios/ver/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/laboratorio/ver.html',
    controller: 'VerLaboratorioCtrl',
  /*  data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
    .when('/laboratorios/create', {
    templateUrl: 'templates/laboratorio/create.html',
    controller: 'CrearLaboratorioCtrl',
   /* data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
  .when('/laboratorios/edit/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/laboratorio/edit.html',
    controller: 'EditLaboratorioCtrl',
    /*data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })


  //***************************E S T A B L E C I M I E N T O S**********************
  .when('/establecimientos', {
    title: 'Establecimientos',
    templateUrl: 'templates/establecimiento/index.html',
    controller: 'IndexEstablecimientoCtrl' /* ,
  data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  .when('/establecimientos/ver/:usa_id', {
    templateUrl: 'templates/establecimiento/ver1.html',
    controller: 'VerEstablecimientoCtrl',
/*    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  .when('/establecimientossol', {
    title: 'Establecimientos Solicitantes',
    templateUrl: 'templates/establecimiento_solicitante/establecimientos.html',
    controller: 'ListaEstabSolCtrl' /* ,
  data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  .when('/establecimientos/create', { 
    templateUrl: 'templates/establecimiento_solicitante/crear.html',
    controller: 'CrearEstabSolCtrl',
/*    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
//*******************************==========================P E R S O N A S  Q  C O N C L U Y E R O N==========================================================================
    .when('/tramites_concluidos', { 
    templateUrl: 'templates/personatramite/final2.html',
    controller: 'ListaFinalCtrl',
/*    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  .when('/tramites_concluidos/ver/:pt_id', { 
    templateUrl: 'templates/personatramite/ver.html',
    controller: 'VerFinalCtrl',
/*    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
//*******************************==========================PAIS==========================================================================
  .when('/homepais',{
   templateUrl:'templates/pais/list.html',
   controller: 'PaisCtrl',
    /*data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
    .when('/pais/create',{
   templateUrl:'templates/pais/create.html',
   controller: 'PaisCreateCtrl',
    /*data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  








































/*===================================VERONICA================================================*/
/*-----------------------------laboratorista---------------------------------*/

  .when('/buscar-numero-muestra', {
    templateUrl: 'templates/pruebalaboratorio/buscar_numeromuestra.html',
    controller: 'CrearPruebaLaboratorioCtrl'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })

  .when('/prueba-laboratorio/crear/:pl_id', {
    templateUrl: 'templates/pruebalaboratorio/crear.html',
    controller: 'EditarPruebaLaboratorioCtrl'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })

   .when('/prueba-laboratorio/ver/:pl_id', {
    templateUrl: 'templates/pruebalaboratorio/ver.html',
    controller: 'VerPruebaLaboratorioCtrl'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })

    .when('/pais', {
    templateUrl: 'templates/pais/list.html',
    controller: 'PaisCtrl2'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })


  .when('/prueba-laboratorio', {
    templateUrl: 'templates/pruebalaboratorio/index.html',
    controller: 'PruebaLaboratorioCtrl'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })

  // .when('/ultima-prueba-laboratorio', {
  //   templateUrl: 'ultima-prueba-laboratorio.html',
  //   controller: 'UltimaPruebaLaboratorioCtrl'
  // })



  /*-----------------------------asignacion de numero de muestra---------------------------------*/
  .when('/numero-muestra/crear', {
    templateUrl: 'templates/muestra/create.html',
    controller: 'NumeroMuestraController'
  })

  .when('/numero-muestra', {
    templateUrl: 'templates/muestra/index.html',
    controller: 'ListarMuestraController'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })
  /*-----------------------------------Número de ficha crear------------------------------------*/
  .when('/numero-ficha/crear', {
    templateUrl: 'templates/ficha/crear.html',
    controller: 'NumeroFichaController'
  })


  /*---------------------------busqueda de personas preregistradas para pago de tramite------------------------------*/
  .when('/tramite/crear', {
    templateUrl: 'templates/personatramite/create.html',
    controller: 'CrearPersonaTramiteCtrl'
  })

  /*login seguimiento a tramite*/

    .when('/seguimiento-tramite', {
    templateUrl: 'templates/personatramite/seguimientotramite.html',
    controller: 'SeguimientoTramiteCtrl'
  })
  /*ver seguimiento tramite*/
  .when('/serguimiento-tramite-cas/:pt_id', {
    templateUrl: 'templates/personatramite/seguimientover.html',
    controller: 'SeguimientoVerCtrl'
  })

  /*-----------------------------tramites---------------------------------*/

  .when('/tramites', {
    templateUrl: 'templates/personatramite/index.html',
    controller: 'PersonaTramiteController'
  })
  .when('/boleta-pago/:pt_id', {
    templateUrl: 'templates/personatramite/boleta.html',
    controller: 'BoletaCtrl'
  })

  /*--------------------------------------------------------------------------------------------*/


  .when('/parasito/crear', {
    templateUrl: 'templates/parasito/crear.html',
    controller: 'CrearParasitoCtrl'
  })

  .when('/parasito', {
    templateUrl: 'templates/parasito/index.html',
    controller: 'ListarParasitoCtrl'
  })

  .when('/parasito/editar/:par_id', {
    templateUrl: 'templates/parasito/editar.html',
    controller: 'EditarParasitoCtrl'
  })

  .when('/parasito/ver/:par_id', {
    templateUrl: 'templates/parasito/ver.html',
    controller: 'VerParasitoCtrl'
  })

/*tratamientos*/

  .when('/tratamiento/crear', {
    templateUrl: 'templates/tratamiento/crear.html',
    controller: 'CrearTratamientoCtrl'
  })

  .when('/tratamiento', {
    templateUrl: 'templates/tratamiento/index.html',
    controller: 'ListarTratamientoCtrl'
  })
  /*===================================VERONICA================================================*/



















  .otherwise({ redirectTo: '/' });
  //$locationProvider.html5Mode(true);
}])

//Redirecciona automaticamente al login
.run(function($rootScope, $location, authUser, toastr, sessionControl, Personas){
  var rutasPrivadas = 
  ['/'/*,'/personas', '/rol/usuario', '/perfil', '/manual','/usuario/create', '/usuario/create/:es_id', '/usuario/edit', '/establecimiento/usuarios', 
  '/establecimientos','/establecimientos/create','/establecimientos/ver/:es_id','/establecimientos/edit/:es_id','/establecimientos/ver','/establecimientos/edit','/red/establecimientos',
  '/personas','/personas/create','/personas/ver/:per_id','/personas/edit/:per_id',
  '/establecimientos/pacientes','/pacientes/create','/pacientes/createP','/persona/createF/:per_id','/pacientes/ver/:pac_id/:var_pre','/pacientes/ver/:pac_id','/pacientes/edit/:pac_id', '/pacientes/createPr/:per_id', '/pacientes/createPrE/:per_id', '/pacientes/familiares/:per_id', 
  '/establecimiento/funcionarios','/funcionarios/ver/:fe_id','/funcionarios/edit/:fe_id','/funcionarios/habilitar/:fe_id/:fe_estado','/funcionarios/createF','/funcionarios/createF/:es_id','/funcionarios/createf','/funcionarios/createf/:es_id','/funcionarios/create_fun/:per_id','/funcionarios/create_fun/:per_id/:fun_id',
  '/servicios','/servicios/agregar','/presta',
  '/consultorios','/consultorios/create','/consultorios/ver/:con_id','/consultorios/edit/:con_id',
  '/referencia/create/:pac_id','/referencias','/referenciasRec','/referencias/ver/:br_id','/referencias/edit/:br_id','/refers',
  '/contrareferenciasrea','/contrareferenciasrec','/contrareferencia/create/:br_id','/contrareferencia/ver/:bc_id','/contrareferencia/editar/:bc_id',
  '/homevacuna','/editvacuna/:vac_id','/createvacuna','/vervacuna/:vac_id',
  '/editdosisvacuna/:dov_id','/createdosisvacuna/:vac_id',
  '/homeenfermedad','/editenfermedad/:enf_id','/createenfermedad','/verenfermedad/:enf_id',
  '/alertas','/crear_alerta','/editar_alerta/:ca_id',
  '/servicios_ciudadanos/realizar_reserva','/servicios_ciudadanos/realizar_reserva/:pac_id','/servicios_ciudadanos/listar_reservas','/servicios_ciudadanos/listar_reservas/:pac_id','/reservas/listar_reservas','/reservas/historial_reservas','/reservas/listar_reservas_med','/reservas/historial_reservas_med','/servicios_ciudadanos/realizar_reserva_familiar',
  '/cita/create/:pac_id','/cita/list','/cita/view/:cit_id','/citas/asigna_ficha/:pac_id','/cita/ver_cita/:cit_id', 
  '/crear/asignar_horarios','/horarios_replicar/:ch_id','/horarios/ver/:ch_id','/horarios','/horarios_vigentes','/horarios/medico','/horarios/consultorio',
  '/homepais',
  '/homedepartamento',
  '/homeprovincia',
  '/homeregion',
  '/homemunicipio','/createmunicipio','/editmunicipio/:mun_id',
  '/homeseguro','/createseguro','/editseguro/:seg_id',
  '/homeinstitucion','/createinstitucion','/editinstitucion/:ins_id',
  '/homecargo',
  '/homered','/createred','/editred/:red_id',
  '/hometipo',
  '/homerol','/createrol',
  '/homesubsector','/createsubsector',*/];
  
  $rootScope.$on('$routeChangeStart', function(){
    if (($.inArray($location.path(), rutasPrivadas) !== -1 ) && !authUser.isLoggedIn()) {
      toastr.error('Debe iniciar sesion para continuar.', 'Mensaje');
      $location.path('/inicio');
    }
  });
})
;