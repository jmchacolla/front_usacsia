'use strict';
angular.module("adminApp")
// ------ CONTRAREFERENCIA -------
.controller('IndexContrareferenciaReaCtrl',['$scope','CONFIG', 'ContrareferenciasEstablecimientoDestino','$routeParams', 'Contrareferencias', '$route', 'toastr',
  function ($scope, CONFIG, ContrareferenciasEstablecimientoDestino,$routeParams,Contrareferencias, $route, toastr){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Contrareferencias',
      items:[
        {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
        {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
        {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:'active'}
        ]
    },
    pagina:{
      titulo:'Contrareferencias Realizadas'
    }
  }

  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fe_id = FunG.fe_id;
  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER,
    fun_id_origen: FunG.fe_id
  }

  $scope.sortType = 'created_at'; // set the default sort type
  $scope.sortReverse  = true; // set the default sort order

  $scope.loading=true;
  
  ContrareferenciasEstablecimientoDestino.get({es_id:FunG.es_id},function(data)
  {
    $scope.contrareferenciasrea = data.contrareferencia;
    if(data.status && $scope.contrareferenciasrea.length > 0){
      $scope.loading = false;
      $scope.msg = data.status;

    }
    else{
      $scope.loading = false;
    }
  },function () {
      $scope.loading = false;
      $scope.msg = false;
    });
  var ide=0;

  $scope.get_bc_id1 = function(bc_id,ap1,ap2,nombre)
  {
    ide=bc_id;
    $scope.nom=nombre;
    $scope.ap1=ap1;
    $scope.ap2=ap2;
  }

  $scope.remove2 = function()
  {
    Contrareferencias.delete({bc_id:ide}).$promise.then(function(data)
    {
      if(data.mensaje)
      {
        toastr.success('Contrareferencia eliminada correctamente');
        $route.reload();
      }
    })
  }

}])

//r e v i s a r !!!!!!!!!
.controller('IndexContrareferenciaRecCtrl',['$scope', 'CONFIG','ContrareferenciasEstablecimientoOrigen','$routeParams', 
  function ($scope, CONFIG, ContrareferenciasEstablecimientoOrigen,$routeParams){
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {  
    if ($scope.user.rol_id == 2 || $scope.user.rol_id == 3 || $scope.user.rol_id == 4 || $scope.user.rol_id == 9 || $scope.user.rol_id == 10)
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
        },
        pagina:{
          titulo:'Contrareferencias Recibidas'
        }
      }
    }else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:'active'}]
        },
        pagina:{
          titulo:'Contrareferencias Recibidas'
        }
      }
    }
  } else {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:'active'}]
      },
      pagina:{
        titulo:'Contrareferencias Recibidas'
      }
    }
  }  
  
  $scope.sortType = 'created_at'; // set the default sort type
  $scope.sortReverse  = true; // set the default sort order

  $scope.loading=true;

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  ContrareferenciasEstablecimientoOrigen.get({es_id:FunG.es_id}, function(data)
  {
    $scope.contrareferenciasrec = data.contrareferencia;
    if(data.mensaje && $scope.contrareferenciasrec.length > 0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else {
      $scope.loading = false;
      $scope.msg = false;
    }
  },function () {
      $scope.loading = false;
      $scope.msg = false;
    });
}])

