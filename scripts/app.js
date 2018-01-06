'use strict';
angular.module("adminApp", ["authService", "ngRoute", "ngResource", "satellizer", "toastr", "platypus.tabs", 'ngMap', 'vcRecaptcha','angular.filter', 'angularMoment'])

.config(['$routeProvider', '$authProvider', 'CONFIG', 'ROLES', function ($routeProvider, $authProvider, CONFIG, ROLES){
  $authProvider.loginUrl = CONFIG.DOMINIO_SERVICIOS+'/login';

  $routeProvider
  // ======================================jhon===========================================================================
// ==========================    ATENCION DE PACIENTES         =================================
//persona_tramite lista para atender pacientes

.when('/atencion', {//--------medico
  templateUrl: 'templates/personatramite/atencion.html',
  controller: 'AtencionCtrl',
  data: {
    authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.MEDICO.ROL]
  }
})
//---ver carne sanitario ver por pt_id
.when('/carne-sanitario/:pt_id', {
  templateUrl: 'templates/carne/ver.html',
  controller: 'CarneSanitarioCtrl'
})
// crear prueba medica form registro de signos vitales
.when('/prueba-medica/:pt_id', {
  templateUrl: 'templates/pruebamedica/create.html',
  controller: 'PruebaMedicaCtrl',
  data: {
    authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.MEDICO.ROL]
  }
})
// realizar los examenes prueba enfermedad
.when('/prueba-medica/prueba/:pm_id', {
  templateUrl: 'templates/pruebamedica/prueba.html',
  controller: 'PruebaEnfermedadCtrl',
  data: {
    authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.MEDICO.ROL]
  }
})
//ver prueba medica por pm_id
.when('/prueba-medica/ver/:pm_id', {
  templateUrl: 'templates/pruebamedica/ver.html',
  controller: 'PruebaMedicaVerCtrl',
  data: {
    authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.MEDICO.ROL]
  }
})
//historial clinico por ci
.when('/ficha-clinica/:per_ci', {
  templateUrl: 'templates/pruebamedica/ficha-clinica.html',
  controller: 'FichaClinicaCtrl',
  data: {
    authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.MEDICO.ROL]
  }
})

//jhon==========================================================================






// ========================= PAGINA PUBLICA  =================================================
  //pagina inicial de la aplicacion
  .when('/inicio', {
    templateUrl: 'templates/publico/index.html'
  })
//no existe esta ruta --eliminar 1/1/2018
  .when('/inicio2', {
    templateUrl: 'templates/publico/index2.html'
  })
// ========================= PREREGISTRO =================================================== templates/publico/servicios_ciudadanos/preregistro/crear.html     templates/publico/servicios_ciudadanos/preregistro/crear_persona.html
  .when('/servicios_ciudadanos/preregistro', {
    templateUrl: 'templates/publico/servicios_ciudadanos/preregistro/crear.html',
    controller: 'PreregistroCtrl'
  })

//30-11-2017*****************WENDY*******************************

