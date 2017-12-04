'use strict';
angular.module("adminApp")

.controller('PacientesEstabCtrl', ['CONFIG','$scope','PacientesEst','$route', '$http', 'toastr', function (CONFIG,$scope,PacientesEst,$route,$http,toastr){
  $scope.rol_id=CONFIG.ROL_CURRENT_USER;
  if ($scope.rol_id==6 || $scope.rol_id==3 || $scope.rol_id==10){
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Pacientes',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:'active'},
          {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:''},
          {nombre:'Activar Cuenta', enlace:'#/pacientes/activa_cuenta', estilo:''}]
      },
      pagina:{
        titulo:'Pacientes Registrados'
      }
    }
  }
  else{
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Pacientes',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:'active'}]
      },
      pagina:{
        titulo:'Pacientes Registrados'
      }
    }
  }

  $scope.loading=true;

  $scope.sortType = 'pac_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);

  var es_id = FunG.es_id;

  //para paginar
  $scope.nro_filas = 10;
  $scope.filas = [];
  //Lista a los primeros X pacientes por defecto
  PacientesEst.get({es_id:es_id,nro:$scope.nro_filas}, function(data){
    $scope.pacientes = data.paciente;
    $scope.last_page = $scope.pacientes.last_page;
    //$scope.last_page=data.paciente.last_page;
    for(var i in $scope.pacientes.data) {
      $scope.pacientes.data[i].per_fecha_nacimiento = moment($scope.pacientes.data[i].per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
    }
    if($scope.pacientes.data.length >0){
      $scope.loading=false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }

    for (var i = 0; i < $scope.last_page; i++) {
      $scope.filas[i] = i+1;
    };
  })

  $scope.numero_filas = function (nro) {
    $scope.cargando = true;
    if($scope.cargando) {
        toastr.info('Cargando ...', {
          positionClass: 'toast-top-center',
          tapToDismiss: false
        });
      }
    PacientesEst.get({es_id:es_id,nro:nro}, function(data){
      if(data.status){
        $scope.cargando = false;
      }
      $scope.pacientes = data.paciente;
      $scope.last_page=data.paciente.last_page;
      for(var i in $scope.pacientes.data) {
        $scope.pacientes.data[i].per_fecha_nacimiento = moment($scope.pacientes.data[i].per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
      }
      if($scope.pacientes.data.length >0){
        $scope.loading=false;
        $scope.msg = true;
      }
      else{
        $scope.loading = false;
        $scope.msg = false;
      }
      $scope.filas = [];
      for (var i = 0; i < $scope.last_page; i++) {
        $scope.filas[i] = i+1;
      };
    })
  }

  $scope.cambia_pagina = function (pag,nro) {
    $scope.nro_filas = nro;
    PacientesEst.get({es_id:es_id,nro:nro,page:pag}, function(data){
      $scope.pacientes = data.paciente;
      $scope.last_page=data.paciente.last_page;
      for(var i in $scope.pacientes.data) {
        $scope.pacientes.data[i].per_fecha_nacimiento = moment($scope.pacientes.data[i].per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
      }
      if($scope.pacientes.data.length >0){
        $scope.loading=false;
        $scope.msg = true;
      }
      else{
        $scope.loading = false;
        $scope.msg = false;
      }
    })
  }

  $scope.paginar = function (url){
    if (url != null){
      $http.get(url+'&nro='+$scope.nro_filas).success(function(respuesta){
        $scope.pacientes = respuesta.paciente;
        $scope.last_page=respuesta.paciente.last_page;
        for(var i in $scope.pacientes.data) {
          $scope.pacientes.data[i].per_fecha_nacimiento = moment($scope.pacientes.data[i].per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
        }
        if($scope.pacientes.data.length >0){
          $scope.loading=false;
          $scope.msg = true;
        }
        else{
          $scope.loading = false;
          $scope.msg = false;
        }
      });
    }
  }

  var id = 0;
  $scope.nombre_completo = "";

  $scope.get_pac_id = function(pac_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = pac_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  }

  $scope.remove = function(){
    Personas.delete({pac_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}]) 

.controller('VerPacienteCtrl', ['authUser', '$scope', 'Pacientes', '$routeParams', '$http', 'CONFIG','toastr','$location', '$timeout','Familiar',
  function (authUser, $scope, Pacientes, $routeParams,$http, CONFIG, toastr,$location, $timeout, Familiar){
  if(authUser.isLoggedIn()) {
    $scope.rol_id = CONFIG.ROL_CURRENT_USER;
    if (CONFIG.ROL_CURRENT_USER==6 || CONFIG.ROL_CURRENT_USER == 3 || CONFIG.ROL_CURRENT_USER==10){
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Pacientes',
          items:[
            {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
            {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:''}]
        },
        pagina:{
          titulo:'Datos del Paciente'
        }
      }
    }
    else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Pacientes',
          items:[
            {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''}]
        },
        pagina:{
          titulo:'Datos del Paciente'
        }
      }
    };
    
    var pac_id = $routeParams.pac_id;
    $scope.var_pre = $routeParams.var_pre;//obtiene el parametro de la edad del paciente
    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var es_id = FunG.es_id;

    Pacientes.get({pac_id:pac_id, es_id:es_id}, function(data){
        $scope.paciente = data.paciente;
        $scope.fecha_nacimiento = moment($scope.paciente.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
        $scope.fecha_nacimientopassword = moment($scope.paciente.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DDMMYYYY");
        
        if ($scope.paciente.persona.per_genero=='F'){
          $scope.paciente.persona.per_genero='FEMENINO';
        }
        else if ($scope.paciente.persona.per_genero=='M'){
          $scope.paciente.persona.per_genero='MASCULINO';
        };
        $scope.fecha_Nac = moment($scope.paciente.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
        /*    verificar EDAD   */
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/pacientes_edades/'+$scope.paciente.paciente.pac_id).success(function(respuesta){
          $scope.edad_pac=respuesta.paciente_edad;
          if($scope.edad_pac.edad<=17)
          {
            $scope.msg1=true;
            $scope.mensajes="eee";
            $scope.valor=1;
          }else if($scope.edad_pac.edad>17){
            $scope.msg1=false;
            $scope.mensajes="eee2323";
            $scope.valor=2;
          }
        });

        /*POR HACER*/
        Familiar.get({per_id:$scope.paciente.persona.per_id}, function(data){
          $scope.familiares=data.familiar;
        })
        
        /*    OBTIENE SEGURO   */
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/seguro/'+$scope.paciente.paciente.seg_id).success(function(respuesta){
          $scope.nom_seguro=respuesta.seguro.seg_nombre;
        });

        /*   fin verificar edad*/
        $scope.registra=function() {
          $timeout(function() {
            $location.path('/persona/createF/'+$scope.paciente.paciente.per_id);
          },1000);
        }
    });
  } else {
    $location.path('/inicio');
  }
}])