.controller('CreaContrareferenciaCtrl',['authUser','$scope','PacienteEdad','Funcionarios','Establecimientos','EstablecimientoPresta','Funcionario','Contrareferencias','Referencia','$routeParams','CONFIG', '$location', '$timeout', 'toastr',
  function (authUser,$scope,PacienteEdad,Funcionarios,Establecimientos,EstablecimientoPresta,Funcionario,Contrareferencias,Referencia,$routeParams,CONFIG,$location, $timeout, toastr){
if(authUser.isLoggedIn()){
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
          {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
      },
      pagina:{
        titulo:'Nueva Contrareferencia'
      }
    }
  } else {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''}]
      },
      pagina:{
        titulo:'Nueva Contrareferencia'
      }
    }
  }
  $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9]*$/;
  /*-------  INDICE DE MASA CORPORAL  -------*/
  $scope.imc=0;

  $scope.imc_fun=function(a,b){

      if(a==null || b==null)
      {   
          $scope.imc=0;
      }
      else if(a!=null && b!=null)
      {   
          var aa=(a).toFixed(2);
          var bb=(b).toFixed(2);
          $scope.imc=(a/Math.pow(b,2)).toFixed(2);
      }
  }
  /*------------------------------------------*/

    $scope.seleccionados = ['NINGUNA'];
    $scope.final= $scope.seleccionados.toString();
    $scope.busca = function (item) {
        var idx = $scope.seleccionados.indexOf(item);
        if (idx > -1)
            $scope.seleccionados.splice(idx, 1);
        else{
          if ($scope.seleccionados.indexOf('NINGUNA')>-1)
          {
            $scope.seleccionados.splice('NINGUNA', 1);
          } 
           $scope.seleccionados.push(item);
        }
        if ($scope.seleccionados.length==0)
          {
            $scope.seleccionados = ['NINGUNA'];
          }
        $scope.final= $scope.seleccionados.toString();
    };
    $scope.existe = function (item) {
        return $scope.seleccionados.indexOf(item) > -1;
    };



  /*------------------------------------------*/

  $scope.CurrentDate = new Date();
  var br_id = $routeParams.br_id;
  Referencia.get({br_id:br_id}, function(data)
  {
    $scope.referencia = data.referencia;
    if ($scope.referencia.persona_paciente.per_genero=='F' || $scope.referencia.persona_paciente.per_genero=='f'){
      $scope.referencia.persona_paciente.per_genero='FEMENINO';
    }
    else if($scope.referencia.persona_paciente.per_genero=='M' || $scope.referencia.persona_paciente.per_genero=='m'){
      $scope.referencia.persona_paciente.per_genero='MASCULINO';
    }
    
    Funcionario.get({es_id:$scope.referencia.establecimiento_origen.es_id}, function(data)
  /*  Funcionario.get({fe_id:$scope.referencia.fe_id_origen}, function(data)*/
    {
      $scope.funcionarios = data.funcionario;
      
      EstablecimientoPresta.get({es_id:$scope.referencia.establecimiento_origen.es_id}, function(data)
      {
          $scope.prestas = data.servicio_especialidad;
      });
    })
    
    PacienteEdad.get({pac_id:$scope.referencia.referencia.pac_id}, function(data)
    {
        $scope.pac_edad = data.paciente_edad;
    })

    Establecimientos.get({es_id:$scope.referencia.establecimiento_destino.es_id}, function(data)
    {
      $scope.establecimiento = data.establecimiento;
    });
  })
  

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fe_id = FunG.fe_id;
  Funcionarios.get({fe_id:fe_id}, function(data)
  {
    $scope.funcionario_contra = data.funcionario;
    $scope.fun_origen=$scope.funcionario_contra.persona.per_nombres+' '+$scope.funcionario_contra.persona.per_apellido_primero+' '+$scope.funcionario_contra.persona.per_apellido_segundo;
  });

  $scope.contrareferencia = {
  br_id:null,
  fe_id_destino: null,
  fe_id_contacto: null,
  bc_cod: "",
  bc_servicio_referente: "",
  bc_dias_internacion: 0,
  bc_peso:null,
  bc_temp: "",
  bc_pa_sistolica: "",
  bc_fc: "",
  bc_fr: "",
  bc_diagnostico_egreso: "",
  bc_complicaciones: "",
  bc_examenes_dx: "",
  bc_exa_interconsultas: "",
  bc_tratamientos: "",
  bc_seguimento_trat: "",
  bc_recomendaciones: "",
  bc_referencia_fue: "",
  bc_acomp: "",
  bc_fecha_llegada:null,
  bc_hora_llegada:null,
  bc_estado_contrareferencia:false,
  bc_pa_diastolica:"",
  bc_talla:null,
  fe_id_origen: null
  };

  $scope.reset_cont=function(a){
    if(a==false)
      $scope.contrareferencia.fe_id_contacto=null; 
  }
  $scope.reset_acomp=function(a){
    if(a==false)
      $scope.contrareferencia.bc_acomp=""; 
  }
  // $scope.save=function(a,es_id_des, fun_id_des, br_cod, br_id,bc_servicio_referente,bc_dias_internacion,bc_temp,bc_pa,bc_fr,bc_diag_egreso,bc_compli,bc_examenes_dx,bc_exa_inter,
  //   bc_tratamientos,bc_seguimento_trat,bc_recomendaciones,bc_referencia_fue,pac_id, es_id_ori)
  $scope.save=function(a,br_id,br_cod,serv,final)
  // $scope.save=function()
  {   
    $scope.contrareferencia.br_id=br_id;
    $scope.contrareferencia.bc_cod=br_cod;
    $scope.contrareferencia.fe_id_origen=fe_id;
    $scope.contrareferencia.bc_servicio_referente=serv;
    $scope.contrareferencia.bc_referencia_fue=final;

    Contrareferencias.save($scope.contrareferencia).$promise.then(function(data)
    {
      if(data.status)
      {
        angular.copy({},$scope.contrareferencia);
        $scope.ajustes.pagina.success="Paciente contrareferenciado exitosamente";
        toastr.success('Contrareferenciado correctamente');
        $timeout(function() {
          $location.path('/contrareferencia/ver/'+data.contrareferencia.contrareferencia.bc_id);
        },1000);
      }
    });
  }

  $scope.reset = function(form) {
    $scope.contrareferencia = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };
  } else {
    $location.path('/inicio');
  }
}])

