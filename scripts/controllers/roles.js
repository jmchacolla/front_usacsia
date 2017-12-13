'use strict';
angular.module('adminApp')
// ************************* CONSTANTES *****************************************************************

// ========================= CONFIGURACION ============================================================================
.constant('CONFIG', {
  ROL_CURRENT_USER: parseInt(localStorage.getItem("ROL_CURRENT_USER"), 10),//este es el usuario que esta logueado
  ROL_CURRENT_USER_NAME: localStorage.getItem("ROL_CURRENT_USER_NAME"),
 // DOMINIO_SERVICIOS: "http://190.181.60.19/api_awebss/public"
  //DOMINIO_SERVICIOS: "http://localhost/api_usacsia/public"//-----------jhon
//DOMINIO_SERVICIOS: "http://190.181.60.19/api_usacsia/public"


//DOMINIO_SERVICIOS: "http://localhost:8000"


<<<<<<< HEAD
//DOMINIO_SERVICIOS: "http://localhost:8000"//---------------------jhon
=======
// DOMINIO_SERVICIOS: "http://localhost:8000"//---------------------jhon
>>>>>>> 938dd85bae522c8ea2cda43273d9312a286bdcc2

//wendy
// DOMINIO_SERVICIOS: "http://localhost:8080/api_usacsia/public"
  // DOMINIO_SERVICIOS: "http://localhost/usacsia_php_5.6/usacsia_git/api_usacsia/public"


//vero
DOMINIO_SERVICIOS: "http://localhost/usacsia_php_5.6/usacsia_git2/api_usacsia/public"
})

// ========================= ROLES ============================================================================
.constant('ROLES', {
  ADMIN_SEDES: {
    ROL:1,
    PATH:"/"
  },
  ADMIN_ESTAB: {
    ROL:2,
    PATH:"/"
  },
  ESTADISTICA: {
    ROL:3,
    PATH:"/"
  },
  MEDICO: {
    ROL:4,
    PATH:"/"
  },
  ENFERMERO: {
    ROL:5,
    PATH:"/"
  },
  RECAUDADOR: {
    ROL:6,
    PATH:"/"
  },
  PACIENTE: {
    ROL:7,
    PATH:"/"
  },
  ROOT: {
    ROL:8,
    PATH:"/"
  },
  ADMIN_MEDICO: {
    ROL:9,
    PATH:"/"
  },
  ESTAD_RECAU_ENFER: {
    ROL:10,
    PATH:"/"
  }
})

.run(["$rootScope", "$location", "CONFIG", "ROLES",   function($rootScope, $location, CONFIG, ROLES){
  $rootScope.$on('$routeChangeStart', function (event, next)
  { 
    if(next.data !== undefined)
    { 
      if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
      {
        //console.log("entra");
      }
      else
      {
        if (CONFIG.ROL_CURRENT_USER == 1) {
          $location.path(ROLES.ADMIN_SEDES.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 2) {
          $location.path(ROLES.ADMIN_ESTAB.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 3) {
          $location.path(ROLES.ESTADISTICA.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 4) {
          $location.path(ROLES.MEDICO.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 5) {
          $location.path(ROLES.ENFERMERO.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 6) {
          $location.path(ROLES.RECAUDADOR.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 7) {
          $location.path(ROLES.PACIENTE.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 8) {
          $location.path(ROLES.ROOT.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 9) {
          $location.path(ROLES.ADMIN_MEDICO.PATH);
        }
        else if (CONFIG.ROL_CURRENT_USER == 10) {
          $location.path(ROLES.ESTAD_RECAU_ENFER.PATH);
        }
      }
    }
  });
}])

/*.run(['$http', '$auth', 'authUser', function ($http, $auth, authUser) {
//  $auth.getToken();
//console.log(authUser.isLoggedIn());
  if (authUser.isLoggedIn())
  { console.log("en el ruuuuuuun");
    $http.defaults.headers.common.Authorization = 'Bearer <myApp_token>';}
}])*/