.controller('EditPacienteCtrl', ['authUser', '$scope', 'Pacientes', '$routeParams','Personas', 'toastr', '$location', '$timeout',
  function (authUser, $scope, Pacientes, $routeParams, Personas,toastr,$location,$timeout){
  if(authUser.isLoggedIn()) { 
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Pacientes',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
          {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:''}]
      },
      pagina:{
        titulo:'Editar Datos del Paciente',
        action:'EDITAR'
      }
    }
    //Para obtener el establecimiento del admisionista logueado
    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var es_id = FunG.es_id;

    var pac_id=$routeParams.pac_id;
    Pacientes.get({pac_id:pac_id, es_id:es_id}, function(data)
    {
      $scope.pacientes = data.paciente;
      $scope.per_id = $scope.pacientes.persona.per_id;
      var fecha_naci = new Date($scope.pacientes.persona.per_fecha_nacimiento);
      $scope.diacE = (('0' + fecha_naci.getDate()).slice(-2))+"";
      $scope.mescE = ('0' + (fecha_naci.getMonth() + 1)).slice(-2);
      $scope.aniocE = (fecha_naci.getFullYear() + 0)+"";
        
      Personas.get({per_id:$scope.per_id}, function(data)
      {
        $scope.personas = data.persona;
        /*SE DEBE IFDENTIFICAR EL TIPO DE DOCUMENTO*/
        if($scope.personas.persona.per_tipo_documento=="CI" || $scope.personas.persona.per_tipo_documento=="SIN DOCUMENTO"){
          $scope.disabled_pais=true;
        }
        if($scope.personas.persona.per_tipo_documento=="PASAPORTE"){
          $scope.valor_exp="EXTRANJERO";
          $scope.disabled_pais=false;
          $scope.exp=false;
          $scope.exp_ext=true;
        }
      });

      if ($scope.pacientes.persona.per_genero=='F'){
        $scope.pacientes.persona.per_genero='FEMENINO';
      }
      else if ($scope.pacientes.persona.per_genero=='M'){
        $scope.pacientes.persona.per_genero='MASCULINO';
      }
    });
    
    /*var pac_id = $routeParams.pac_id;//obtiene el id
    Pacientes.get({pac_id:pac_id}, function(data){
      $scope.paciente = data.paciente;
      if ($scope.paciente.persona.per_genero=='F'){
        $scope.paciente.persona.per_genero='FEMENINO';
      }
      else if ($scope.paciente.persona.per_genero=='M'){
        $scope.paciente.persona.per_genero='MASCULINO';
      }
    });*/

    /*PARA EL SELECT DE TIPO DE DOCUMENTO  11/03/2017*/
    $scope.required = true;
    $scope.exp=true;
    $scope.documento=function(){
      $scope.exp=true;
      $scope.exp_ext=false;
      $scope.sin_doc=false;
      $scope.required = true;
      $scope.required_p = false;   // valida el required del pais :)
      $scope.required_e = false;  // valida el required del expedido :)
      $scope.disabled = false;
      $scope.disabled_pais=true;  // valida el disabled del pais :)
      if($scope.personas.persona.per_tipo_documento=="PASAPORTE"){
        $scope.exp=false;
        $scope.exp_ext=true;
        $scope.valor_exp="EXTRANJERO";
        $scope.disabled = false;
        $scope.required = true;
        $scope.required_p = true;    // valida el required del pais :)
        $scope.required_e = false;   // valida el required del expedido :)
        $scope.disabled_pais=false;   // valida el disabled del pais :)
      };
      if($scope.personas.persona.per_tipo_documento=="SIN DOCUMENTO"){
         $scope.exp=false;
         $scope.exp_ext=true;
         $scope.valor_exp="LA PAZ";
         $scope.disabled = true;
         $scope.required = false;
         $scope.required_p = false;    // valida el required del pais :)
         $scope.required_e = false;    // valida el required del expedido :)
         $scope.disabled_pais=true;    // valida el disables del pais :)
      };
      if($scope.personas.persona.per_tipo_documento=="CI"){
         $scope.exp=true;
         $scope.exp_ext=false;
         $scope.disabled = false;
         $scope.required = true;
         $scope.required_p = false;   // valida el required del pais :)
         $scope.required_e= true;    // valida el required del expedido :)
         $scope.disabled_pais=true;   // valida el disables del pais :)
      }
    };

    $scope.submitP = function(a, fecha_naci){
      $scope.personaE = {
        per_ci : $scope.personas.persona.per_ci,
        per_ci_expedido : $scope.personas.persona.per_ci_expedido,
        per_nombres : $scope.personas.persona.per_nombres,
        per_apellido_primero : $scope.personas.persona.per_apellido_primero,
        per_apellido_segundo : $scope.personas.persona.per_apellido_segundo,
        per_fecha_nacimiento : $scope.personas.persona.per_fecha_nacimiento,
        per_genero : $scope.personas.persona.per_genero,
        per_email : $scope.personas.persona.per_email,
        per_tipo_permanencia : $scope.personas.persona.per_tipo_permanencia,
        per_numero_celular : $scope.personas.persona.per_numero_celular,
        per_clave_publica : $scope.personas.persona.per_clave_publica,
        ima_nombre : $scope.personas.imagen[0].ima_nombre,
        ima_enlace : "./img-per",
        ima_tipo : $scope.personas.imagen[0].ima_tipo,
        dir_zona_comunidad : $scope.personas.direccion[0].dir_zona_comunidad,
        dir_avenida_calle : $scope.personas.direccion[0].dir_avenida_calle,
        dir_numero : $scope.personas.direccion[0].dir_numero,
        dir_tipo : $scope.personas.direccion[0].dir_tipo,
        mun_id : $scope.personas.direccion[0].mun_id,
        per_tipo_documento : $scope.personas.persona.per_tipo_documento,
        per_pais : $scope.personas.persona.per_pais
      }

      if(fecha_naci != null){
        $scope.personaE.per_fecha_nacimiento=fecha_naci;
      }
      //$scope.personaE.per_fecha_nacimiento=fecha_naci;
      Personas.update({per_id:$scope.personas.persona.per_id}, $scope.personaE).$promise.then(function(data){
        var pac_id = $routeParams.pac_id;//obtiene el id
        if(data.msg){
          $scope.ajustes.pagina.success = "Los datos del paciente fueron editados correctamente";
          toastr.success('DATOS DEL PACIENTE ACTUALIZADO');
            $timeout(function() {
                $location.path('/pacientes/ver/'+pac_id);
            },1000);
        }
      })
    }

    $scope.submitPac = function(){
      $scope.pacienteP = {
        seg_id : $scope.pacientes.paciente.seg_id,
        pac_grupo_sanguineo : $scope.pacientes.paciente.pac_grupo_sanguineo,
        pac_alergia : $scope.pacientes.paciente.pac_alergia,
        pe_hist_clinico : $scope.pacientes.paciente_establecimiento[0].pe_hist_clinico,
        es_id : es_id
      }
      Pacientes.update({pac_id:$scope.pacientes.paciente.pac_id}, $scope.pacienteP).$promise.then(function(data){
         var pac_id = $routeParams.pac_id;//obtiene el id
        if(data.status){
          $scope.ajustes.pagina.success = "Los datos del paciente fueron editados correctamente";
          toastr.success('DATOS DEL PACIENTE ACTUALIZADO.');
          $timeout(function() {
            $location.path('/pacientes/ver/'+pac_id);
          },1000);
        }
      })
    }
  } else {
    $location.path('/inicio');
  }
}])