.controller('VerContrareferenciaCtrl',['authUser','CONFIG', '$scope', 'Contrareferencias', 'Referencia', 'Establecimientos','Funcionarios','$routeParams', 'PacienteEdad', '$location',
  function (authUser,CONFIG, $scope, Contrareferencias, Referencia,Establecimientos,Funcionarios,$routeParams,PacienteEdad,$location){
if(authUser.isLoggedIn()){  
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if($scope.user.rol_id == 6){
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Boleta de Contrareferencia'
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Boleta de Contrareferencia'
        }
      }
    }
  }else{
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    { 
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}
            ]
        },
        pagina:{
          titulo:'Boleta de Contrareferencia'
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Contrareferencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''}]
        },
        pagina:{
          titulo:'Boleta de Contrareferencia'
        }
      }
    }
  }
  $scope.contraMedico = 0;//Condición para editar la contrareferencia
  var bc_id = $routeParams.bc_id;
  Contrareferencias.get({bc_id:bc_id},function(data)
  {
    $scope.contrareferencia = data.contrareferencia;
    $scope.es_ori = $scope.contrareferencia.establecimiento_origen[0];
    $scope.es_des = $scope.contrareferencia.establecimiento_destino[0];
    $scope.fecha_hora=new Date($scope.contrareferencia.contrareferencia.created_at);

    PacienteEdad.get({pac_id:$scope.contrareferencia.referencia.pac_id}, function(data) {
       $scope.pac_edad = data.paciente_edad;
    });

    $scope.imc=($scope.contrareferencia.contrareferencia.bc_peso/Math.pow($scope.contrareferencia.contrareferencia.bc_talla,2)).toFixed(2);

    if($scope.contrareferencia.persona_paciente.per_genero=='F'|| $scope.contrareferencia.persona_paciente.per_genero=='f'){
        $scope.contrareferencia.persona_paciente.per_genero='FEMENINO';
    }
    else if($scope.contrareferencia.persona_paciente.per_genero=='M'|| $scope.contrareferencia.persona_paciente.per_genero=='m'){
        $scope.contrareferencia.persona_paciente.per_genero='MASCULINO';
    }

    if($scope.contrareferencia.contrareferencia.fe_id_contacto != null){
        Funcionarios.get({fe_id:$scope.contrareferencia.contrareferencia.fe_id_contacto},function(data)
        {
          $scope.funcionario = data.funcionario;
          $scope.fun_cont_nombre=$scope.funcionario.persona.per_nombres;
          $scope.fun_cont_apellido_primero=$scope.funcionario.persona.per_apellido_primero;
          $scope.fun_cont_apellido_segundo=$scope.funcionario.persona.per_apellido_segundo;
          $scope.fun_cont_cargo=$scope.funcionario.funcionario_establecimiento.fe_cargo;
        });
    }


    $scope.func_per=$scope.contrareferencia.funcionario_origen[0].per_nombres+' '+$scope.contrareferencia.funcionario_origen[0].per_apellido_primero+' '+$scope.contrareferencia.funcionario_origen[0].per_apellido_segundo;
    if($scope.contrareferencia.contrareferencia.fe_id_destino != null){
        Funcionarios.get({fe_id:$scope.contrareferencia.contrareferencia.fe_id_destino},function(data2)
        {
          $scope.funcionario2 = data2.funcionario;
          $scope.fun_cont_nombre_dest=$scope.funcionario2.persona.per_nombres+" "+$scope.funcionario2.persona.per_apellido_primero+" "+$scope.funcionario2.persona.per_apellido_segundo;
          $scope.fun_cont_cargo_dest=$scope.funcionario2.fun_cargo;
        });
    }


    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var fe_id = FunG.fe_id;
    /***********************PARA EDITAR LA CONTRAREFERENCIA**************************/
    if($scope.contrareferencia.contrareferencia.fe_id_origen == fe_id){
      $scope.contraid = $scope.contrareferencia.contrareferencia.bc_id;
      $scope.contraMedico = 1;
    }
  });

} else {
    $location.path('/inicio');
  }
}])

