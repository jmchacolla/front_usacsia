'use strict';
angular.module("adminApp", ["authService", "ngRoute", "ngResource", "satellizer", "toastr", "platypus.tabs", 'ngMap', 'vcRecaptcha','angular.filter'])
/*.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  console.log($httpProvider.interceptors);
})*/
.config(['$routeProvider', '$authProvider', 'CONFIG', 'ROLES', function ($routeProvider, $authProvider, CONFIG, ROLES){
  $authProvider.loginUrl = CONFIG.DOMINIO_SERVICIOS+'/auth_login';
//$authProvider.signupUrl = CONFIG.DOMINIO_SERVICIOS+'/usuarios';

  $routeProvider
  // ======================================jhon===========================================================================
  //lista a los funcionarios de Usacsia
  .when('/funcionario', {  
    templateUrl: 'templates/funcionario/funcionarios.html',
    controller: 'FuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
// detalle de funcionario
  .when('/funcionario/:fun_id', {
    templateUrl: 'templates/funcionario/ver.html',
    controller: 'VerFuncionarioCtrl',
/*    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }*/
  })
//persona_tramite lista para atender pacientes

.when('/atencion', {//--------medico
  templateUrl: 'templates/personatramite/atencion.html',
  controller: 'AtencionCtrl',
  /*    data: {
        authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
      }*/
})


  // ======================================/jhon==========================================================================






    // ========================= PAGINA PUBLICA  ============================================================================
  //pagina inicial de la aplicacion
  .when('/inicio', {
    templateUrl: 'templates/publico/index.html'
  })

//30-11-2017*****************WENDY*******************************
/************************************************PERSONA****************************************/
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
    .when('/funcionarios/createfuncionario', {
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

  .when('/prueba-laboratorio', {
    templateUrl: 'templates/pruebalaboratorio/index.html',
    controller: 'PruebaLaboratorioController'
    // data: {
    //   authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    // }
  })

/*-----------------------------tramites---------------------------------*/

  .when('/tramites', {
    templateUrl: 'templates/personatramite/index.html',
    controller: 'PersonaTramiteController'
  })

  /*-----------------------------asignacion de numero de muestra---------------------------------*/
  .when('/asignar-numero-muestra', {
    templateUrl: 'templates/pruebalaboratorio/create.html',
    controller: 'NumeroMuestraController'
  })


  /*---------------------------BUSQUEDA DE PERSONAS PREREGISTRADAS------------------------------*/
  .when('/buscar-persona', {
    templateUrl: 'templates/personatramite/create.html',
    controller: 'BusquedaPersonaController'
  })
  /*===================================VERONICA================================================*/























  //pagina de busqueda de establecimientos filtrado
  .when('/servicios_informacion/establecimientos_salud', {
    templateUrl: 'templates/publico/servicios_informacion/establecimientos/busqueda_establecimientos.html', 
    controller: 'BusquedaEstablecimientosCtrl'
  })
  //pagina de busqueda de establecimientos filtrado
    .when('/servicios_informacion/establecimientos_salud/:es_id', {
    templateUrl: 'templates/publico/servicios_informacion/establecimientos/establecimiento.html', 
    controller: 'MostrarEstablecimientosCtrl'
  })
  //pagina de busqueda de establecimientos cercanos a una ubicacion X,Y
  .when('/servicios_informacion/establecimientos_cercanos', {
    templateUrl: 'templates/publico/servicios_informacion/establecimientos/establecimientos_cercanos.html', 
    controller: 'CercanosCtrl'
  })
  //muestra los manuales de paciente y usuario
  .when('/manual/ciudadano', {
    templateUrl: 'templates/publico/servicios_informacion/manuales/manual_ciudadano.html'
  })
  //Muestra los manuales para el personal de salud
  .when('/manual/funcionarios', {
    templateUrl: 'templates/publico/servicios_informacion/manuales/manual_funcionario.html'
  })
  // ========================= PREREGISTRO ============================================================================
  .when('/servicios_ciudadanos/preregistro', {
    templateUrl: 'templates/publico/servicios_ciudadanos/preregistro/crear_persona.html',
    controller: 'PreregistroCtrl'
  })
  .when('/servicios_ciudadanos/preregistro/ver/:per_id', {
    templateUrl: 'templates/publico/servicios_ciudadanos/preregistro/ver_preregistro.html',
    controller: 'VerPreregistroCtrl'
  })
  // ========================= USUARIO ============================================================================
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  //Página de inicio de el usuario que inicio sesión
  .when('/', {
		templateUrl: 'templates/usuario/index.html', 
    controller: 'InicioCtrl'
	})
  .when('/rol/usuario', {
    templateUrl: 'templates/usuario/rol_usuario.html', 
    controller: 'RolUsuarioCtrl'
  })
  .when('/perfil', {
    templateUrl: 'templates/usuario/perfil.html',
    controller: 'PerfilCtrl'
  })
  .when('/manual', {
    templateUrl: 'templates/usuario/manual.html',
    controller: 'ManualCtrl'
  })
  //registrar usuarios cuando es administrador del establecimiento
  .when('/usuario/create', {
    templateUrl: 'forms/usuario/create.html',
    controller: 'UsuarioCreateCtrl',
    controllerAs: 'vm',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  //registrar usuarios cuando es administrador del SEDES
  .when('/usuario/create/:es_id', {
    templateUrl: 'forms/usuario/create.html',
    controller: 'UsuarioCreateCtrl',
    controllerAs: 'vm',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  //cambiar contrasenia
  .when('/usuario/edit', {
    templateUrl: 'forms/usuario/edit.html',
    controller: 'EditUsuarioCtrl'
  })
  .when('/establecimiento/usuarios', {
    templateUrl: 'templates/usuario/usuarios.html',
    controller: 'UsuariosEstabCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })

  // ========================= ESTABLECIMIENTOS ============================================================================
  //Lista todos los establecimientos
  .when('/establecimientos', {
    title: 'Establecimientos',
    templateUrl: 'templates/establecimiento/index.html',
    controller: 'IndexEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/establecimientos/create', { 
    templateUrl: 'forms/establecimiento/create.html',
    controller: 'CreateEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/establecimientos/ver/:es_id', {
    templateUrl: 'templates/establecimiento/ver.html',
    controller: 'VerEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/establecimientos/edit/:es_id', {
    templateUrl: 'forms/establecimiento/edit.html',
    controller: 'EditEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/establecimientos/ver', {//Muestra los datos del establecimiento del funcionario
    templateUrl: 'templates/establecimiento/datos.html',
    controller: 'VerEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL,
                  ROLES.RECAUDADOR.ROL, ROLES.ENFERMERO.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/establecimientos/edit', {
    templateUrl: 'forms/establecimiento/edit.html',
    controller: 'EditEstablecimientoCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/red/establecimientos', {
    templateUrl: 'templates/establecimiento/establecimiento_red.html',
    controller: 'EstablecimientoRedCtrl',
    controllerAs: 'vm',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  // ========================= PERSONAS ============================================================================
  // .when('/personas', {
  //   templateUrl: 'templates/persona/index.html',
  //   controller: 'IndexPersonasCtrl',
  //   data: {
  //     authorized: [ROLES.ADMIN_SEDES.ROL]
  //   }
  // })
/*  .when('/personas/create', {
    templateUrl: 'templates/persona/create.html',
    controller: 'CreatePersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })*/
  

 /* .when('/personas/ver/:per_id', {
    templateUrl: 'templates/persona/ver.html',
    controller: 'VerPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })*/
/*  .when('/personas/edit/:per_id', {
    templateUrl: 'templates/persona/edit.html',
    controller: 'EditPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })*/
  // ========================= PACIENTES ============================================================================
  .when('/establecimientos/pacientes', { 
    templateUrl: 'templates/paciente/pacientes.html',
    controller: 'PacientesEstabCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ENFERMERO.ROL, 
                  ROLES.RECAUDADOR.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
	.when('/pacientes/create', {//PARA REDIRIGIR AL BUSCADOR DE UN PACIENTE POR SU CI
    templateUrl: 'forms/paciente/create.html',
    controller: 'CreatePacienteCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/createP', {//PARA REGISTRAR LOS DATOS PERSONALES Y DATOS DE PACIENTE
    templateUrl: 'forms/paciente/create_pac_per.html',
    controller: 'CreatePacientePersonaCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/persona/createF/:per_id', {
    templateUrl: 'forms/persona/persona_fam.html',
    controller: 'CreatePacienteFamiliarCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/ver/:pac_id/:var_pre', {//el segundo parametro es para mostrar la cuenta del preregistro en caso de que se le asigne al usuario
    templateUrl: 'templates/paciente/ver.html',
    controller: 'VerPacienteCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/ver/:pac_id', {
    templateUrl: 'templates/paciente/ver.html',
    controller: 'VerPacienteCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ENFERMERO.ROL, 
                  ROLES.RECAUDADOR.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/edit/:pac_id', {
    templateUrl: 'templates/paciente/edit.html',
    controller: 'EditPacienteCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/createPr/:per_id', {//PARA CREAR UN PACIENTE QUE YA SE TIENE SUS DATOS PERSONALES
    templateUrl: 'forms/paciente/create_pac.html',
    controller: 'CreatePacienteCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/createPrE/:per_id', {//REGISTRO DE PACIENTE CUANDO REALIZÓ PRE-REGISTRO
    templateUrl: 'forms/paciente/create_pre.html',
    controller: 'CreatePacientePrCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/pacientes/familiares/:per_id', {
    templateUrl: 'templates/paciente/ver_fam.html',
    controller: 'VerFamPacienteCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  //agregado 15-11-2017
  .when('/pacientes/activa_cuenta', {
    templateUrl: 'templates/publico/servicios_ciudadanos/preregistro/activa_cuenta.html',
    controller: 'ActivaCuentaCtrl',
    data: {
      authorized: [ROLES.ESTADISTICA.ROL, ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })

  // ========================= FUNCIONARIOS ============================================================================
 /* .when('/establecimiento/funcionarios', {  //lista a los funcionarios de un establecimiento
    templateUrl: 'templates/funcionario/funcionarios.html',
    controller: 'FuncionarioEstCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
/*  .when('/funcionarios/ver/:fe_id', {
    templateUrl: 'templates/funcionario/ver.html',
    controller: 'VerFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
/*  .when('/funcionarios/edit/:fe_id', {
    templateUrl: 'templates/funcionario/edit.html',
    controller: 'EditFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
  .when('/funcionarios/habilitar/:fe_id/:fe_estado', {
    templateUrl: 'templates/funcionario/edit.html',
    controller: 'EditFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL, ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
/*  .when('/funcionarios/createF', {
    templateUrl: 'forms/funcionario/create_fun_per.html',
    controller: 'CreateFuncionarioPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
  .when('/funcionarios/createF/:es_id', {
    templateUrl: 'forms/funcionario/create_fun_per.html',
    controller: 'CreateFuncionarioPersonaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
/*  .when('/funcionarios/createf', {
    templateUrl: 'templates/funcionario/create.html',
    controller: 'CreateFunCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
  .when('/funcionarios/createf/:es_id', {
    templateUrl: 'templates/funcionario/create.html',
    controller: 'CreateFunCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/funcionarios/create_fun/:per_id', {
    templateUrl: 'forms/funcionario/create_fun.html',
    controller: 'CreateFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL,ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/funcionarios/create_fun/:per_id/:fun_id', {
    templateUrl: 'forms/funcionario/create_fun.html',
    controller: 'CreateFuncionarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL,ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })

  // ========================= SERVICIOS ============================================================================
  .when('/servicios', {//listar todos los servicios
    templateUrl: 'templates/servicio/servicios.html',
    controller: 'ListaServiciosEsCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/servicios/agregar', {//agregar servicios a un establecimiento
    templateUrl: 'templates/servicio/agregar_servicios.html',
    controller: 'AgregaServiciosCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/presta', {//servicios que presta un establecimiento
    templateUrl: 'templates/servicio/presta.html',
    controller: 'EstablecimientoPrestaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })

  // ========================= CONSULTORIOS ============================================================================
/*  .when('/consultorios', {//arreglar la ruta con establecimientos
    templateUrl: 'templates/consultorio/consultorios.html',
    controller: 'ListaConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/consultorios/create', {
    templateUrl: 'templates/consultorio/create.html',
    controller: 'CreateConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/consultorios/ver/:con_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/consultorio/ver.html',
    controller: 'VerConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/consultorios/edit/:con_id', {//FALTA PROTEGER ESTA RUTA
    templateUrl: 'templates/consultorio/edit.html',
    controller: 'EditConsultorioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })*/
  
  // ========================= REFERENCIA ============================================================================
  .when('/referencia/create/:pac_id', {
    templateUrl: 'templates/referencia/create.html',
    controller: 'CreateRefCtrl',
    controllerAs: 're',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/referencias', {
    templateUrl: 'templates/referencia/referencias.html',
    controller: 'ListaRefCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.RECAUDADOR.ROL,
                  ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/referenciasRec', {
    templateUrl: 'templates/referencia/referenciasRec.html',
    controller: 'ListaRefDesCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.RECAUDADOR.ROL, 
                  ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/referencias/ver/:br_id', {
    templateUrl: 'templates/referencia/ver.html',
    controller: 'VerReferenciaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.RECAUDADOR.ROL,
                  ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/referencias/edit/:br_id', {
    templateUrl: 'templates/referencia/edit2.html',
    controller: 'EditarDosReferenciaCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/refers', {////quitar esta ruta!!!!!!!
    templateUrl: 'templates/referencia/refers.html',
    controller: 'ListaRefTrueCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, 
                  ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })

  // ========================= CONTRAREFERENCIAS ============================================================================
  ///REvisar que rutas se usan!!!!!!!
  .when('/contrareferenciasrea', {//lista contrareferencias realizadas por el ES (tambien recibidas)
    templateUrl: 'templates/contrareferencias/indexrea.html',
    controller: 'IndexContrareferenciaReaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.RECAUDADOR.ROL, 
                  ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/contrareferenciasrec', {//lista contrareferencias recibidas por el ES (tambien recibidas)
    templateUrl: 'templates/contrareferencias/indexrec.html',
    controller: 'IndexContrareferenciaRecCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.RECAUDADOR.ROL, ROLES.ADMIN_MEDICO.ROL, 
                  ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/contrareferencia/create/:br_id', {
    templateUrl: 'forms/contrareferencias/create.html',
    controller: 'CreaContrareferenciaCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/contrareferencia/ver/:bc_id', {
    templateUrl: 'templates/contrareferencias/ver.html',
    controller: 'VerContrareferenciaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ESTADISTICA.ROL, ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL, 
                  ROLES.RECAUDADOR.ROL, ROLES.ESTAD_RECAU_ENFER.ROL]
    }
  })
  .when('/contrareferencia/editar/:bc_id', {
    templateUrl: 'forms/contrareferencias/editar.html',
    controller: 'EditarContrareferenciaCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  
  // ========================= VACUNAS ============================================================================
  .when('/homevacuna',{
   templateUrl:'templates/vacuna/list.html',
   controller: 'HomeCtrlVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editvacuna/:vac_id', {
    templateUrl:'templates/vacuna/edit.html',
    controller: 'EditCtrlVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createvacuna', {
    templateUrl:'templates/vacuna/create.html',
    controller: 'CreateCtrlVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/vervacuna/:vac_id', {
    templateUrl:'templates/vacuna/ver.html',
    controller: 'VerCtrlVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //==============================DOSIS VACUNA=============================
  .when('/editdosisvacuna/:dov_id', {
    templateUrl:'templates/dosisvacuna/edit.html',
    controller: 'EditCtrlDosVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createdosisvacuna/:vac_id', {
    templateUrl:'templates/dosisvacuna/create.html',
    controller: 'CreateCtrlDosVac',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //==================================ENFERMEDAD============================
  .when('/homeenfermedad',{
   templateUrl:'templates/enfermedad/list.html',
   controller: 'HomeCtrlEnf',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editenfermedad/:enf_id', {
    templateUrl:'templates/enfermedad/edit.html',
    controller: 'EditCtrlEnf',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createenfermedad', {
    templateUrl:'templates/enfermedad/create.html',
    controller: 'CreateCtrlEnf',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/verenfermedad/:enf_id', {
    templateUrl:'templates/enfermedad/ver.html',
    controller: 'VerCtrlEnf',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  // ========================= ALERTAS ============================================================================
  .when('/alertas', {
    templateUrl: 'templates/alertas/lista_alertas.html',
    controller: 'ListarAlertasCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/crear_alerta', {
    templateUrl: 'templates/alertas/crear_configuracion.html',
    controller: 'CrearAlertaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editar_alerta/:ca_id', {
    templateUrl: 'templates/alertas/editar_configuracion.html',
    controller: 'EditarAlertaCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })

  // ========================= RESERVAS ============================================================================
  .when('/servicios_ciudadanos/realizar_reserva', {
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/crear_reserva.html',
    controller: 'CrearReservaCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  .when('/servicios_ciudadanos/realizar_reserva/:pac_id', {
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/crear_reserva.html',
    controller: 'CrearReservaCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  //Lista las reservas de un paciente
  .when('/servicios_ciudadanos/listar_reservas', {
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/listar_reservas_paciente.html',
    controller: 'ListaReservaPacienteCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  .when('/servicios_ciudadanos/listar_reservas/:pac_id', {//para listar las citas de un familiar
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/listar_reservas_paciente.html',
    controller: 'ListaReservaPacienteCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  .when('/reservas/listar_reservas', {//para listar reservas por establecimiento
    templateUrl: 'templates/reserva/index_res.html',
    controller: 'IndexReservaCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL,ROLES.ESTADISTICA.ROL,ROLES.RECAUDADOR.ROL,ROLES.ESTAD_RECAU_ENFER.ROL,
                  ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/reservas/historial_reservas', {
    templateUrl: 'templates/reserva/hist_res.html',
    controller: 'IndexReservaHistCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL,ROLES.ESTADISTICA.ROL,ROLES.RECAUDADOR.ROL,ROLES.ESTAD_RECAU_ENFER.ROL,
                ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/reservas/listar_reservas_med', {
    templateUrl: 'templates/reserva/index_res_med.html',
    controller: 'IndexReservaFunCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL,ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/reservas/historial_reservas_med', {//Nuevo historial médico
    templateUrl: 'templates/reserva/hist_res_med.html',
    controller: 'IndexReservaHistMedCtrl',
    data: {
      authorized: [ROLES.ADMIN_MEDICO.ROL, ROLES.MEDICO.ROL]
    }
  })
  .when('/servicios_ciudadanos/realizar_reserva_familiar', {
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/crear_reserva_familiar.html',
    controller: 'CrearReservaFamiliarCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  //===========================CITA PROGRAMADA==========================================================================
  //para que el medico registre la cita
  .when('/cita/create/:pac_id', {
    templateUrl: 'templates/citaprogramada/create.html',
    controller: 'CrearCitaprogramadaCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  //Para listar citas programadas de un médico
  .when('/cita/list', {
    templateUrl: 'templates/citaprogramada/list.html',
    controller: 'ListCitaprogramadaCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  //VER CITA PROGRAMADA PARA EL PACIENTE
  .when('/cita/view/:cit_id', {
    templateUrl: 'templates/publico/servicios_ciudadanos/reservas/ver_cita_programada.html',
    controller: 'VerCitaCtrl',
    data: {
      authorized: [ROLES.PACIENTE.ROL]
    }
  })
  //AGREGADO 27 oct, fichas para el admisionista
  .when('/citas/asigna_ficha/:pac_id', {
      templateUrl: 'templates/ficha/asigna_ficha.html',
      controller: 'AsignaFichaCtrl',
      data: {
        authorized: [ROLES.ESTAD_RECAU_ENFER.ROL,ROLES.RECAUDADOR.ROL]
      }
  })
  //Agregado 20-11-17 VER CITA PROGRAMADA PARA EL MEDICO
  .when('/cita/ver_cita/:cit_id', {
    templateUrl: 'templates/citaprogramada/ver.html',
    controller: 'VerCitaprogramadaCtrl',
    //controllerAs: 're',
    data: {
      authorized: [ROLES.MEDICO.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })

// ========================= ASIGNACION DE HORARIOS ============================================================================
  .when('/crear/asignar_horarios', {
    templateUrl: 'templates/asignacion_horarios/crear.html',
    controller: 'AsignarHorarioCrearCtrl',
    controllerAs: 'asi',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/horarios_replicar/:ch_id', {//Para replicar la asignación de horarios
    templateUrl: 'templates/asignacion_horarios/replicar.html',
    controller: 'ReplicarHorarioCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/horarios/ver/:ch_id', {
    templateUrl: 'templates/asignacion_horarios/ver.html',
    controller: 'VerConfigHorarioTurnoCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.MEDICO.ROL]
    }
  })
  .when('/horarios', {//Lista todas las asignaciones del establecimiento (historial de asignaciones)
    templateUrl: 'templates/asignacion_horarios/index.html',
    controller: 'ListarAsignacionesCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/horarios_vigentes', {
    templateUrl: 'templates/asignacion_horarios/horarios_vigentes.html',
    controller: 'HorariosVigentesCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL]
    }
  })
  .when('/horarios/medico', {//horarios médico
    templateUrl: 'templates/asignacion_horarios/horarios_medico.html',
    controller: 'HorariosMedicoCtrl',
    data: {
      authorized: [ROLES.MEDICO.ROL]
    }
  })
  //Ver horarios por consultorio 26 oct
  .when('/horarios/consultorio', {
    templateUrl: 'templates/asignacion_horarios/verhorcons.html',
    controller: 'VerConfigHorarioTurnoConsCtrl',
    data: {
      authorized: [ROLES.ADMIN_ESTAB.ROL, ROLES.ADMIN_MEDICO.ROL, ROLES.RECAUDADOR.ROL]
    }
  })

  //==========================PAIS==========================================================================
  .when('/homepais',{
   templateUrl:'templates/pais/list.html',
   controller: 'PaisCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //==========================DEPARTAMENTO===================================================================
  .when('/homedepartamento',{
   templateUrl:'templates/departamento/list.html',
   controller: 'HomeCtrlDep',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================PROVINCIA===========================================================================
  .when('/homeprovincia',{
   templateUrl:'templates/provincia/list.html',
   controller: 'HomeCtrlPro',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================REGION===========================================================================
  .when('/homeregion',{
   templateUrl:'templates/region/list.html',
   controller: 'HomeCtrlReg',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================MUNICIPIO==========================================================================
  .when('/homemunicipio',{
   templateUrl:'templates/municipio/list.html',
   controller: 'MunicipioCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createmunicipio', {
    templateUrl:'templates/municipio/create.html',
    controller: 'CreateCtrlMun',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editmunicipio/:mun_id', {
    templateUrl:'templates/municipio/edit.html',
    controller: 'EditCtrlMun',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })

  //===========================SEGURO==========================================================================
  .when('/homeseguro',{
   templateUrl:'templates/seguro/list.html',
   controller: 'SeguroCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createseguro', {
    templateUrl:'templates/seguro/create.html',
    controller: 'CreateCtrlSeg',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editseguro/:seg_id', {
    templateUrl:'templates/seguro/edit.html',
    controller: 'EditCtrlSeg',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  //===========================INSTITUCION==========================================================================
  .when('/homeinstitucion',{
   templateUrl:'templates/institucion/list.html',
   controller: 'InstitucionCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createinstitucion', {
    templateUrl:'templates/institucion/create.html',
    controller: 'CreateCtrlIns',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/editinstitucion/:ins_id', {
    templateUrl:'templates/institucion/edit.html',
    controller: 'EditCtrlIns',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================CARGO==========================================================================
  .when('/homecargo',{
   templateUrl:'templates/cargo/list.html',
   controller: 'HomeCtrlCargo',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  

  
  //===========================TIPO==========================================================================
  .when('/hometipo',{//Lista los tipos de establecimientos de salud
   templateUrl:'templates/tipo/list.html',
   controller: 'TipoCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================ROL==========================================================================
  .when('/homerol',{
   templateUrl:'templates/roles/list.html',
   controller: 'RolCtrl',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createrol', {
    templateUrl:'templates/roles/create.html',
    controller: 'CreateCtrlRol',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  
  //===========================SUBSECTOR==========================================================================
  .when('/homesubsector',{
   templateUrl:'templates/subsector/list.html',
   controller: 'HomeCtrlSub',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .when('/createsubsector', {
    templateUrl:'templates/subsector/create.html',
    controller: 'CreateCtrlSub',
    data: {
      authorized: [ROLES.ADMIN_SEDES.ROL]
    }
  })
  .otherwise({ redirectTo: '/' });
  //$locationProvider.html5Mode(true);
}])

//Redirecciona automaticamente al login
.run(function($rootScope, $location, authUser, toastr, sessionControl, Personas){
  var rutasPrivadas = 
  [/*'/', '/rol/usuario', '/perfil', '/manual','/usuario/create', '/usuario/create/:es_id', '/usuario/edit', '/establecimiento/usuarios', 
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