//*************   REGISTRO DE PACIENTE cuando existe la PERSONA , también hace la búsqueda del paciente 
.controller('CreatePacienteCtrl',['$scope', 'toastr','$location', '$timeout', '$routeParams', 'Personas','Pacientes','$http','CONFIG','Pacientes_adm', 'PacienteEdad',
function ($scope, toastr, $location, $timeout, $routeParams,Personas,Pacientes,$http, CONFIG, Pacientes_adm,PacienteEdad)
{
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Pacientes',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
          {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:'active'}]
      },
      pagina:{
        titulo:'Registrar Paciente',
        action:'CREAR'
      }
    }

    $scope.pacientes = {
      per_id: 0,
      seg_id: 1,
      pac_grupo_sanguineo: "NINGUNO",
      pac_alergia: "NINGUNO",
      pe_hist_clinico: "",
      es_id: 0
    };

    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var es_id = FunG.es_id;

    $scope.paciente_per={
      es_id: "",
      pac_id: "",
      pe_hist_clinico:""
    };

    $scope.paciente_per.es_id = es_id;

    /*FUNCION PARA MOSTRAR LOS DATOS DE LA PERSONA PACIENTE*/
    $scope.mostrar=false;
    $scope.obtiene_datos=function(pac_id){
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/pacientes_establecimientos/'+pac_id+'/'+es_id).success(function(respuesta){
        if(respuesta.estado=="true"){
          $scope.switch="true";
          $scope.valor="1";
          //cuando el paciente está habilitado en el establecimiento o en otro establecimiento
          $scope.admitir_E=function(pac_id){
            $scope.paciente_per.pac_id=pac_id;
            $scope.paciente_per.pe_hist_clinico=null;
            Pacientes_adm.save($scope.paciente_per).$promise.then(function(data){
              if (data.status) {
                toastr.success('PACIENTE HABILITADO');
                $timeout(function() {
                  $location.path('/pacientes/ver/'+data.paciente_establecimiento.pac_id);
                },1000);
              }
            });
          };
        } else if(respuesta.estado=="false"){
          $scope.valor="0";
          //Cuando el paciente está habilitado en otro establecimiento
          $scope.admitir=function(pac_id){
            $scope.paciente_per.pac_id=pac_id;
            Pacientes_adm.save($scope.paciente_per).$promise.then(function(data){
              if (data.status) {
                toastr.success('PACIENTE ADMITIDO');
                $timeout(function() {
                  $location.path('/pacientes/ver/'+data.paciente_establecimiento.pac_id);
                },1000);
              }
            });
          };
        }
      });
      $scope.mostrar=true;
      Pacientes.get({pac_id:pac_id}, function(data){
        $scope.pac_per=data.paciente;
        $scope.fecha_nac = moment($scope.pac_per.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
      });
    };

    /* CODIGO PARA ADMITIR AL PACIENTE*/
    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var es_id = FunG.es_id;

    $scope.persona={
        pac_id:""
    };

    var SesionG = localStorage.getItem("Sesion");
    var SesionG = JSON.parse(SesionG);
    
    $scope.submit = function(per_id,pac_seg,pac_sang,pac_alg,pac_hist) {
      $scope.paci = {
        per_id: per_id,
        seg_id: pac_seg,
        pac_grupo_sanguineo: pac_sang,
        pac_alergia: pac_alg,
        pe_hist_clinico: pac_hist,
        es_id: es_id
      };

      //Registre únicamente los datos del paciente cuando no está en ningún establecimiento
      Pacientes.save($scope.paci).$promise.then(function(data)
      {
        if(data.msg)
        {
          angular.copy({}, $scope.pacientes);
          $scope.ajustes.pagina.success = "PACIENTE REGISTRADO CORRECTAMENTE";
          PacienteEdad.get({pac_id:data.paciente.pacientes.pac_id}, function(data){
            $scope.pac_edad=data.paciente_edad.edad;
          });
          $timeout(function() {
            if($scope.pac_edad>=15){//Cuando al paciente se le asigna una cuenta
              $location.path('/pacientes/ver/'+data.paciente.pacientes.pac_id+'/'+$scope.pac_edad);
            }
            else{//En caso de que no se asigne una cuenta al paciente
              $location.path('/pacientes/ver/'+data.paciente.pacientes.pac_id);
            }
          },1000);
          var toast = toastr.success("PACIENTE REGISTRADO CORRECTAMENTE");
          toastr.refreshTimer(toast, 10000);
        }
      }, function () {
        toastr.error("ERROR INESPERADO");
      })
    }

    /* registro  27/02/2017 */
    $scope.add_pac=false;
    $scope.busca_pac=true;

    $scope.agregar_pac=function(per_id, variable)
    {  
      if(variable== '1'){
        $timeout(function() {
          $location.path('/pacientes/createPr/'+per_id);//Registra a una persona de la que se tienen sus datos personales
        },1000);
      }else if(variable== '0'){
        $timeout(function() {
          $location.path('/pacientes/createPrE/'+per_id);//Registra a una persona que realizó su preregistro
        },2000);
      }
    }

    var per_id=$routeParams.per_id;
    Personas.get({per_id:per_id},function(data)
    {
      $scope.personas_encontrada = data.persona;
      if($scope.personas_encontrada.persona.per_genero == "F" || $scope.personas_encontrada.persona.per_genero == "f" ) {
        $scope.genero="FEMENINO";
      }else if($scope.personas_encontrada.persona.per_genero == "M" || $scope.personas_encontrada.persona.per_genero == "m"){
        $scope.genero="MASCULINO";
      };

      $http.get(CONFIG.DOMINIO_SERVICIOS+'/paciente_ci/'+$scope.personas_encontrada.persona.per_ci).success(function(respuesta){          
        $scope.personas_pac = respuesta.paciente;
        for (var i = 0; i < $scope.personas_pac.length; i++) {
          if(respuesta.paciente[i].per_id == per_id){
            $scope.pacientes=respuesta.paciente[i];
          }
        }
      });
    });  
}])