.controller('EditarContrareferenciaCtrl',['authUser', '$scope', 'Contrareferencias', 'Referencia','Funcionario','Funcionarios','$routeParams', 'PacienteEdad','$location', '$timeout', 'toastr',
  function (authUser,$scope, Contrareferencias, Referencia,Funcionario,Funcionarios,$routeParams,PacienteEdad,$location, $timeout, toastr){
if(authUser.isLoggedIn()){  
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
          {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
      },
      pagina:{
        titulo:'Editar Boleta de Contrareferencia'
      }
    }
  } else {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''}]
      },
      pagina:{
        titulo:'Editar Boleta de Contrareferencia'
      }
    }
  }
  var bc_id = $routeParams.bc_id;
  Contrareferencias.get({bc_id:bc_id},function(data)
  {
    $scope.contrareferencia = data.contrareferencia;
    $scope.contra = $scope.contrareferencia.contrareferencia;
    $scope.fecha_hora=new Date($scope.contrareferencia.contrareferencia.created_at);
    $scope.es_ori = $scope.contrareferencia.establecimiento_origen[0];
    Funcionario.get({es_id:$scope.es_ori.es_id}, function(data)
    {
      $scope.funcionarios = data.funcionario;
    });
    if ($scope.contrareferencia.contrareferencia.fe_id_contacto!=null){
      Funcionarios.get({fe_id:$scope.contrareferencia.contrareferencia.fe_id_contacto},function(data)
      {
        $scope.funcionario_contacto = data.funcionario;
        $scope.fun_id_contacto=$scope.funcionario_contacto.persona.per_nombres+' '+$scope.funcionario_contacto.persona.per_apellido_primero+' '+$scope.funcionario_contacto.persona.per_sapellido_egundo+"   -  "+$scope.funcionario_contacto.funcionario_establecimiento.fe_cargo;
      });
      $scope.check_cont=true;
    }

    $scope.es_des = $scope.contrareferencia.establecimiento_destino[0];
    PacienteEdad.get({pac_id:$scope.contrareferencia.referencia.pac_id}, function(data)
    {
       $scope.pac_edad = data.paciente_edad;
    });
    if($scope.contrareferencia.persona_paciente.per_genero=='F'|| $scope.contrareferencia.persona_paciente.per_genero=='f'){
        $scope.contrareferencia.persona_paciente.per_genero='FEMENINO';
    }
    else if($scope.contrareferencia.persona_paciente.per_genero=='M'|| $scope.contrareferencia.persona_paciente.per_genero=='m'){
        $scope.contrareferencia.persona_paciente.per_genero='MASCULINO'; 
    }
    $scope.contrareferencia.contrareferencia.bc_dias_internacion=parseInt($scope.contrareferencia.contrareferencia.bc_dias_internacion);
    $scope.contrareferencia.contrareferencia.bc_peso=parseFloat($scope.contrareferencia.contrareferencia.bc_peso);
    $scope.contrareferencia.contrareferencia.bc_talla=parseFloat($scope.contrareferencia.contrareferencia.bc_talla);
    $scope.imc=($scope.contrareferencia.contrareferencia.bc_peso/Math.pow($scope.contrareferencia.contrareferencia.bc_talla,2)).toFixed(2);
    $scope.contrareferencia.contrareferencia.bc_temp=parseFloat($scope.contrareferencia.contrareferencia.bc_temp);
    $scope.contrareferencia.contrareferencia.bc_pa_sistolica=parseFloat($scope.contrareferencia.contrareferencia.bc_pa_sistolica);
    $scope.contrareferencia.contrareferencia.bc_pa_diastolica=parseFloat($scope.contrareferencia.contrareferencia.bc_pa_diastolica);
    $scope.contrareferencia.contrareferencia.bc_fc=parseFloat($scope.contrareferencia.contrareferencia.bc_fc);
    $scope.contrareferencia.contrareferencia.bc_fr=parseFloat($scope.contrareferencia.contrareferencia.bc_fr);

    $scope.final=$scope.contrareferencia.contrareferencia.bc_referencia_fue;
    $scope.seleccionados = ($scope.contrareferencia.contrareferencia.bc_referencia_fue).split(",");
    $scope.busca = function (item) {
        var idx = $scope.seleccionados.indexOf(item);
        if (idx > -1)
            $scope.seleccionados.splice(idx, 1);
        else{
          if ($scope.seleccionados.indexOf('NINGUNA')>-1)
          {
            $scope.seleccionados.splice('NINGUNA', 1);
          } 
           $scope.seleccionados.push(item);
        }
        if ($scope.seleccionados.length==0)
          {
            $scope.seleccionados = ['NINGUNA'];
          }
        $scope.final= $scope.seleccionados.toString();
    };
    $scope.existe = function (item) {
        return $scope.seleccionados.indexOf(item) > -1;
    };

    if ($scope.contrareferencia.contrareferencia.bc_acomp!=""){
        $scope.check_acomp=true;
    }

    $scope.fun_id_dest=$scope.contrareferencia.funcionario_origen[0].per_nombres+' '+$scope.contrareferencia.funcionario_origen[0].per_apellido_primero+' '+$scope.contrareferencia.funcionario_origen[0].per_apellido_segundo;    
    var aux1=0;
    $scope.reset_cont=function(a){
      if(a==false){
        aux1=$scope.contra.fun_id_contacto;
        $scope.contra.fun_id_contacto=null; 
      }
      else{
        $scope.contra.fun_id_contacto=aux1; 
      }
    }
    var aux2="";
    $scope.reset_acomp=function(a){
      if(a==false){
        aux2=$scope.contra.bc_acomp; 
        $scope.contra.bc_acomp=""; 
      }
      else{
          $scope.contra.bc_acomp=aux2;
      }
    }
  });

  $scope.editar=function(a,b){
      $scope.contra.bc_referencia_fue=b;
      Contrareferencias.update({bc_id:$scope.contra.bc_id},$scope.contra).$promise.then(function(data)
      {
        if(data.status)
        {
          $scope.ajustes.pagina.success="Contrareferencia editada correctamente";
          toastr.success('Contrareferencia editada correctamente');
          $timeout(function() {
            $location.path('/contrareferencia/ver/'+data.contrareferencia.bc_id);
          },1);
        }
      })
  }

  $scope.cancelar=function(a,b){
     $timeout(function() {
      $location.path('/contrareferenciasrea');
    },1);
  }
} else {
  $location.path('/contrareferenciasrea');
}
}])