//8-12-17
//********************************USUARIO****************************************
.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  //Página de inicio de el usuario que inicio sesión
  .when('/', {
    templateUrl: 'templates/usuario/index.html', 
    controller: 'InicioCtrl'
  })
  .when('/perfil', {
    templateUrl: 'templates/usuario/perfil.html',
    controller: 'PerfilCtrl'
  })
  //cambiar contrasenia
  .when('/usuario/edit', {
    templateUrl: 'forms/usuario/edit.html',
    controller: 'EditUsuarioCtrl'
  })
  //registrar usuarios cuando es administrador del establecimiento
  .when('/usuario/create', {
    templateUrl: 'forms/usuario/create.html',
    controller: 'UsuarioCreateCtrl',
    controllerAs: 'vm',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
/************************************************PERSONA****************************************/
    .when('/persona/create', {
    templateUrl: 'templates/persona/crear.html',
    controller: 'CrearPersona2Ctrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.RECEPCIONISTA.ROL]
    }
  })
  .when('/personas', {
    templateUrl: 'templates/persona/index.html',
    controller: 'ListaPersonasCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })

   .when('/personas/ver/:per_id', {
    templateUrl: 'templates/persona/ver.html',
    controller: 'VerPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
     .when('/personas/edit/:per_id', {
    templateUrl: 'templates/persona/edit.html',
    controller: 'EditPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
/******************************************funcionario**********************************/
    .when('/funcionarios', {  //lista a los funcionarios de USACSIA
    templateUrl: 'templates/funcionario/funcionarios.html',
    controller: 'FuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL, ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })
  .when('/funcionarios/ver/:fun_id', {
    templateUrl: 'templates/funcionario/ver.html',
    controller: 'VerFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL, ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })

  .when('/funcionarios/createFun', {
    templateUrl: 'templates/funcionario/create_fun_per.html',
    controller: 'CreateFuncionarioPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL, ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })
  //crar funcionario cuando ya existe la persona
    .when('/funcionarios/createfo', {
    templateUrl: 'templates/funcionario/create.html',
    controller: 'CreateFunCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL, ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })
    //añadido 20-12-2017 -- CREAR FUNCIONARIO CUNDO EXISTE LA PERSONA
    .when('/funcionarios/create_fun/:per_id', {
    templateUrl: 'templates/funcionario/create_fun.html',
    controller: 'CreateFuCtrl',

  })

  .when('/funcionarios/edit/:fun_id', {
    templateUrl: 'templates/funcionario/edit.html',
    controller: 'EditFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL, ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })
  /************************************CONSULTORIOS***********************************/
  .when('/consultorios', {
    templateUrl: 'templates/consultorio/consultorios.html',
    controller: 'ListaConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

    .when('/consultorios/ver/:amb_id', {
    templateUrl: 'templates/consultorio/ver.html',
    controller: 'VerConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

    .when('/consultorios/create', {
    templateUrl: 'templates/consultorio/create.html',
    controller: 'CrearConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })
  .when('/consultorios/edit/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/consultorio/edit.html',
    controller: 'EditConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })
/***************************************************LABORATORIOS********************************/
   .when('/laboratorios', {//arreglar la ruta con establecimientos
    templateUrl: 'templates/laboratorio/laboratorios.html',
    controller: 'ListaLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })
  
.when('/laboratorios/ver/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/laboratorio/ver.html',
    controller: 'VerLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })
    .when('/laboratorios/create', {
    templateUrl: 'templates/laboratorio/create.html',
    controller: 'CrearLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })
  .when('/laboratorios/edit/:amb_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/laboratorio/edit.html',
    controller: 'EditLaboratorioCtrl',
    data: {
     authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })


  //***************************E S T A B L E C I M I E N T O S USACSIA          **********************
  .when('/establecimientos', {
    title: 'Establecimientos',
    templateUrl: 'templates/establecimiento/index.html',
    controller: 'IndexEstablecimientoCtrl'  ,
  data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
  .when('/establecimientos/ver/:usa_id', {
    templateUrl: 'templates/establecimiento/ver1.html',
    controller: 'VerEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
 //***************************       ESTABLECIMIENTOS SOLICITANTES          **********************
  .when('/establecimientossol', {
    title: 'Establecimientos Solicitantes',
    templateUrl: 'templates/establecimiento_solicitante/establecimientos.html',
    controller: 'ListaEstabSolCtrl'  ,
  data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })

  .when('/establecimientosol/crear/:pro_id', { 
    templateUrl: 'templates/establecimiento_solicitante/crear2.html',
    controller: 'CrearEstablecimientoSolicitanteCtrl',
      data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })



//****************===========         TRAMITES CONCLUIDOS      ===========================
    .when('/tramites_concluidos', { 
    templateUrl: 'templates/personatramite/final2.html',
    controller: 'ListaFinalCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL,ROLES.JEFE_USACSIA.ROL]
    }
  })
  .when('/tramites_concluidos/ver/:pt_id', { 
    templateUrl: 'templates/personatramite/ver.html',
    controller: 'VerFinalCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL,ROLES.JEFE_USACSIA.ROL]
    }
  })
//*******************************==========================PAIS==========================================================================
  .when('/homepais',{
   templateUrl:'templates/pais/list.html',
   controller: 'PaisCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
    .when('/pais/create',{
   templateUrl:'templates/pais/create.html',
   controller: 'PaisCreateCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
//==========================           DEPARTAMENTO              ==============================
  .when('/homedepartamento',{
   templateUrl:'templates/departamento/list.html',
   controller: 'HomeCtrlDep'/*,
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
//=========================         FICHAS DE INSPECCION     =============================
//LISTA DE 6 FICHAS
  .when('/inspeccion/fichas',{
   templateUrl:'templates/ficha_inspeccion/fichas_inspeccion.html',
  /* controller: 'FichaICtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  .when('/inspeccion/fichas/crear/:et_id',{
   templateUrl:'templates/ficha_inspeccion/crear.html',
   controller: 'CrearFichaInsCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL,ROLES.INSPECTOR.ROL]
    }
  })
  //ASIGNAR CATEGORIA
  .when('/inspeccion/categoria/crear/:fi_id',{
   templateUrl:'templates/ficha_inspeccion/asignar.html',
   controller: 'CrearCateCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL,ROLES.INSPECTOR.ROL]
    }
  })
  //CREAR FICHA 1
  .when('/inspeccion/fichas/crear1',{
   templateUrl:'templates/ficha_inspeccion1/crear.html',
   controller: 'CrearFicha1Ctrl'/*,
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  //CREAR FICHA 2
  .when('/inspeccion/fichas/crear2',{
   templateUrl:'templates/ficha_inspeccion2/crear.html',
   controller: 'CrearFicha2Ctrl'/*,
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
  //=========================         ASIGNACION DE ZONAS     ==============================

  .when('/asignacion_zonas/crear',{
   templateUrl:'templates/asignacion_zonas/crear.html',
   controller: 'CrearAsignacionCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL,ROLES.ADMIN_CARNET.ROL]
    }
  })
//=========================         EMPRESA TRAMITE     =======================================

  .when('/tramites_certi',{
   templateUrl:'templates/empresatramite/list.html',
   controller: 'ListNatCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL,ROLES.CAJERO.ROL,ROLES.ADMIN_CERTIFICADO.ROL]
    }
  })
    .when('/tramites_certiJ',{
   templateUrl:'templates/empresatramite/listJ.html',
   controller: 'ListJurCtrl'/*,
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }*/
  })
    //lista para inspectores prop naturales
  .when('/tramites_nat',{
   templateUrl:'templates/empresatramite/listaNat.html',
   controller: 'NatInsCtrl',
    data: {
      authorized: [/*ROLES.ADMIN_USACSIA.ROL,*/ROLES.INSPECTOR.ROL]
    }
  })
      //lista para inspectores prop juridicos
  .when('/tramites_jur',{
   templateUrl:'templates/empresatramite/listaJur.html',
   controller: 'JurInsCtrl',
    data: {
      authorized: [/*ROLES.ADMIN_USACSIA.ROL,*/ROLES.INSPECTOR.ROL]
    }
  })


  








































/*===================================VERONICA================================================*/
/*buscar persona registrada, para luego registrar su establecimiento*/
  .when('/establecimientosol/persona', { 
    templateUrl: 'templates/establecimiento_solicitante/buscar_persona_registrada.html',
    controller: 'BuscarCrearPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })
/*buscar empresa registrada, para luego registrar su establecimiento*/
  .when('/establecimientosol/empresa', { 
    templateUrl: 'templates/establecimiento_solicitante/buscar_empresa_registrada.html',
    controller: 'BuscarCrearPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })

    .when('/establecimientosol/persona/ver/:per_id', { 
    templateUrl: 'templates/establecimiento_solicitante/verpersona.html',
    controller: 'VerPersonaEstablecimientoSolicitanteCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })

  .when('/establecimientosol/empresa/ver/:pjur_nit', { 
    templateUrl: 'templates/establecimiento_solicitante/verempresa.html',
    controller: 'VerPJuridicaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL]
    }
  })

/*-----------------------------laboratorista---------------------------------*/

  .when('/buscar-numero-muestra', {
    templateUrl: 'templates/pruebalaboratorio/buscar_numeromuestra.html',
    controller: 'CrearPruebaLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.TECNICO_LABORATORIO.ROL]
    }
  })

  .when('/prueba-laboratorio/crear/:pl_id', {
    templateUrl: 'templates/pruebalaboratorio/crear.html',
    controller: 'EditarPruebaLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.TECNICO_LABORATORIO.ROL]
    }
  })

   .when('/prueba-laboratorio/ver/:pl_id', {
    templateUrl: 'templates/pruebalaboratorio/ver.html',
    controller: 'VerPruebaLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.TECNICO_LABORATORIO.ROL, ROLES.MEDICO.ROL]
    }
  })

//LISTA DE PRUEBAS DE LABORATORIO *****+MEJORAR--20-12-17
  .when('/prueba-laboratorio', {
    templateUrl: 'templates/pruebalaboratorio/index.html',
    controller: 'PruebaLaboratorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.TECNICO_LABORATORIO.ROL]
    }
  })

  // .when('/ultima-prueba-laboratorio', {
  //   templateUrl: 'ultima-prueba-laboratorio.html',
  //   controller: 'UltimaPruebaLaboratorioCtrl'
  // })



  /*-----------------------------asignacion de numero de muestra---------------------------------*/
  .when('/numero-muestra/crear', {
    templateUrl: 'templates/muestra/create.html',
    controller: 'NumeroMuestraController',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.RECEP_LAB.ROL]
    }
  })
//LISTA DE NUMERO DE MUESTRAS ASIGNADOS
  .when('/numero-muestra', {
    templateUrl: 'templates/muestra/index.html',
    controller: 'ListarMuestraController',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.RECEP_LAB.ROL]
    }
  })
  /*-----------------------------------Número de ficha crear------------------------------------*/
  .when('/numero-ficha/crear', {
    templateUrl: 'templates/ficha/crear.html',
    controller: 'NumeroFichaController',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.RECEPCIONISTA.ROL]
    }
  })

//****************===========PAGOS=================================================
/*----------------busqueda de personas preregistradas para pago de tramite----------------------*/
  .when('/tramite/crear', {
    templateUrl: 'templates/personatramite/create.html',
    controller: 'CrearPersonaTramiteCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.CAJERO.ROL]
    }
  })

  /*login seguimiento a tramite-----NO FUNCIONA REVISAR 20-12 2017 ----revisado 21-12-17 jhon*/

    .when('/seguimiento-tramite', {
    templateUrl: 'templates/personatramite/seguimientotramite.html',
    controller: 'SeguimientoTramiteCtrl'

  })
  /*ver seguimiento tramite*/
  .when('/seguimiento-tramite-cas/:pt_id', {
    templateUrl: 'templates/personatramite/seguimientover.html',
    controller: 'SeguimientoVerCtrl'
  })

  /*-----------------------------tramites---------------------------------*/
//LISTA DE PERSONAS QUE PAGARON E INICIARON EL TRAMITE
  .when('/tramites-car', {
    templateUrl: 'templates/personatramite/index.html',
    controller: 'PersonaTramiteController',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.CAJERO.ROL,ROLES.ADMIN_CARNET.ROL]
    }
  })
//VER LA BOLETA DE PAGO
  .when('/boleta-pago/:pt_id', {
    templateUrl: 'templates/personatramite/boleta.html',
    controller: 'BoletaCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.CAJERO.ROL]
    }
  })

/*--------------------------------------------------------------------------------------------*/

  .when('/parasito/crear', {
    templateUrl: 'templates/parasito/crear.html',
    controller: 'CrearParasitoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

  .when('/parasito', {
    templateUrl: 'templates/parasito/index.html',
    controller: 'ListarParasitoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

  .when('/parasito/editar/:par_id', {
    templateUrl: 'templates/parasito/editar.html',
    controller: 'EditarParasitoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

  .when('/parasito/ver/:par_id', {
    templateUrl: 'templates/parasito/ver.html',
    controller: 'VerParasitoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })


  .when('/tratamiento/crear', {
    templateUrl: 'templates/tratamiento/crear.html',
    controller: 'CrearTratamientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

  .when('/tratamiento', {
    templateUrl: 'templates/tratamiento/index.html',
    controller: 'ListarTratamientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_USACSIA.ROL, ROLES.ADMIN_CARNET.ROL]
    }
  })

//subir documento
  .when('/documento-tramite/crear/:et_id', {
    templateUrl: 'templates/documento_tramite/crear.html',
    controller: 'CrearDocumentoTramiteCtrl'
  })

  .when('/documento-tramite/crear2/:et_id', {
    templateUrl: 'templates/documento_tramite/crear2.html',
    controller: 'Crear2DocumentoTramiteCtrl'
  })

  .when('/documento-tramite/crear2/#:doc', {
    templateUrl: 'templates/documento_tramite/crear2.html',
    controller: 'Crear2DocumentoTramiteCtrl'
  })

  .when('/documento', {
    templateUrl: 'templates/documento/index.html',
    controller: 'ListarDocumentoCtrl'
  })

  .when('/documento/crear', {
    templateUrl: 'templates/documento/crear.html',
    controller: 'CrearDocumentoCtrl'
  })

    /*jhon- arancel categoria*/
  .when('/categoria', {
    templateUrl: 'templates/arancel/categoria-lista.html',
    controller: 'CategoriaCtrl'
  })

  .when('/firma/crear', {
    templateUrl: 'templates/firma/crear.html',
    controller: 'FirmaCrearCtrl'
  })
  .when('/firma/editar', {
    templateUrl: 'templates/firma/editar.html',
    controller: 'CrearDocumentoTramiteCtrl'
  })

/*########################CERTIFICADO SANITARIO#######################################*/
/*========================== empresa tramite==========================================*/
    /*busca establecimiento_solictante por ci o por razon social*/ //NO FUNCIONA 1-1-2018
  .when('/buscarpropietario', {
    templateUrl: 'buscarpropietario.html',
    controller: 'BuscarpropietarioCtrl'
  })//NO FUNCIONA
/*jhon busca un establecimiento por ci de propietario o razon social*/
  .when('/buscar-propietario', {
    templateUrl: 'templates/empresatramite/buscar.html',
    controller: 'BuscarPropietarioCtrl'
  })
  /*jhon generador de boleta pago form1 ces*/
  .when('/boleta-ces/:et_id', {
    templateUrl: 'templates/empresatramite/boleta-ces.html',
    controller: 'BoletaCesCtrl'
  })

  .when('/pago-pendiente/:pp_id', {
    templateUrl: 'templates/pagopendiente/ver.html',
    controller: 'BoletaCesVerCtrl'
  })

  .when('/seguimiento-tramite-ces/:et_id', {
    templateUrl: 'templates/certificado/ver.html',
    controller: 'CertificadoCtrl'
  })
  /*========================== /empresa tramite =======================================*/
/*-------------------------------------- documentos -----------------------------------------*/
    
  /*--------PENDIENTE------*/

  /*===================================VERONICA================================================*/















  .otherwise({ redirectTo: '/' });
  //$locationProvider.html5Mode(true);
}])

//Redirecciona automaticamente al login
.run(function($rootScope, $location, authUser, toastr, sessionControl, Personas){
  var rutasPrivadas = 

  ['/','/atencion','/prueba-medica/:pt_id','/prueba-medica/prueba/:pm_id','/prueba-medica/ver/:pm_id','/ficha-clinica/:per_ci','/perfil', '/usuario/edit','/usuario/create','/persona/create','/personas','/personas/ver/:per_id','/personas/edit/:per_id', '/funcionarios','/funcionarios/ver/:fun_id', '/funcionarios/createFun','/funcionarios/edit/:fun_id', '/consultorios','/consultorios/ver/:amb_id', '/consultorios/create','/consultorios/edit/:amb_id','/laboratorios','/laboratorios/ver/:amb_id', '/laboratorios/create','/laboratorios/edit/:amb_id',  '/establecimientos','/establecimientos/ver/:usa_id','/establecimientossol','/establecimientos/crear','/establecimientosol/crear','/tramites_concluidos',  '/tramites_concluidos/ver/:pt_id', '/homepais','/pais/create','/buscar-numero-muestra','/prueba-laboratorio/crear/:pl_id','/prueba-laboratorio/ver/:pl_id', '/prueba-laboratorio','/numero-muestra/crear','/numero-muestra','/numero-ficha/crear','/tramite/crear','/tramites-car','/boleta-pago/:pt_id','/parasito/crear', '/parasito','/parasito/editar/:par_id','/parasito/ver/:par_id','/tratamiento/crear', '/tratamiento','/homedepartamento','/establecimientosol/crear/:per_id',];

  
  $rootScope.$on('$routeChangeStart', function(){
    if (($.inArray($location.path(), rutasPrivadas) !== -1 ) && !authUser.isLoggedIn()) {
      toastr.error('Debe iniciar sesion para continuar.', 'Mensaje');
      $location.path('/inicio');
    }
  });
})
;