.controller('CreatePacientePersonaCtrl',['$scope', 'PacientePersona', 'PacienteEdad', 'toastr','$location', '$timeout','$routeParams',
function ($scope, PacientePersona, PacienteEdad, toastr, $location, $timeout, $routeParams)
{
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Pacientes',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
          {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:'active'}]
      },
      pagina:{
        titulo:'Registrar Paciente',
        action:'CREAR'
      }
    }

    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    $scope.mensaje="hola";
    $scope.boton="registrar";

    $scope.pacientes = {
      per_ci: null,
      per_ci_expedido: null,
      per_nombres: null,
      per_apellido_primero: null,
      per_apellido_segundo: null,
      per_fecha_nacimiento: null,
      per_genero: null,
      per_email: null,
      per_tipo_permanencia: "RESIDENTE",
      per_numero_celular: null,
      per_clave_publica: "12",
      ima_nombre:"perfil.jpg",
      ima_enlace: "./img-per",
      ima_tipo: "fotografia",
      dir_zona_comunidad: null,
      dir_avenida_calle: null,
      dir_numero: null,
      dir_tipo: "DOMICILIO",
      mun_id:null,
      seg_id: 1,
      pac_grupo_sanguineo: "NINGUNO",
      pac_alergia: "NINGUNO",
      pe_hist_clinico: null,
      es_id: FunG.es_id,
      per_tipo_documento: null,
      per_pais: "BOLIVIA"
    };

    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9.]*$/;
    
    /*PARA EL SELECT DE TIPO DE DOCUMENTO  11/03/2017*/
    $scope.required = true;
    $scope.exp=true;
    $scope.documento=function(){
      $scope.exp=true;
      $scope.exp_ext=false;
      $scope.sin_doc=false;
      $scope.required = true;
      $scope.required_p = false;   // valida el required del pais :)
      $scope.required_e = false;  // valida el required del expedido :)
      $scope.disabled = false;
      $scope.disabled_pais=true;  // valida el disabled del pais :)

      if($scope.pacientes.per_tipo_documento=="PASAPORTE"){
        $scope.exp=false;
        $scope.exp_ext=true;
        $scope.valor_exp="EXTRANJERO";
        $scope.disabled = false;
        $scope.required = true;
        $scope.required_p = true;    // valida el required del pais :)
        $scope.required_e = false;   // valida el required del expedido :)
        $scope.disabled_pais=false;   // valida el disabled del pais :)
      };
      if($scope.pacientes.per_tipo_documento=="SIN DOCUMENTO"){
        $scope.exp=false;
        $scope.exp_ext=true;
        $scope.valor_exp="LA PAZ";
        $scope.disabled = true;
        $scope.required = false;
        $scope.required_p = false;    // valida el required del pais :)
        $scope.required_e = false;    // valida el required del expedido :)
        $scope.disabled_pais=true;    // valida el disables del pais :)
      };
      if($scope.pacientes.per_tipo_documento=="CI"){
        $scope.exp=true;
        $scope.exp_ext=false;
        $scope.disabled = false;
        $scope.required = true;
        $scope.required_p = false;   // valida el required del pais :)
        $scope.required_e= true;    // valida el required del expedido :)
        $scope.disabled_pais=true;   // valida el disables del pais :)
      }
    };

    var SesionG = localStorage.getItem("Sesion");
    var SesionG = JSON.parse(SesionG);

    $scope.submit = function(b, per_ci, fechaNac)
    {
      $scope.pacientes.per_fecha_nacimiento=fechaNac;

      if($scope.pacientes.per_tipo_documento=="CI"){
        $scope.pacientes.per_pais="BOLIVIA";
      }

      if($scope.pacientes.per_tipo_documento=="PASAPORTE"){
        $scope.pacientes.per_ci_expedido="EXTRANJERO";
      }

      if($scope.pacientes.per_tipo_documento=="SIN DOCUMENTO"){
        $scope.pacientes.per_ci=1234567;
        $scope.pacientes.per_ci_expedido="LP";
      }
      PacientePersona.save($scope.pacientes).$promise.then(function(data)
      {
        if(data.msg)
        {
          angular.copy({}, $scope.pacientes);
          $scope.ajustes.pagina.success = "PACIENTE REGISTRADO CORRECTAMENTE";
          PacienteEdad.get({pac_id:data.paciente.pacientes.pac_id}, function(data1){
            $scope.pac_edad=data1.paciente_edad.edad;

            $timeout(function() {
              if($scope.pac_edad>=15){//Cuando al paciente se le asigna una cuenta
                $location.path('/pacientes/ver/'+data.paciente.pacientes.pac_id+'/'+$scope.pac_edad);
              }
              else{//En caso de que no se asigne una cuenta al paciente
                $location.path('/pacientes/ver/'+data.paciente.pacientes.pac_id);
              }
            },1000);
            var toast = toastr.success("PACIENTE REGISTRADO CORRECTAMENTE");
            toastr.refreshTimer(toast, 10000);
            });
          
        }
      },function () {
        toastr.error("ERROR INESPERADO");
      })
    };
}])