.controller('RecepcionContraCtrl',['$scope', 'Contrareferencias', 'Referencia', 'Establecimientos','$routeParams', 'ContrareferenciaEstados','$route','toastr',
  function ($scope, Contrareferencias, Referencia,Establecimientos,$routeParams,ContrareferenciaEstados,$route,toastr){
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
          {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
      },
      pagina:{
        titulo:'Editar Boleta de Contrareferencia'
      }
    }
  } else {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión Contrareferencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''}]
      },
      pagina:{
        titulo:'Editar Boleta de Contrareferencia'
      }
    }
  }
/*-----------------------------recepcionar-------------------*/
  var id=0;
  $scope.get_bc_id2= function(bc_id,nombre,ap1,ap2)
  {
    id=bc_id;
    $scope.nom=nombre;
    $scope.ap1=ap1;
    $scope.ap2=ap2;
  }

  $scope.recepcionar = function()
  {
      var FunG = localStorage.getItem("Funcionario");
      var FunG = JSON.parse(FunG);
      var fun_id = FunG.fun_id;
      var date = new Date();
      $scope.contrareferencia_new={
        fun_id_destino: fun_id,
        //bc_fecha_llegada:date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate(),
        bc_fecha_llegada:date.getFullYear()+"-"+(date.getMonth()*1+1*1)+"-"+date.getDate(),
        bc_hora_llegada:date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
        bc_estado_contrareferencia:true
      };
      ContrareferenciaEstados.update({bc_id:id},$scope.contrareferencia_new).$promise.then(function(data)
      {
        if(data.status)
        {
          $scope.ajustes.pagina.success="RECEPCIONADO";
          toastr.success('Paciente recepcionado');
          $route.reload();
        }
      })
   }
}])