//*************   REGISTRO DE PACIENTE cuando existe en la tabla temporal   
.controller('CreatePacientePrCtrl',['authUser', '$scope', 'FuncionarioPersona', 'toastr','$location', '$timeout', '$routeParams', 'Temporales','$http','CONFIG','PersonasTemporal',
function(authUser, $scope, FuncionarioPersona, toastr, $location, $timeout, $routeParams,Temporales,$http, CONFIG,PersonasTemporal)
{
  if(authUser.isLoggedIn()) {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Pacientes',
          items:[
            {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
            {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:'active'}]
        },
        pagina:{
          titulo:'Registrar Paciente',
          action:'CREAR'
        }
      }

      $scope.exp_ext=false;
      $scope.exp=true;
      $scope.disabled_pais=true;

      var per_id = $routeParams.per_id;
      PersonasTemporal.get({per_id:per_id}, function(data)
      {
        $scope.personas_encontrada=data.persona;
        var fecha_naci = new Date($scope.personas_encontrada.per_fecha_nacimiento);
        $scope.diacE = (('0' + fecha_naci.getDate()).slice(-2))+"";
        $scope.mescE = ('0' + (fecha_naci.getMonth() + 1)).slice(-2);
        $scope.aniocE = (fecha_naci.getFullYear() + 0)+"";

        if($scope.personas_encontrada.per_ci_expedido == 'EXTRANJERO'){
          $scope.exp_ext=true;
          $scope.exp=false;
          $scope.disabled_pais=false;
        }

      })
      /*PARA EL SELECT DE TIPO DE DOCUMENTO  11/03/2017*/
      $scope.required = true;
      $scope.exp=true;
      $scope.disabled_pais=true;
      $scope.documento=function(){
          $scope.exp=true;
          $scope.exp_ext=false;
          $scope.sin_doc=false;
          $scope.required = true;
          $scope.required_p = false;   // valida el required del pais :)
          $scope.required_e = false;  // valida el required del expedido :)
          $scope.disabled = false;
          $scope.disabled_pais=true;  // valida el disabled del pais :)

          if($scope.pacientes.per_tipo_documento=="PASAPORTE"){
              $scope.exp=false;
              $scope.exp_ext=true;
              $scope.valor_exp="EXTRANJERO";
              $scope.disabled = false;
              $scope.required = true;
              $scope.required_p = true;    // valida el required del pais :)
              $scope.required_e = false;   // valida el required del expedido :)
              $scope.disabled_pais=false;   // valida el disabled del pais :)
          };
          if($scope.pacientes.per_tipo_documento=="SIN DOCUMENTO"){
             $scope.exp=false;
             $scope.exp_ext=true;
             $scope.valor_exp="LA PAZ";
             $scope.disabled = true;
             $scope.required = false;
             $scope.required_p = false;    // valida el required del pais :)
             $scope.required_e = false;    // valida el required del expedido :)
             $scope.disabled_pais=true;    // valida el disables del pais :)
          };
          if($scope.pacientes.per_tipo_documento=="CI"){
             $scope.exp=true;
             $scope.exp_ext=false;
             $scope.disabled = false;
             $scope.required = true;
             $scope.required_p = false;   // valida el required del pais :)
             $scope.required_e= true;    // valida el required del expedido :)
             $scope.disabled_pais=true;   // valida el disables del pais :)
          }
        };
        $scope.pacientes = {
            per_id: 0,
            seg_id: 1,
            pac_grupo_sanguineo: "",
            pac_alergia: "",
            pe_hist_clinico: "",
            es_id: 3
        };

        /*para agregar a persona*/
      $scope.submit = function(b, fecha_naci, per){

        $scope.persona = {
          per_ci: $scope.personas_encontrada.per_ci,
          per_ci_expedido: $scope.personas_encontrada.per_ci_expedido,
          per_nombres: $scope.personas_encontrada.per_nombres,
          per_apellido_primero: $scope.personas_encontrada.per_apellido_primero,
          per_apellido_segundo: $scope.personas_encontrada.per_apellido_segundo,
          per_fecha_nacimiento: $scope.personas_encontrada.per_fecha_nacimiento,
          per_genero: $scope.personas_encontrada.per_genero,
          per_email: $scope.personas_encontrada.per_email,
          per_tipo_permanencia: $scope.personas_encontrada.per_tipo_permanencia,
          per_numero_celular: $scope.personas_encontrada.per_numero_celular,
          per_clave_publica: "NINGUNO",
          ima_nombre: "perfil.jpg",
          ima_enlace: "./img-per",
          ima_tipo: "fotografia",
          dir_zona_comunidad: $scope.personas_encontrada.per_zona_comunidad,
          dir_avenida_calle: $scope.personas_encontrada.per_avenida_calle,
          dir_numero: $scope.personas_encontrada.per_numero,
          mun_id: $scope.personas_encontrada.mun_id,
          dir_tipo: "DOMICILIO",
          per_pais: $scope.personas_encontrada.per_nacion,
          per_tipo_documento: $scope.personas_encontrada.per_tipo_documento,
          per_id: per
        };

        if(fecha_naci != null){
          $scope.persona.per_fecha_nacimiento=fecha_naci;
        }

        if($scope.persona.per_tipo_documento=="CI"){
          $scope.persona.per_pais="BOLIVIA";
        }

        if($scope.persona.per_tipo_documento=="PASAPORTE"){
          $scope.persona.per_ci_expedido="EXTRANJERO";
        }

        if($scope.persona.per_tipo_documento=="SIN DOCUMENTO"){
          $scope.persona.per_ci=1234567;
        }

        Temporales.save($scope.persona).$promise.then(function(data){
          if(data.msg){
            angular.copy({}, $scope.persona);
            $scope.ajustes.pagina.success = "El ciudadano registrada exitosamente";
            toastr.success('Ciudadano registrado correctamente');
            $timeout(function() {
              $location.path('/pacientes/createPr/'+data.persona.personas.per_id);
            },0);
          }
        });
      }
  }else{
        $location.path('/inicio');
  }
}])

.controller('CreatePacienteFamiliarCtrl',['authUser', '$scope', 'PersonasFamiliar', 'CONFIG','$http', 'toastr','$location', '$timeout','$routeParams',
function (authUser,$scope, PersonasFamiliar,  CONFIG, $http, toastr, $location, $timeout, $routeParams)
{
  if(authUser.isLoggedIn()) {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Familiares',
        items:[
          {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
          {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:'active'}]
      },
      pagina:{
        titulo:'Registrar Familiar',
        action:'CREAR'
      }
    }
    
    $scope.persona = {
      per_ci: null,
      per_ci_expedido: "LP",
      per_nombres: null,
      per_apellido_primero: null,
      per_apellido_segundo: null,
      per_fecha_nacimiento: null,
      per_genero: null,
      per_email: null,
      per_tipo_permanencia: "",
      per_numero_celular: null,
      per_clave_publica: "",
      ima_nombre: "perfil.jpg",
      ima_enlace: "./img-per",
      ima_tipo: "fotografia",
      dir_zona_comunidad: null,
      dir_avenida_calle: "",
      dir_numero: 0,
      mun_id: null,
      dir_tipo: "DOMICILIO",
      fam_parentesco: "",
      per_id: ""
    };
    $scope.settings = {
      pageTitle: "Registrar familiar",
      action: "REGISTRAR"  
    };

    $scope.msg=false;
    $scope.msg1=false;
    $scope.mg=true;
    var per_id = $routeParams.per_id;

    $scope.persona_fam = {};
    $scope.per_id=0;
    $scope.ci=0;
    $scope.nombre = ""; 
    $scope.apellido_p = ""; 
    $scope.apellido_m = "";
    $scope.parentesco = "";

    $http.get(CONFIG.DOMINIO_SERVICIOS+'/personas/'+per_id).success(function(respuesta){
        $scope.persona_fam.per_id = respuesta.persona.persona.per_id;
        $scope.persona_fam.ci = respuesta.persona.persona.per_ci;
        $scope.persona_fam.nombre = respuesta.persona.persona.per_nombres;
        $scope.persona_fam.apellido_p = respuesta.persona.persona.per_apellido_primero;
        $scope.persona_fam.apellido_m = respuesta.persona.persona.per_apellido_segundo;
    });

    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9]*$/;

    $scope.submit = function(b, fechaNacimiento, c){
      $scope.persona.per_id=per_id;
      $scope.persona.per_ci=c;
      $scope.persona.per_fecha_nacimiento=fechaNacimiento;
      PersonasFamiliar.save($scope.persona).$promise.then(function(data){
        if(data.msg){
          angular.copy({}, $scope.persona);
          $scope.ajustes.pagina.success = "El familiar fue registrad@ exitosamente";
          toastr.success('Familiar agregado Correctamente');
          $timeout(function() {
               $location.path('/pacientes/familiares/'+data.persona.familiar.per_id);
          },1000);
         }
      });
    }
    $scope.reset = function(form) {
      $scope.persona = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };
  } else {
    $location.path('/inicio');
  }
}])