.controller('pdf_cont_Ctrl',['$scope', 'Contrareferencias', 'CONFIG','$routeParams', '$http', function ($scope, Contrareferencias, CONFIG, $routeParams, $http){
  // prepare the document definition using declarative approach
    var bc_id = $routeParams.bc_id;
    Contrareferencias.get({bc_id:bc_id}, function(data)
    {
      $scope.contrareferencias = data.contrareferencia;
        var fecha_cont=($scope.contrareferencias.contrareferencia.created_at).split(' ');
        var fechaC=fecha_cont[0];
        var horaC=fecha_cont[1];
        var fechaCONT = moment(fecha_cont,"YYYY-MM-DD").format("DD-MM-YYYY");

        if($scope.contrareferencias.persona_paciente.per_genero == 'F' || $scope.contrareferencias.persona_paciente.per_genero == 'f'){
            $scope.genero="Femenino";
        }else if($scope.contrareferencias.persona_paciente.per_genero == 'M' || $scope.contrareferencias.persona_paciente.per_genero == 'm'){
            $scope.genero="Masculino";
        };

        if($scope.contrareferencias.contrareferencia.bc_acomp == null){
            var acomp = "SIN ACOMPAÑANTE";
            var firma_acomp = "FIRMA USUARIO";
            var nom_acomp_usuario  =   $scope.contrareferencias.persona_paciente.per_nombres+'    '+$scope.contrareferencias.persona_paciente.per_apellido_primero+'    '+$scope.contrareferencias.persona_paciente.per_apellido_segundo;
            
        } else if($scope.contrareferencias.contrareferencia.bc_acomp != null){
            var acomp = $scope.contrareferencias.contrareferencia.bc_acomp;
            var firma_acomp = "FIRMA ACOMPAÑANTE";
            var nom_acomp_usuario  = $scope.contrareferencias.contrareferencia.bc_acomp;

        };

        var prueba="";
        var prueba1="";
        var prueba2="";

        if($scope.contrareferencias.contrareferencia.fe_id_contacto != null)
        {
          $scope.fun_cont_nombre1=$scope.contrareferencias.funcionario_contacto[0].per_nombres;
          $scope.fun_cont_apellido_primero1=$scope.contrareferencias.funcionario_contacto[0].per_apellido_primero;
          $scope.fun_cont_apellido_segundo1=$scope.contrareferencias.funcionario_contacto[0].per_apellido_segundo;
          $scope.fun_cont_cargo1=$scope.contrareferencias.funcionario_contacto[0].fe_cargo;
          var contacto="SI";
        }else if($scope.contrareferencias.contrareferencia.fe_id_contacto == null){
          $scope.fun_cont_nombre1="Sin Contacto";
          $scope.fun_cont_apellido_primero1="";
          $scope.fun_cont_apellido_segundo1="";
          $scope.fun_cont_cargo1="--";

          var contacto="NO";
        };

        //============INICIO DE OBTENER LA EDAD
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/pacientes_edades/'+$scope.contrareferencias.referencia.pac_id).success(function(respuesta){
             $scope.edad = respuesta.paciente_edad;    
             if($scope.edad.edad <= 5)
             {
              $scope.edad_pac_a=$scope.edad.edad+" años";
              $scope.edad_pac_m=$scope.edad.mes_n+" meses";
              $scope.edad_pac_d=$scope.edad.dia_a+" dias";
             } else if($scope.edad.edad > 5){
              $scope.edad_pac_a=$scope.edad.edad+ " años";
              $scope.edad_pac_m='';
              $scope.edad_pac_d='';
             };

             $scope.indice_corp = parseFloat($scope.contrareferencias.contrareferencia.bc_peso)/(parseFloat($scope.contrareferencias.contrareferencia.bc_talla)*parseFloat($scope.contrareferencias.contrareferencia.bc_talla));
             $scope.IMC = parseFloat($scope.indice_corp).toFixed(2);

            var bolivia="";
            var gober="";
            var sedes="";

            var img1 =convertImgToDataURLviaCanvas("./scripts/escudo_bolivia.png", function(base64Img) {
            bolivia =base64Img;
            //console.log("BASE 64"+bolivia);
            var img2 =convertImgToDataURLviaCanvas("./scripts/escudo-gober.png", function(base64Img) {
            gober =base64Img;
            var img3 =convertImgToDataURLviaCanvas("./scripts/logoSEDES.png", function(base64Img) {
            sedes =base64Img;

              var docDefinition = {
                //pageOrientation: 'landscape',
                //pageSize: 'LEGAL',
                pageMargins: [ 30, 5, 30, 5 ],
                content: [
                  {

                  table: {
                  widths: [230, 250, 240],
                  body: [
                      [
                        {
                          image: bolivia,
                          width: 53,
                          height: 48
                        },
                        {
                          image: gober,
                          width: 64,
                          height: 62
                        },
                        {
                          image: sedes,
                          width: 35,
                          height: 55
                        }
                      ],
                  ],

                  },
                  layout: 'noBorders',
                  style: 'cuerpo',
                  border: [true, false, true, false]

                },
                {
                   text: "CÓDIGO:  N°"+$scope.contrareferencias.contrareferencia.bc_cod, fontSize: 12, alignment: 'right'
                },
                {
                  text: "FORMULARIO N°2 \nBOLETA DE CONTRAREFERENCIA\n\n",
                  alignment: 'center',
                  style: 'header'  
                },
                {

                    table: {
                    widths: [530],

                      body: [
                        [
                              {text: 'ESTABLECIMIENTO AL QUE RETORNA EL USUARIO', bold: true, alignment: 'center', fontSize: 9, fillColor: '#a0d8c1',border: [true, true, true, true]}, 
                        ],
                        [
                           
                          {

                              table: {
                              headerRows: 1,
                              body: [
                                 [{text: 'NOMBRE DEL ESTABLECIMIENTO:', bold: true},$scope.contrareferencias.establecimiento_origen[0].es_nombre,{text: 'FECHA: ', bold: true},fechaCONT,{text: 'HORA: ', bold: true},horaC],
                                 [{text: 'SERVICIO REFERENTE:', bold: true},$scope.contrareferencias.contrareferencia.bc_servicio_referente,{text: 'RED:', bold: true},$scope.contrareferencias.establecimiento_origen[0].red_nombre,{text: 'Se contacto al\n establecimiento:', bold: true},contacto],
                                 [{text: 'NOMBRE DE LA PERSONA CONTACTADA:', bold: true},$scope.fun_cont_nombre1+" "+$scope.fun_cont_apellido_primero1+" "+$scope.fun_cont_apellido_segundo1,{text: 'CARGO:  ', bold: true}, $scope.fun_cont_cargo1,{text: '', bold: true},''],
                                ]
                              },
                              layout: 'noBorders',
                              style: 'cuerpo',
                              border: [true, false, true, false]
                            }
                        ],
                        [
                              {text: 'IDENTIFICACIÓN DEL USUARIO', bold: true, alignment: 'center', fontSize: 9, fillColor: '#a0d8c1',border: [true, true, true, true]}, 
                        ],
                        [                         
                          {

                              table: {
                              //widths: [240, 240, 240],
                              headerRows: 1,
                              body: [
                                  [{text: 'NOMBRE Y APELLIDO:', bold: true}, $scope.contrareferencias.persona_paciente.per_nombres+' '+$scope.contrareferencias.persona_paciente.per_apellido_primero+' '+$scope.contrareferencias.persona_paciente.per_apellido_segundo,{text: 'EDAD:', bold: true},$scope.edad_pac_a+" "+$scope.edad_pac_m+" "+$scope.edad_pac_d,{text: 'SEGURO:', bold: true}, $scope.contrareferencias.referencia.br_seguro],
                                  [{text: 'DOMICILIO:', bold: true},$scope.contrareferencias.direccion[0].dir_zona_comunidad+" "+$scope.contrareferencias.direccion[0].dir_avenida_calle+" N° "+$scope.contrareferencias.direccion[0].dir_numero,'','','',''],
                                  //[,'','','',''],
                              ]
                              },
                              layout: 'noBorders',
                              style: 'cuerpo',
                              border: [true, false, true, true]
                          }
                        ],
                        [
                            {text:"DATOS CLÍNICOS", bold: true, alignment: 'center', fontSize: 9, fillColor: '#a0d8c1',border: [true, false, true, false]},
                        ],
                        [
                          {

                              table: {
                              headerRows: 1,
                              body: [
                                 [{text: 'DIAS DE INTERNACIÓN:', bold: true}, $scope.contrareferencias.contrareferencia.bc_dias_internacion,{text: 'SEXO:', bold: true},$scope.genero,{text: 'PESO:', bold: true},$scope.contrareferencias.contrareferencia.bc_peso+" (kg)",{text: 'TALLA:', bold: true},$scope.contrareferencias.contrareferencia.bc_talla+"  (m)",{text: 'I.M.C. :', bold: true},$scope.IMC+" (kg/m2)"],  
                                 ['','',{text: 'TEMP:', bold: true}, $scope.contrareferencias.contrareferencia.bc_temp+" (°C)",{text: 'P.A.:', bold: true},$scope.contrareferencias.contrareferencia.bc_pa_sistolica+"/"+$scope.contrareferencias.contrareferencia.bc_pa_diastolica+" (mmHg)",{text: 'F.C:', bold: true},$scope.contrareferencias.contrareferencia.bc_fc+"  (lpm) ",{text: 'F.R:', bold: true},$scope.contrareferencias.contrareferencia.bc_fr+"  (rpm)"],  
                              ]
                              },
                              layout: 'noBorders',
                              style: 'cuerpo',
                          }
                        ],
                        [                          
                         {

                              table: {
                              headerRows: 1,
                              body: [
                                 [{text: "DIAGNÓSTICO(S) DE INGRESO:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.referencia.br_diagnostico],  
                                 [{text: "DIAGNÓSTICO DE EGRESO SEGUN CIE - 10:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_diagnostico_egreso],  
                                 [{text: "EVOLUCIÓN, COMPLICACIONES:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_complicaciones],  
                                 [{text: "EXAMENES COMPLEMENTARIOS:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_examenes_dx],  
                                 [{text: "OTROS EXAMENES E INTERCONSULTAS:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.referencia.br_diagnostico],  
                                 [{text: "TRATAMIENTOS REALIZADOS:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_tratamientos],  
                                 [{text: "SEGUIMIENTO Y TRATAMIENTO:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_seguimento_trat],  
                                 [{text: "RECOMENDACIONES PARA EL USUARIO:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_recomendaciones],  
                                 [{text: "REFERENCIA FUE:   ", bold: true, style: 'cuerpo'},$scope.contrareferencias.contrareferencia.bc_referencia_fue],   
                                 ['',''],                                                   
                              ]
                              },
                              layout: 'noBorders',
                              style: 'cuerpo',
                          }                
                        ],
                        [
                          {text:"ESTABLECIMIENTO DE SALUD QUE RALIZA LA CONTRAREFERENCIA", bold: true, alignment: 'center', fontSize: 9, fillColor: '#a0d8c1',border: [true, false, true, false]},
                        ],
                         [
                         {

                            table: {
                            headerRows: 1,
                            body: [
                                   [{text: 'ESTABLECIMIENTO DE SALUD:', bold: true}, $scope.contrareferencias.establecimiento_destino[0].es_nombre,{text: '', bold: true},''],
                                   [{text: 'MUNICIPIO:', bold: true}, $scope.contrareferencias.establecimiento_destino[0].mun_nombre,{text: 'RED DE SERVICIOS', bold: true},$scope.contrareferencias.establecimiento_destino[0].red_nombre],
                              ]
                            },
                            layout: 'noBorders',
                            style: 'cuerpo',
                          }
                        ],
                        [
                         {

                            table: {
                            headerRows: 1,
                            body: [
                                    [{text: 'NOMBRE DEL ACOMPAÑANTE, FAMILIAR U OTROS:', bold: true}, acomp,'',''],
                                    [{text: 'CONTACTO DEL ESTABLECIMIENTO QUE REALIZA LA CONTRAREFERENCIA:  ', bold: true}, $scope.contrareferencias.funcionario_origen[0].per_nombres+'  '+$scope.contrareferencias.funcionario_origen[0].per_apellido_primero+'  '+ $scope.contrareferencias.funcionario_origen[0].per_apellido_segundo,'',''],

                                    [{text: 'CARGO:', bold: true}, $scope.contrareferencias.funcionario_origen[0].fe_cargo,'',''],
                              ]
                            },
                            layout: 'noBorders',
                            style: 'cuerpo',
                          }

                        ],
                        [
                          {

                            table: {
                            widths: [130, 130, 130,130],
                            body: [
                                  ['','','',''],
                                  ['','','\n\n',''],
                                  ['','','\n\n',''],                                  
                                  [{text: 'FIRMA Y SELLO DEL MEDICO TRATANTE', bold: true, alignment: 'center'},{text: 'SELLO DEL ESTABLECIMIENTO', bold: true,alignment: 'center'},{text: 'FIRMA USUSARIO', bold: true,alignment: 'center'},{text: firma_acomp, bold: true, alignment: 'center' }],
                                  [{text:$scope.contrareferencias.funcionario_origen[0].per_nombres+' '+$scope.contrareferencias.funcionario_origen[0].per_apellido_primero+' '+$scope.contrareferencias.funcionario_origen[0].per_apellido_segundo, alignment: 'center'},'',{text: $scope.contrareferencias.persona_paciente.per_nombres+' '+$scope.contrareferencias.persona_paciente.per_apellido_primero+' '+$scope.contrareferencias.persona_paciente.per_apellido_segundo, alignment: 'center'},{text: nom_acomp_usuario,alignment: 'center'}],
                              ]
                            },
                            layout: 'noBorders',
                            style: 'cuerpo1',
                          }
                        ],
                      ],
                      style: 'cuerpo' 
                    }     
                },
                  
                ],
                styles: {
                  header: {
                    bold: true,
                    color: '#000',
                    fontSize: 10
                  },
                  cuerpo: {
                    color: '#000',
                    fontSize: 8
                  },
                  cuerpo1: {
                    color: '#000',
                    fontSize: 7
                  },
                  demoTable: {
                    color: '#666',
                    fontSize: 10
                  },
                  tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                  },
                  tableExample: {
                    margin: [0, 5, 0, 15]
                  }
                }
             };       

              $scope.openPdf = function() {
                pdfMake.createPdf(docDefinition).open();
              };

              $scope.downloadPdf = function() {
                pdfMake.createPdf(docDefinition).download();
              };
         }); // ============== FIN DE OBTENER LA EDAD

        });//fin imagen escudo bolivia
        });//fin imagen gober
        });//fin imagen sedes

         function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
          };
          img.src = url;
        };
    });// ============  FIN Contrareferencias.get

}])