.controller('CreateFamiliarCtrl',['$scope', 'Familiar', 'CONFIG','$http', 'toastr','$location', '$timeout','$routeParams','Personas',
function($scope, Familiar,  CONFIG, $http, toastr, $location, $timeout, $routeParams, Personas)
{
     
   $scope.familiar = {
     per_id: 0,
     per_id_familiar: 0,
     fam_parentesco: ""
   };

   $scope.get = function(per_id, per_pac){
      $scope.persona_fam.per_id=per_pac;
      Personas.get({per_id:per_id}, function(data){
        $scope.personaF = data.persona;
        $scope.msg = data.mensaje;
        //$scope.fecha_nac = moment($scope.persona.persona.per_fecha_nacimiento,"YYYY-MM-DD").format("DD-MM-YYYY");
      });
    };

   $scope.submit = function(per_id, per_id_familiar, fam_parentesco){
      $scope.familiar.per_id=per_id;
      $scope.familiar.per_id_familiar=per_id_familiar;
      $scope.familiar.fam_parentesco=fam_parentesco;

      Familiar.save($scope.familiar).$promise.then(function(data){
        if(data.msg){
          angular.copy({}, $scope.familiar);
          $scope.ajustes.pagina.success = "El familiar fue registrad@ exitosamente";
          toastr.success('Familiar agregado Correctamente'); 
          $timeout(function() {
              $location.path('/pacientes/familiares/'+data.familiar.familiar.per_id_familiar);
          },1000);
        }
      });
   }
}])

.controller('VerFamPacienteCtrl', ['authUser', '$scope', '$routeParams','toastr','$location', '$timeout','Familiar','Personas','CONFIG',
  function (authUser, $scope, $routeParams, toastr,$location, $timeout, Familiar, Personas, CONFIG){
  if(authUser.isLoggedIn()) {
    $scope.titulo= "Gestión de Pacientes";
    var SesionG = localStorage.getItem("Sesion");
    var SesionG = JSON.parse(SesionG);
    var rol_id1 = CONFIG.ROL_CURRENT_USER;
    $scope.rol_id = rol_id1;
    
    if (rol_id1==6 || rol_id1 == 3 || rol_id1==10){
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Pacientes',
          items:[
            {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''},
            {nombre:'Registrar Paciente', enlace:'#/pacientes/create', estilo:''},
            {nombre:'Familiares de paciente', enlace:'#/pacientes/familiares/'+$routeParams.per_id, estilo:'active'}]
        },
        pagina:{
          titulo:'Familiares del Paciente'
        }
      }
    }
    else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Pacientes',
          items:[
            {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''}]
        },
        pagina:{
          titulo:'Familiares del Paciente'
        }
      }
    };

    $scope.loading=true;

    var per_id = $routeParams.per_id;//obtiene el id

    Familiar.update({per_id:per_id}, $scope.var).$promise.then(function(data){

      if(data.mensaje){
        $scope.persona_fam = data.familiar;
        $scope.familiares = data.familiar.familiares;

        if(data.familiar.familiares.length!=0){
            $scope.ver=true;
        }else if(data.familiar.familiares.length==0){
            $scope.ver=false;
        } 

        if(data.mensaje && $scope.familiares.length > 0){
          $scope.loading = false;
          $scope.msg = true;
        }
        else {
          $scope.loading = false;
          $scope.msg = false;
        }  
      }
    })

    $scope.obt_fam=function(per_id){
      Personas.get({per_id:per_id}, function(data){
        $scope.persona = data.persona;
      });
    }

  } else {
    $location.path('/inicio');
  }
}])