'use strict';
angular.module("adminApp")
//referencias realizadas por el establecimientos
.controller('ListaRefCtrl',['$scope','CONFIG', 'ReferenciasEstablecimientoOrigen','Referencia','$routeParams', '$location', '$timeout', 'toastr','$route', function ($scope, CONFIG,ReferenciasEstablecimientoOrigen,Referencia,$routeParams, $location, $timeout, toastr,$route){
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {
    if ($scope.user.rol_id != 6)
    {  
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:'active'},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
        },
        pagina:{
          titulo:'Referencias Realizadas'
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:'active'},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Referencias Realizadas'
        }
      }
    }
  } else
  {
    if ($scope.user.rol_id != 6)
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:'active'},]
        },
        pagina:{
          titulo:'Referencias Realizadas'
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:'active'},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Referencias Realizadas'
        }
      }
    }
  }

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  $scope.fun_idor = FunG.fe_id;

  var es_id1 = FunG.es_id;

  $scope.sortType = 'created_at'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.loading=true;

  ReferenciasEstablecimientoOrigen.get({es_id:es_id1},  function(data)
  {
    $scope.referencias = data.referencia;
    if($scope.referencias.length > 0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
  });

  var ide=0;
  $scope.remove1 = function(br_id1,pat,mat,nom){
    ide=br_id1;
    $scope.nom=nom;
    $scope.ap1=pat;
    $scope.ap2=mat;
  }
  $scope.remove = function(){
    Referencia.delete({br_id:ide}).$promise.then(function(data){
      if(data.mensaje) {
        $timeout(function() {
          $route.reload();
        },1000);
      }
    })
  }
}])

//Referencias recibidas
.controller('ListaRefDesCtrl',['$scope','ReferenciasEstablecimientoDestino','toastr','$routeParams','$route','CONFIG',function ($scope,ReferenciasEstablecimientoDestino,toastr,$routeParams,$route,CONFIG){
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
/*  $scope.user = {
    rol_id: SesionG.rol_id
  }*/

  $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
 /* if ($scope.user.rol_id == 2 || $scope.user.rol_id == 3 || $scope.user.rol_id == 4 || $scope.user.rol_id == 9 || $scope.user.rol_id == 10)
  {*/
   if ($scope.user.rol_id == 2 || $scope.user.rol_id == 3 || $scope.user.rol_id == 4 || $scope.user.rol_id == 9 || $scope.user.rol_id == 10)
  {
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:'active'},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
        },
        pagina:{
          titulo:'Referencias Recibidas'
        }
      }
    } 
    else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:'active'}]
        },
        pagina:{
          titulo:'Referencias Recibidas'
        }
      }
    }
  }else if ($scope.user.rol_id == 6){
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:'active'},
          {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
      },
      pagina:{
        titulo:'Referencias Recibidas'
      }
    }
  }
 
  $scope.loading=true;
  $scope.sortType = 'created_at'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var es_id1 = FunG.es_id;
  ReferenciasEstablecimientoDestino.get({es_id:es_id1}, function(data) {
    $scope.refers = data.referencia;
    if($scope.refers.length > 0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
  });
}])

.controller('CreateRefCtrl', ['authUser', '$scope','$http','Referencia','Pacientes','Establecimientos','Funcionarios','Establecimiento','Funcionario','EstNiv','$routeParams', 'CONFIG', '$location', '$timeout', 'toastr','PacienteEdad','RedEs','EstablecimientoPresta',
  function (authUser,$scope,$http,Referencia,Pacientes,Establecimientos,Funcionarios,Establecimiento,Funcionario,EstNiv,$routeParams,CONFIG, $location, $timeout, toastr,PacienteEdad,RedEs,EstablecimientoPresta){
  if(authUser.isLoggedIn()){ 
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL'))) { 
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
        {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
        {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
        {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
        },
        pagina:{
          titulo:'Nueva Referencia',
          action: "CREAR"
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[{nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''}]
        },
        pagina:{
          titulo:'Nueva Referencia',
          action: "CREAR"
        }
      }
    }
    
    var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var fe_id = FunG.fe_id;
    Funcionarios.get({fe_id:fe_id}, function(data) {
      $scope.funcionarios = data.funcionario;
      $scope.fun_origen=$scope.funcionarios.persona.per_nombres+' '+$scope.funcionarios.persona.per_apellido_primero+' '+$scope.funcionarios.persona.per_apellido_segundo;
    });
    /*establecimiento que pertence el funcionario origen*/
    var es_id1 = FunG.es_id; 
    console.log("es iddd"+es_id1);
    /*establecimientos por red*/
    Establecimientos.get({es_id:es_id1}, function(data)
    {
      $scope.establecimientos = data.establecimiento;
      /*servicio*/      
      EstablecimientoPresta.get({es_id:es_id1}, function(data) {
          $scope.prestas = data.servicio_especialidad;
      });
      RedEs.get({es_id:es_id1}, function(data) {
        $scope.estables = data.establecimiento;
      });
      $scope.est = data.establecimiento.establecimientos;
      if ($scope.est.es_nivel =='TERCER NIVEL'){
        EstNiv.get({es_id:es_id1},function(data) { 
          $scope.estab3 = data.establecimiento;
        });
      }
      else if($scope.est.es_nivel =='SEGUNDO NIVEL'){
        EstNiv.get({es_id:es_id1},function(data)
        { 
              $scope.estab2 = data.establecimiento.establecimiento;
              $scope.estab3 = data.establecimiento.establecimiento1;
        });
      }
      else if($scope.est.es_nivel =='PRIMER NIVEL'){        
         EstNiv.get({es_id:es_id1},function(data)
         { 
            $scope.estab2 = data.establecimiento.establecimiento;
            $scope.estab3 = data.establecimiento.establecimiento1;
            $scope.estabc = data.establecimiento.establecimiento2;
         });
      }
    });

    var pac_id = $routeParams.pac_id;
    Pacientes.get({pac_id:pac_id}, function(data)
    {
      $scope.pacientes = data.paciente;
      if ($scope.pacientes.persona.per_genero=='F' || $scope.pacientes.persona.per_genero=='f'){
        $scope.pacientes.persona.per_genero='FEMENINO';
      }
      else if($scope.pacientes.persona.per_genero=='M' || $scope.pacientes.persona.per_genero=='m'){
        $scope.pacientes.persona.per_genero='MASCULINO';
      }
    });

    $scope.CurrentDate = new Date();/*var fecha2=($scope.referencias.referencia.created_at).split(' ');
    $scope.fecharef=moment(fecha2,"YYYY-MM-DD").format("DD-MM-YYYY");*/
    
    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    var re=this;
    var fun_idd =0;
    /*console.log("AAAAAAA:", fun_idd);*/
    re.buscaEst = function(){
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/establecimiento_salud/'+re.establecimiento.es_id).success(function(respuesta){
        re.estabs = respuesta.establecimiento;
      });
      fun_idd = re.establecimiento.es_id;
      console.log("Fun_iddd"+fun_idd );
      /*FUNCIONARIO CONTACTO*/
      Funcionario.get({es_id:fun_idd}, function(data)
      {
        $scope.funcs = data.funcionario;
      });
      /*SERVICIOS ESTABLEICMIENTO DESTINO*/
      EstablecimientoPresta.get({es_id:fun_idd}, function(data)
      {
          $scope.pres = data.servicio_especialidad;
      });
    };
    
    var peso=0;
    var talla = 0; 
    $scope.imc=null;
    $scope.calculapeso = function(a,b){
        
      if(a==null || b==null)
      {   
          $scope.imc2=0;
      }
      else if(a!=null && b!=null)
      {   
          var aa=(a).toFixed(2);
          var bb=(b).toFixed(2);
          $scope.imc2=(a/Math.pow(b,2)).toFixed(2);
      }
    }
    /*re.buscaFun = function(){
        console.log("Funccc:",re.funcionario.fun_id);
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+re.funcionario.fun_id).success(function(respuesta){
        re.funcs = respuesta.funcionario;
        console.log("res:", re.funcs);
        });
      }
      re.buscaFun2 = function(){
        console.log("Funccc:",re.funcionario.fun_id);
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+re.funcio.fun_id).success(function(respuesta){

       re.funcsc = respuesta.funcionario;
        console.log("res:", re.funcs);
        });
      }*/
      PacienteEdad.get({pac_id:pac_id}, function(data)
      {
        $scope.edad = data.paciente_edad;
      });

      $scope.refer = {
        pac_id:null,
        es_id_origen:null,
        es_id_destino:null,
        fe_id_origen:null,
        fe_id_destino:null,
        fe_id_contacto:null,
        br_cod:"",
        br_frec_cardiaca:"",
        br_frec_resp:"",
        br_pa_sistolica:"",
        br_temperatura:"",
        br_peso:"",
        br_resumen:"",
        br_resultado_examen:"",
        br_diagnostico:"",
        br_tratamiento_inicial:"",
        br_acomp:"",
        br_motivo:"",
        br_subsector:"",
        br_fecha_llegada:"",
        br_hora_llegada:"",
        br_fecha_recepcion:"",
        br_hora_recepcion:"",
        br_seguro:"",
        br_pa_diastolica:"",
        br_talla:"",
        br_estado_referencia:false,
        br_servicio_referente:"",
        br_servicio_destino:""
      };
      $scope.reset_cont=function(a){
          if(a==false)
          $scope.refer.fun_id_contacto=null; 
      }
      $scope.reset_acomp=function(a){
        if(a==false)
          $scope.refer.br_acomp=""; 
      }
      $scope.reset_estab=function(a){
        if(a==false){
           re.estabs.subsector.ss_nombre=""; 
           re.establecimiento=null;
           re.estabs.establecimientos.es_nivel="";
         }
      }
      $scope.save =function(es_id_origen,es_id_destino,fun_id_origen,fun_id_destino,fun_id_contacto,br_cod,br_frec_cardiaca,br_frec_resp,br_pa_sistolica,br_temperatura,br_peso,br_resumen,br_resultado_examen,br_diagnostico,br_tratamiento_inicial,br_acomp,br_motivo,br_subsector,br_fecha_llegada,br_hora_llegada,br_fecha_recepcion,br_hora_recepcion,br_seguro,br_pa_diastolica,br_talla,br_servicio_referente,br_servicio_destino){
          /*var date=new Date();*/
          $scope.refer={
                  pac_id:pac_id,
                  es_id_origen:es_id_origen,
                  es_id_destino:es_id_destino,
                  fe_id_origen:fun_id_origen,
                  fe_id_destino:fun_id_destino,
                  fe_id_contacto:fun_id_contacto,
                  br_cod:pac_id,
                  br_frec_cardiaca:br_frec_cardiaca,
                  br_frec_resp:br_frec_resp,
                  br_pa_sistolica:br_pa_sistolica,
                  br_temperatura:br_temperatura,
                  br_peso:br_peso,
                  br_resumen:br_resumen,
                  br_resultado_examen:br_resultado_examen,
                  br_diagnostico:br_diagnostico,
                  br_tratamiento_inicial:br_tratamiento_inicial,
                  br_acomp:br_acomp,
                  br_motivo:br_motivo,
                  br_subsector:br_subsector,
                  br_fecha_llegada:br_fecha_llegada,
                  br_hora_llegada:br_hora_llegada,
                  br_fecha_recepcion:br_fecha_recepcion,
                  br_hora_recepcion:br_hora_recepcion,
                  br_seguro:br_seguro,
                  br_pa_diastolica:br_pa_diastolica,
                  br_talla:br_talla,
                  br_estado_referencia:false,
                  br_servicio_referente:br_servicio_referente,
                  br_servicio_destino:br_servicio_destino
           };
          Referencia.save($scope.refer).$promise.then(function(data)
          {
            if(data.status)
            {
               angular.copy({}, $scope.refer);
               $scope.ajustes.pagina.success="Paciente referenciado correctamente";
               toastr.success('Creado correctamente');
               $timeout(function() {
                  $location.path('/referencias/ver/'+data.referencia.referencia.br_id);
               },1000);
            }
            else{
              toastr.danger('Ocurrio un error');
              $timeout(function() {
                  $location.path('/referencia/create/'+pac_id);
                },1000);
            }
          });
          }
  } else {
    $location.path('/inicio');
  }
}])

.controller('VerReferenciaCtrl', ['authUser', '$scope','Referencia','Funcionario','Funcionarios','$routeParams','PacienteEdad', '$location','VerContraDeReferencia',
  function (authUser,$scope,Referencia,Funcionario,Funcionarios,$routeParams,PacienteEdad,$location,VerContraDeReferencia){
if(authUser.isLoggedIn()){  
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  $scope.user = {
    rol_id: SesionG.rol_id
  }
  if ($scope.user.rol_id == 6){
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Ver Referencia'
        }
      }
    } else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Recibidas', enlace:'#/referencias', estilo:''},
            {nombre:'Contrareferencias Recibidas', enlace:'#/contrareferenciasrec', estilo:''}]
        },
        pagina:{
          titulo:'Ver Referencia'
        }
      }
    }
  }else{
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
        },
        pagina:{
          titulo:'Ver Referencia'
        }
      }
    }
    else{
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''}]
        },
        pagina:{
          titulo:'Ver Referencia'
        }
      }
    }
  }

  var br_id = $routeParams.br_id;
  /***********************PARA VER LA CONTRAREFERENCIA**************************/
  $scope.contra = 0;
  VerContraDeReferencia.get({br_id:br_id},function(data){
    //console.log("esto es de la contrarefereeeeeeeeeeeee");
    if(data.contrareferencia!=0)
      $scope.contra = data.contrareferencia.bc_id;
      //console.log(data);
  });



  /*********************FIIIIIIIN DE LA CONTRAREFERENCIA****************************/
  Referencia.get({br_id:br_id}, function(data)
  {
    $scope.referencias = data.referencia;
    console.log($scope.valor);
    if ($scope.referencias.persona_paciente.per_genero=='F'){
        $scope.referencias.persona_paciente.per_genero='Femenino';
    }
    else if($scope.referencias.persona_paciente.per_genero=='M'){
        $scope.referencias.persona_paciente.per_genero='Masculino';
    }
    PacienteEdad.get({pac_id:$scope.referencias.referencia.pac_id}, function(data) {
      $scope.edad = data.paciente_edad;
    });
    /*$scope.imc=(parseFloat($scope.referencias.referencia.br_peso,10)/(parseFloat($scope.referencias.referencia.br_talla,10)*parseFloat($scope.referencias.br_talla,10));*/
   /*$scope.imc=3;*/
   if($scope.referencias.referencia.br_peso==null || $scope.referencias.referencia.br_talla==null){   
          $scope.imc=0;
      }
      else if($scope.referencias.referencia.br_peso!=null && $scope.referencias.referencia.br_talla!=null)
      {   
          var aa=(parseInt($scope.referencias.referencia.br_peso,10)).toFixed(2);
          var bb=(parseFloat($scope.referencias.referencia.br_talla,10)).toFixed(2);
          $scope.imc=(aa/Math.pow(bb,2)).toFixed(2);
      }
   // console.log("imc",$scope.imc)
       var fecha_ref=($scope.referencias.referencia.created_at).split(' ');
       var fechaR=fecha_ref[0];
       var horaR=fecha_ref[1];
       $scope.fechaREF = moment(fecha_ref,"YYYY-MM-DD").format("DD-MM-YYYY");
       $scope.horaREF =horaR;
   /* var es_idd = $scope.referencias.referencia.es_id_destino;
    Funcionario.get({es_id:es_idd}, function(data)
    {
      $scope.funcs = data.funcionario;*/
      var fun_idd = $scope.referencias.referencia.es_id_destino;
         
       Funcionario.get({es_id:fun_idd}, function(data)
      {
        $scope.funcionarios = data.funcionario;
      });
     /* var fun_id1 = referencias.referencia.fun_id_destino;
      Funcionarios.get({fun_id:fun_id1}, function(data)
      {
        $scope.funcionarios = data.funcionario;
      });
      var fun_id2 = referencias.referencia.fun_id_contacto;
      Funcionarios.get({fun_id:fun_id2}, function(data)
      {
        $scope.funcionas = data.funcionario;
      });*/

    /*});*/

    if($scope.referencias.referencia.fe_id_contacto != null){
        Funcionarios.get({fe_id:$scope.referencias.referencia.fe_id_contacto},function(data)
        {
          $scope.funcionario = data.funcionario;
          $scope.fun_cont_nombre=$scope.funcionario.persona.per_nombres;
          $scope.fun_cont_apellido_primero=$scope.funcionario.persona.per_apellido_primero;
          $scope.fun_cont_apellido_segundo=$scope.funcionario.persona.per_apellido_segundo;
          $scope.fun_cont_cargo=$scope.funcionario.funcionario_establecimiento.fe_cargo;
        });
    }

    Funcionarios.get({fe_id:$scope.referencias.referencia.fe_id_origen},function(data)
    {
      $scope.funcio = data.funcionario;
      
    });
     /*funcionario destino*/

     if($scope.referencias.referencia.fe_id_destino != null){
          Funcionarios.get({fe_id:$scope.referencias.referencia.fe_id_destino},function(data)
          {
            $scope.funciod = data.funcionario;
            $scope.fun_dest_nombre=$scope.funciod.persona.per_nombres;
            $scope.fun_dest_apellido_primero=$scope.funciod.persona.per_apellido_primero;
            $scope.fun_dest_apellido_segundo=$scope.funciod.persona.per_apellido_segundo;
            $scope.fun_dest_cargo=$scope.funciod.funcionario_establecimiento.fun_cargo;

          });
     }
  });
} else {
    $location.path('/inicio');
  }
}])

.controller('EditarReferenciaCtrl', ['$scope','Referencia','Funcionario','CONFIG','Funcionarios', '$location', '$timeout', 'toastr','$routeParams', 
  function($scope,Referencia,Funcionario,CONFIG,Funcionarios, $location, $timeout, toastr,$routeParams){
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
  {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
          {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
      },
      pagina:{
        titulo:'Recepción Paciente',
        action:'EDITAR'
      }
    }
  } else{
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''}]
      },
      pagina:{
        titulo:'Recepción Paciente',
        action:'EDITAR'
      }
    }
  }
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  var fe_id = FunG.fe_id;
  Funcionarios.get({fe_id:fe_id}, function(data) {
    $scope.funcionarios = data.funcionario;

  });
  $scope.CurrentDate = new Date();
  var ed=this;
  var fun_idd =0;
  var br_id = $routeParams.br_id;
  Referencia.get({br_id:br_id}, function(data)
  {
    $scope.referencias = data.referencia;
    
   fun_idd = $scope.referencias.referencia.es_id_destino;
         
           Funcionario.get({es_id:fun_idd}, function(data)
          {
            $scope.funcs = data.funcionario;
          });
           Funcionario.get({es_id:fun_idd}, function(data)
          {
            $scope.funcsc = data.funcionario;
          });
   if ($scope.referencias.persona_paciente.per_genero=='F'){
        $scope.referencias.persona_paciente.per_genero='Femenino';
      }
      else if($scope.referencias.persona_paciente.per_genero=='M'){
        $scope.referencias.persona_paciente.per_genero='Masculino';
      }
     // console.log("funcc:", fun_idd);
  });
  // console.log("AAAAAAA:", fun_idd);

    // console.log("QQQQQQQQQQQ:", fun_idd);
    /*  var v=this;*/
      ed.buscaFun = function(){
          //console.log("Funccc:",ed.funcionario.fun_id);
          $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+ed.funcionario.fun_id).success(function(respuesta){

         ed.funcs = respuesta.funcionario;
          console.log("res:", ed.funcs);
          });
  
      }

      ed.buscaFun2 = function(){
          //console.log("Funccc:",ed.funcionario.fun_id);
          $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+ed.funcio.fun_id).success(function(respuesta){

         ed.funcsc = respuesta.funcionario;
          console.log("res:", ed.funcs);
          });
  
      }
      
      $scope.save =function(br_fecha_recepcion,br_hora_recepcion,br_estado_referencia){
          $scope.refer={
                      pac_id:$scope.referencias.paciente.pac_id,
                      es_id_origen:$scope.referencias.referencia.es_id_origen,
                      es_id_destino:$scope.referencias.referencia.es_id_destino,
                      fe_id_origen:$scope.referencias.referencia.fe_id_origen,
                      fe_id_destino:$scope.funcionarios.fe_id,
                      fe_id_contacto:$scope.referencias.referencia.fe_id_contacto,
                      br_cod:$scope.referencias.referencia.br_cod,
                      br_frec_cardiaca:$scope.referencias.referencia.br_frec_cardiaca,
                      br_frec_resp:$scope.referencias.referencia.br_frec_resp,
                      br_pa_sistolica:$scope.referencias.referencia.br_pa_sistolica,
                      br_temperatura:$scope.referencias.referencia.br_temperatura,
                      br_peso:$scope.referencias.referencia.br_peso,
                      br_resumen:$scope.referencias.referencia.br_resumen,
                      br_resultado_examen:$scope.referencias.referencia.br_resultado_examen,
                      br_diagnostico:$scope.referencias.referencia.br_diagnostico,
                      br_tratamiento_inicial:$scope.referencias.referencia.br_tratamiento_inicial,
                      br_acomp:$scope.referencias.referencia.br_acomp,
                      br_motivo:$scope.referencias.referencia.br_motivo,
                      br_subsector:$scope.referencias.referencia.br_subsector,
                      br_fecha_llegada:$scope.CurrentDate.getFullYear()+"-"+$scope.CurrentDate.getMonth()+1+"-"+$scope.CurrentDate.getDate(),
                      br_hora_llegada:$scope.CurrentDate.getHours()+":"+$scope.CurrentDate.getMinutes()+":"+$scope.CurrentDate.getSeconds(),
                      br_fecha_recepcion:br_fecha_recepcion,
                      br_hora_recepcion:br_hora_recepcion,
                      br_seguro:$scope.referencias.referencia.br_seguro,
                      br_estado_referencia:br_estado_referencia,
                      br_pa_diastolica:$scope.referencias.referencia.br_pa_diastolica,
                      br_talla:$scope.referencias.referencia.br_talla,
                      br_servicio_referente:$scope.referencias.referencia.br_servicio_referente
          };
          console.log($scope.refer);
          Referencia.update({br_id:$scope.referencias.referencia.br_id}, $scope.refer).$promise.then(function(data)
            {
              if(data.status)
              {
                console.log($scope.refer);
                $scope.ajustes.pagina.success ="Referencia editada correctamente";
                 toastr.success('Cambio realizado');
                 $timeout(function() {
                  $location.path('/referenciasRec');
                },1000);
              }
            })
          }
}])


.controller('RecepReferenciaCtrl', ['$scope','Referencia','Funcionario','CONFIG','Funcionarios', '$location', '$timeout', 'toastr','$routeParams','ReferenciaEstados','$route','PacienteEstablecimiento','Pacientes', 
  function($scope,Referencia,Funcionario,CONFIG,Funcionarios, $location, $timeout, toastr,$routeParams,ReferenciaEstados,$route,PacienteEstablecimiento, Pacientes){

 
  var br_ide = 0;
   $scope.rec=function(br_id1, pac_id,es_id_destino){
    br_ide=br_id1;
    Pacientes.get({pac_id:pac_id}, function(data)
      {
        $scope.pacientes = data.paciente;
        $scope.nombre=$scope.pacientes.persona.per_nombres+' '+$scope.pacientes.persona.per_apellido_primero+' '+$scope.pacientes.persona.per_apellido_segundo;

      });
    PacienteEstablecimiento.get({pac_id:pac_id,es_id:es_id_destino}, function(data){
      $scope.busca =data.estado;
      //console.log($scope.busca);
      if($scope.busca==true){
        console.log("si es true",$scope.busca);
      }
      else{
        console.log("es falso",$scope.busca);
      }
    });
  };

  
    $scope.recepcionar =function( pac_hist){
      var FunG = localStorage.getItem("Funcionario");
      var FunG = JSON.parse(FunG);
      var fe_id = FunG.fe_id;
      var es_id_destino=FunG.es_id;
      Funcionarios.get({fe_id:fe_id}, function(data) {
        $scope.funcionarios = data.funcionario;
      });

      $scope.CurrentDate = new Date();
      Referencia.get({br_id:br_ide}, function(data) {
          console.log("inicio el servicio")
          $scope.referencias = data.referencia;
          $scope.refer={
            fe_id_destino:fe_id,
            br_fecha_llegada:$scope.CurrentDate.getFullYear()+"-"+($scope.CurrentDate.getMonth()*1+1*1)+"-"+$scope.CurrentDate.getDate(),
            br_hora_llegada:$scope.CurrentDate.getHours()+":"+$scope.CurrentDate.getMinutes()+":"+$scope.CurrentDate.getSeconds(),
            br_estado_referencia:true,
            es_id:es_id_destino,
            pe_hist_clinico:pac_hist
          };
          /*console.log($scope.CurrentDate);
          console.log("siiiii",$scope.refer);
          console.log("siiiii",br_ide);*/
          ReferenciaEstados.update({br_id:br_ide}, $scope.refer).$promise.then(function(data)
            {
              console.log("entra a update")
              if(data.status)
              {

                  console.log("lo logro...");
                  toastr.success('Recepción correcta');
                  $route.reload();//COMENTAR ESTOOOOOOOO!!!!!!!!
               /* console.log($scope.refer);
                 toastr.success('Cambio realizado');
                 $route.reload();*/
              }
            })
        });
    }
}])

/////*******    Q U I T A Rrrrrrrrrr!!!!!!!!!!!
.controller('ListaRefTrueCtrl',['$scope', 'ReferTrue','$routeParams', '$location', '$timeout', 'toastr','$route', function ($scope, ReferTrue,$routeParams, $location, $timeout, toastr,$route){
  var SesionG = localStorage.getItem("Sesion");
  var SesionG = JSON.parse(SesionG);
  $scope.user = {
      usu_nick: SesionG.usu_nick,
      rol_id: SesionG.rol_id,
      per_id: SesionG.per_id,
    }
  if($scope.user.rol_id == 6){
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''}]
          
      },
      pagina:{
        titulo:'Referencias Recibidas'
      }
    }
  } else{
    if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
    {  
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
            {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
            
        },
        pagina:{
          titulo:'Referencias Recibidas Aceptadas'
        }
      }
    } else {
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de Referencias',
          items:[
            {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
            {nombre:'Referencias Recibidas Aceptadas', enlace:'#/refers', estilo:'active'}]
            
        },
        pagina:{
          titulo:'Referencias Recibidas Aceptadas'
        }
      }
    }
  }
  $scope.sortType = 'created_at'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  
  $scope.loading=true;
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);

  ReferTrue.get({es_id:FunG.es_id}, function(data) {
    $scope.refers = data.referencia;
    if($scope.refers.length > 0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
  });
}])

//Edita toda la referencia
.controller('EditarDosReferenciaCtrl', ['authUser', '$scope','Referencia','Funcionario','CONFIG','Funcionarios','Establecimientos','PacienteEdad','EstablecimientoPresta', '$location', '$timeout', 'toastr','$routeParams',
  function (authUser,$scope,Referencia,Funcionario,CONFIG,Funcionarios,Establecimientos,PacienteEdad,EstablecimientoPresta, $location, $timeout, toastr,$routeParams){
if(authUser.isLoggedIn()){
  if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))  
  { $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''},
          {nombre:'Referencias Recibidas', enlace:'#/referenciasRec', estilo:''},
          {nombre:'Contrareferencias Realizadas', enlace:'#/contrareferenciasrea', estilo:''}]
      },
      pagina:{
        titulo:'Editar Referencia',
        action:'EDITAR'
      }
    }
  } else {
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Referencias',
        items:[
          {nombre:'Referencias Realizadas', enlace:'#/referencias', estilo:''}]
      },
      pagina:{
        titulo:'Editar Referencia',
        action:'EDITAR'
      }
    }
  }
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  var fe_id = FunG.fe_id;
  Funcionarios.get({fe_id:fe_id}, function(data)
  {
    $scope.funcionarios = data.funcionario;
    $scope.fun_origen=$scope.funcionarios.persona.per_nombres+' '+$scope.funcionarios.persona.per_apellido_primero+' '+$scope.funcionarios.persona.per_apellido_segundo;
  });
  
  $scope.CurrentDate = new Date();
  var ed=this;
  var es_iddd =0;
  var br_id = $routeParams.br_id;
  Referencia.get({br_id:br_id}, function(data)
  {
    $scope.referencias = data.referencia;
    Establecimientos.get({es_id:$scope.referencias.referencia.es_id_origen}, function(data)
    {
      $scope.establecimientos = data.establecimiento;
     
    });
    PacienteEdad.get({pac_id:$scope.referencias.referencia.pac_id}, function(data)
    {
      $scope.edad = data.paciente_edad;
      console.log("EDADDDDDDDDD"+$scope.edad.edad);
    });

    var aux2="";
    $scope.reset_acomp=function(a){
      if(a==false){
        aux2=$scope.referencias.referencia.br_acomp; 
        $scope.referencias.referencia.br_acomp=""; 
      }
      else{
          $scope.referencias.referencia.br_acomp=aux2;
      }
    }
     var aux1=0;
    $scope.reset_cont=function(a){
      if(a==false){
        aux1=$scope.referencias.referencia.fe_id_contacto;
        $scope.referencias.referencia.fe_id_contacto=null; 
      }
      else{
        $scope.referencias.referencia.fe_id_contacto=aux1; 
      }
    }

    es_iddd = $scope.referencias.referencia.es_id_destino;
    $scope.referencias.referencia.br_frec_cardiaca=parseInt($scope.referencias.referencia.br_frec_cardiaca,10);
    $scope.referencias.referencia.br_frec_resp=parseInt($scope.referencias.referencia.br_frec_resp,10);
    $scope.referencias.referencia.br_pa_sistolica=parseInt($scope.referencias.referencia.br_pa_sistolica,10);
    $scope.referencias.referencia.br_pa_diastolica=parseInt($scope.referencias.referencia.br_pa_diastolica,10);
    $scope.referencias.referencia.br_temperatura =parseInt($scope.referencias.referencia.br_temperatura,10);
    $scope.referencias.referencia.br_peso=parseFloat($scope.referencias.referencia.br_peso,10);
    $scope.referencias.referencia.br_talla=parseFloat($scope.referencias.referencia.br_talla,10);
    $scope.imc2=($scope.referencias.referencia.br_peso/Math.pow($scope.referencias.referencia.br_talla,2)).toFixed(2);
    if ($scope.referencias.referencia.br_acomp!= null && $scope.referencias.referencia.br_acomp!= "") {
      $scope.checkedI=true;
    }
    if ($scope.referencias.referencia.fe_id_contacto!= null ) {
      $scope.checked=true;
    }
    //calculo del imc
    var pes=0;
    var tall = 0; 
    $scope.imc=null;
    $scope.calculapeso = function(a,b){
      if(a==null || b==null) {   
          $scope.imc2=0;
      }
      else if(a!=null && b!=null) {   
          var aa=(a).toFixed(2);
          var bb=(b).toFixed(2);
          $scope.imc2=(a/Math.pow(b,2)).toFixed(2);
      }
    }
    EstablecimientoPresta.get({es_id:$scope.referencias.referencia.es_id_origen}, function(data) {
        $scope.prestas = data.servicio_especialidad;
        console.log("presta origen:",$scope.prestas[0].ser_nombre);
    });
    EstablecimientoPresta.get({es_id:$scope.referencias.referencia.es_id_destino}, function(data) {
        $scope.pres = data.servicio_especialidad;
        console.log("presta destino:",$scope.pres[0].ser_nombre);
    });
    console.log("establecimiento destino",es_iddd);
    Funcionario.get({es_id:es_iddd}, function(data)
    {
      $scope.funcs = data.funcionario;
    });
     Funcionario.get({es_id:es_iddd}, function(data)
    {
      $scope.funcsc = data.funcionario;
    });
  });

    /*  buscar cargo de un funcionario*/
    /*  ed.buscaFun = function(){
          console.log("Funccc:",ed.funcionario.fun_id);
          $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+ed.funcionario.fun_id).success(function(respuesta){
          ed.funcs = respuesta.funcionario;
          console.log("res:", ed.funcs);
          });
      }
      ed.buscaFun2 = function(){
          $http.get(CONFIG.DOMINIO_SERVICIOS+'/funcionarios/'+ed.funcio.fun_id).success(function(respuesta){
          ed.funcsc = respuesta.funcionario;
          console.log("res:", ed.funcs);
          });
      }*/
       $scope.save =function(fun_id_origen,fun_id_contacto,br_frec_cardiaca,br_frec_resp,br_pa_sistolica,br_temperatura,br_peso,br_resumen,br_resultado_examen,br_diagnostico,br_tratamiento_inicial,br_acomp,br_motivo,br_seguro,br_pa_diastolica,br_talla,br_servicio_referente,br_servicio_destino){
        console.log("CONTACTO ES :",fun_id_contacto);
         $scope.refer={
                  pac_id:$scope.referencias.referencia.pac_id,
                  es_id_origen:$scope.referencias.referencia.es_id_origen,
                  es_id_destino:$scope.referencias.referencia.es_id_destino,
                  fun_id_origen:fun_id_origen,
                  fun_id_destino:$scope.referencias.referencia.fun_id_destino,
                  fun_id_contacto:fun_id_contacto,
                  br_cod:$scope.referencias.referencia.br_cod,
                  br_frec_cardiaca:br_frec_cardiaca,
                  br_frec_resp:br_frec_resp,
                  br_pa_sistolica:br_pa_sistolica,
                  br_temperatura:br_temperatura,
                  br_peso:br_peso,
                  br_resumen:br_resumen,
                  br_resultado_examen:br_resultado_examen,
                  br_diagnostico:br_diagnostico,
                  br_tratamiento_inicial:br_tratamiento_inicial,
                  br_acomp:br_acomp,
                  br_motivo:br_motivo,
                  br_subsector:$scope.referencias.referencia.br_subsector,
                  br_fecha_llegada:$scope.referencias.referencia.br_fecha_llegada,
                  br_hora_llegada:$scope.referencias.referencia.br_hora_llegada,
                  br_fecha_recepcion:$scope.referencias.referencia.br_fecha_recepcion,
                  br_hora_recepcion:$scope.referencias.referencia.br_hora_recepcion,
                  br_seguro:br_seguro,
                  br_pa_diastolica:br_pa_diastolica,
                  br_talla:br_talla,
                  br_estado_referencia:$scope.referencias.referencia.br_estado_referencia,
                  br_servicio_referente:br_servicio_referente,
                  br_servicio_destino:br_servicio_destino
           };
          console.log($scope.refer);
          Referencia.update({br_id:$scope.referencias.referencia.br_id}, $scope.refer).$promise.then(function(data)
            {
              if(data.status)
              {
                console.log($scope.refer);
                $scope.ajustes.pagina.success ="Referencia editada correctamente";
                toastr.success('Cambio realizado');
                $timeout(function() {
                    $location.path('/referencias/ver/'+data.referencia.br_id);
                },1000);

              }
            })
          }
          } else {
    $location.path('/inicio');
  }
}])


.controller('pdf_ref_Ctrl',['$scope', 'Referencia', '$routeParams','CONFIG', '$http',
  function ($scope, Referencia, $routeParams, CONFIG, $http){

  // prepare the document definition using declarative approach
  console.log("PDFFFFFFFFFFFF");
    var br_id = $routeParams.br_id;
    Referencia.get({br_id:br_id}, function(data)
   {
      $scope.referencias = data.referencia;
      $scope.direccion= data.referencia.direccion;

      console.log($scope.referencias);
      console.log("ENTROOOOOOO GET");
      console.log("ffffffff"+$scope.referencias.persona_paciente.per_genero);
      if($scope.referencias.persona_paciente.per_genero == 'F' || $scope.referencias.persona_paciente.per_genero == 'f'){
          $scope.genero="FEMENINO";
      }else if($scope.referencias.persona_paciente.per_genero == 'M' || $scope.referencias.persona_paciente.per_genero == 'm'){
          $scope.genero="MASCULINO";
      };

      if($scope.referencias.referencia.br_acomp == null){
          var acomp  =   $scope.referencias.persona_paciente.per_nombres+'    '+$scope.referencias.persona_paciente.per_apellido_primero+'    '+$scope.referencias.persona_paciente.per_apellido_segundo;
          var firma_acomp = "FIRMA USUARIO";
      } else if($scope.referencias.referencia.br_acomp != null){
          var acomp = $scope.referencias.referencia.br_acomp;
          var firma_acomp = "FIRMA ACOMPAÑANTE";

      };

      if($scope.referencias.referencia.fe_id_contacto != null){


        $scope.fun_cont_nombre1=$scope.referencias.funcionario_contacto[0].per_nombres;
        $scope.fun_cont_apellido_primero1=$scope.referencias.funcionario_contacto[0].per_apellido_primero;
        $scope.fun_cont_apellido_segundo1=$scope.referencias.funcionario_contacto[0].per_apellido_segundo;
        $scope.fun_cont_cargo1=$scope.referencias.funcionario_contacto[0].fe_cargo;

        var cont="SI";


      }else if($scope.referencias.referencia.fe_id_contacto == null){
         $scope.fun_cont_nombre1="sin contacto";
         $scope.fun_cont_apellido_primero1="";
         $scope.fun_cont_apellido_segundo1="";

         $scope.fun_cont_cargo1= "---";
         console.log("Resppp"+$scope.fun_cont_cargo1);
         var cont="NO";
      };

       var fecha_ref=($scope.referencias.referencia.created_at).split(' ');
       var fechaR=fecha_ref[0];
       var horaR=fecha_ref[1];

       var fechaREF = moment(fecha_ref,"YYYY-MM-DD").format("DD-MM-YYYY");

        // ============ INICIO DE OBTENER EDAD
        $http.get(CONFIG.DOMINIO_SERVICIOS+'/pacientes_edades/'+$scope.referencias.referencia.pac_id).success(function(respuesta){
             console.log("res:", respuesta);
             $scope.edad = respuesta.paciente_edad; 
             console.log("edad"+$scope.edad);

             if($scope.edad.edad < 5)
             {
              $scope.edad_pac_a=$scope.edad.edad+"  años";
              $scope.edad_pac_m=$scope.edad.mes_n+"  meses";
              $scope.edad_pac_d=$scope.edad.dia_a+"  dias";
             } else if($scope.edad.edad > 5){
              $scope.edad_pac_a=$scope.edad.edad+ "  años";
              $scope.edad_pac_m='';
              $scope.edad_pac_d='';
             };

             if($scope.edad.edad < 18)
             {
                 var acomp1 = $scope.referencias.referencia.br_acomp;
             } else if($scope.edad.edad > 18){
                 var acomp1 = $scope.referencias.persona_paciente.per_nombres+'    '+$scope.referencias.persona_paciente.per_apellido_primero+'    '+$scope.referencias.persona_paciente.per_apellido_segundo;
             };



          $scope.indice_corp = parseFloat($scope.referencias.referencia.br_peso)/(parseFloat($scope.referencias.referencia.br_talla)*parseFloat($scope.referencias.referencia.br_talla));
          $scope.resultado = parseFloat($scope.indice_corp).toFixed(2);


          var bolivia="";
          var gober="";
          var sedes="";

          var img1 =convertImgToDataURLviaCanvas("./scripts/escudo_bolivia.png", function(base64Img) {
          //console.log(base64Img);
          bolivia =base64Img;
          //console.log("BASE 64"+bolivia);
          var img2 =convertImgToDataURLviaCanvas("./scripts/escudo-gober.png", function(base64Img) {
          //console.log(base64Img);
          gober =base64Img;
          var img3 =convertImgToDataURLviaCanvas("./scripts/logoSEDES.png", function(base64Img) {
          //console.log(base64Img);
          sedes =base64Img;


          var docDefinition = {
          //pageOrientation: 'landscape',
          pageSize: 'LETTER',
          pageMargins: [ 30, 3, 30, 3 ],
          content: [
          {

            table: {
            widths: [240, 250, 240],
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
            text: "CÓDIGO: N°"+$scope.referencias.referencia.br_cod, fontSize: 12, alignment: 'right'
          },
          {
            text: "FORMULARIO N°1 \nBOLETA DE REFERENCIA\n\n",
            alignment: 'center',
            style: 'header'  
          },
          {

              table: {
              widths: [530],

                body: [
                  [
                      {text: 'ESTABLECIMIENTO DEL QUE SE REFIERE', bold: true, alignment: 'center', fontSize: 8, fillColor: '#a0d8c1',border: [true, true, true, true]}, 
                  ],
                  [    
                    {

                        table: {
                        headerRows: 1,
                        body: [
                            [{text: 'NOMBRE DEL ESTABLECIMIENTO:', bold: true}, $scope.referencias.establecimiento_origen.es_nombre,{text: 'RED DE SERVICIOS: ', bold: true},$scope.referencias.red.red_nombre],
                            [{text: 'FECHA:', bold: true}, fechaREF,{text: 'HORA:', bold: true, alignment: 'right'},horaR],
                            [{text: 'SERVICIO:', bold: true}, $scope.referencias.referencia.br_servicio_referente,'',''],
                         ]
                        },
                        layout: 'noBorders',
                        style: 'cuerpo',
                    }
                  ],
                  [
                        {text:"FICHA DE IDENTIFICACIÓN", bold: true, alignment: 'center', fontSize: 8, fillColor: '#a0d8c1',border: [true, false, true, false]},
                  ],
                  [
                    {
                        table: {
                        headerRows: 1,
                        body: [
                          // [{text: '', style: 'tableHeader', fontSize: 8},,{text:" "},{text:""}],
                          [{text: 'NOMBRE Y APELLIDO:', bold: true, border: [false, false, false, false]}, $scope.referencias.persona_paciente.per_nombres+'    '+$scope.referencias.persona_paciente.per_apellido_primero+'   '+$scope.referencias.persona_paciente.per_apellido_segundo, {text: 'SEXO:', bold: true},$scope.genero,{text: 'EDAD:', bold: true}, $scope.edad_pac_a+"  "+$scope.edad_pac_m+"  "+$scope.edad_pac_d,{text: 'SEGURO:', bold: true, alignment: 'right'},{text: $scope.referencias.referencia.br_seguro, alignment:'right'}],
                          [{text: 'DOMICILIO:', bold: true}, $scope.referencias.direccion[0].dir_zona_comunidad+'  '+$scope.referencias.direccion[0].dir_avenida_calle+'  '+"N°"+$scope.referencias.direccion[0].dir_numero, ' ', '','','','',''],
                          //[{text: 'SEGURO:', bold: true},$scope.referencias.referencia.br_seguro,'','','',''],
                         ]
                        },
                        
                        layout: 'noBorders',
                        style: 'cuerpo',
                        border: [true, true, true, false]
                    }
                  ],
                  [
                    {

                        table: {
                        headerRows: 1,
                        body: [
                          [{text: 'DATOS CLINICOS - SIGNOS VITALES:', bold: true},{text: 'F.C. :', bold: true},{text: $scope.referencias.referencia.br_frec_cardiaca+"  (lpm) "},{text: 'F.R. :  ', bold: true},{text: $scope.referencias.referencia.br_frec_resp+"  (rpm)"},{text: 'P.A. : ', bold: true},{text: $scope.referencias.referencia.br_pa_sistolica+'/'+$scope.referencias.referencia.br_pa_diastolica+" (mmHg)"},'',''],
                          ['',{text: 'TEMP : ', bold: true},{text: $scope.referencias.referencia.br_temperatura+" (°C)"},{text: 'PESO :  ', bold: true},{text: $scope.referencias.referencia.br_peso+" (kg)"},{text: 'TALLA :   ', bold: true},{text: $scope.referencias.referencia.br_talla+"  (m)"},{text: "I.M.C.  :", bold: true},$scope.resultado+"  (kg/m2)"],   
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
                          [ '',''],
                          [ {text: "RESUMEN ANAMNESIS CLINICO:   ", bold: true, style: 'cuerpo'}, $scope.referencias.referencia.br_resumen],
                          [ {text: "RESULTADOS, EXAMENES COMPLEMENTARIOS \nDE DIAGNÓSTICO:   ", bold: true, style: 'cuerpo'},$scope.referencias.referencia.br_resultado_examen],
                          [ {text: "DIAGNOSTICO PRESUNTIVO:   ", bold: true, style: 'cuerpo'},$scope.referencias.referencia.br_diagnostico], 
                          [ {text: "TRATAMIENTO INICIAL:   ", bold: true, style: 'cuerpo'},$scope.referencias.referencia.br_tratamiento_inicial],
                          [ '',''],
                         ]
                        },
                        
                        layout: 'noBorders',
                        style: 'cuerpo',
                    }
                  ],
                  [
                        {text: "CONSENTIMIENTO INFORMADO\n", bold: true, alignment: 'center', style: 'header', fontSize: 8, fillColor: '#a0d8c1',border: [true, false, true, false]},
                  ],
                  [
                    {
                      text:[
                          {text: [
                                  "Yo   "+acomp1+"    mayor de edad,  habiendoseme informado sobre el cuadro clinico, autorizo la referencia teniendo en cuenta que he sido informado(a) claramente sobre los riesgos y beneficios que se pueden presentar.\n\n\n\n"
                                 ], fontSize: 8
                          },                     
                       ],border: [true, true, true, false]
                    }
                  ],
                  [
                    {

                      table: {
                      widths: [200, 200],
                      body: [
                            //[{text: '....................................', bold: true, alignment: 'center'},{text: '....................................', bold: true, alignment: 'center'}],                                  
                            [{text: 'FIRMA USUARIO ....................................', bold: true, alignment: 'center'},{text: 'FIRMA ACOMPAÑANTE ....................................', bold: true, alignment: 'center'}],
                        ]
                      },
                      layout: 'noBorders',
                      style: 'cuerpo',
                      border: [true, false, true, true]

                    }
                  ],
                  [
                    {
                        table: {
                        headerRows: 1,
                        body: [
                          [{text: 'NOMBRE DE QUIEN ENVIA AL USUARIO : ', bold: true}, $scope.referencias.funcionario_origen[0].per_nombres+' '+$scope.referencias.funcionario_origen[0].per_apellido_primero+' '+$scope.referencias.funcionario_origen[0].per_apellido_segundo,'',''],
                          [{text: 'CARGO : ', bold: true}, $scope.referencias.funcionario_origen[0].fe_cargo, '', ''],
                          [{text: ' ', bold: true}, '','',''],
                         // [{text: 'FIRMA : .............................', bold: true}, '','',{text: 'SELLO : ', bold: true}],
                        ]
                      },
                      layout: 'noBorders',
                      style: 'cuerpo',
                      border: [true, false, true, false]
                    }
                  ],
                  [
                    {

                      table: {
                      widths: [190, 190],
                      body: [
                            ['',''],
                            ['',''],
                            [{text: '....................................', bold: true, alignment: 'center'},''],                                  
                            [{text: 'FIRMA', bold: true, alignment: 'center'},{text: 'SELLO:', bold: true,alignment: 'center'}],
                        ]
                      },
                      layout: 'noBorders',
                      style: 'cuerpo',
                      border: [true, false, true, false]

                    }
                  ],
                  [
                    {
                        table: {
                        headerRows: 1,
                        body: [
                          [{text: 'MOTIVO DE REFERENCIA : ', bold: true}, $scope.referencias.referencia.br_motivo,'',''], 
                         ]
                        },
                        layout: 'noBorders',
                        style: 'cuerpo',
                    }
                  ],
                 [
                      {text: "ESTABLECIMIENTO DE SALUD RECEPTOR\n", bold: true, alignment: 'center', style: 'header', fillColor: '#a0d8c1', fontSize: 8},
                  ],
                  [
                     {
                        table: {
                        headerRows: 1,
                        body: [
                                [{text: 'NOMBRE DEL ESTABLECIMIENTO :     ', bold: true}, $scope.referencias.establecimiento_destino.es_nombre, {text: "NIVEL: ", bold: true, style: 'cuerpo'},$scope.referencias.establecimiento_destino.es_nivel],
                                [{text: "SUBSECTOR: ", bold: true, style: 'cuerpo'},$scope.referencias.referencia.br_subsector,'',''],
                                [{text: "SERVICIO REFERENTE: ", bold: true, style: 'cuerpo'},$scope.referencias.referencia.br_servicio_destino,'',''],
                        ]
                        },
                        layout: 'noBorders',
                        style: 'cuerpo',
                        border: [true, true, true, false]
                    }
                  ],
                  [
                     {
                        table: {
                        headerRows: 1,
                        body: [
                                 [{text: "NOMBRE DE LA PERSONA CONTACTADA: ", bold: true, style: 'cuerpo'},$scope.fun_cont_nombre1+" "+ $scope.fun_cont_apellido_primero1+" "+ $scope.fun_cont_apellido_segundo1,{text: "CARGO:  ", bold: true, style: 'cuerpo'},$scope.fun_cont_cargo1],
                                 //[{text: "CARGO:  ", bold: true, style: 'cuerpo'},$scope.fun_cont_cargo1],
                           ]
                        },
                        layout: 'noBorders',
                        style: 'cuerpo',
                        border: [true, true, true, false]
                    }
                  ],
                  [
                     {
                        table: {
                        headerRows: 1,
                        body: [
                          //[{text: '', bold: true}, '','',{text: ' ', bold: true}],
                          [{text: 'NOMBRE DE QUIEN RECIBE AL USUARIO:', bold: true}, '.............................................................','',{text: ' ', bold: true}],
                          [{text: 'CARGO:', bold: true}, '.............................................................','',{text: ' ', bold: true}],
                          [{text: 'FECHA DE LLEGADA:', bold: true}, '.............................................................',{text: '', bold: true},{text: ' ', bold: true}],
                          [{text: 'HORA DE LLEGADA:', bold: true},'.............................................................','',''],
                          //[{text: 'HORA DE RECEPCIÓN:', bold: true},'.............................................................','',''],
                          [{text: 'MEDICO RESPONSABLE DEL ESTABLECIMIENTO DE SALUD RECEPTOR:', bold: true},'.............................................................','',''],
                        ]
                        },
                        layout: 'noBorders',
                        style: 'cuerpo',
                        border: [true, true, true, false]
                    }
                  ],
                  [
                    {

                      table: {
                      widths: [190, 190],
                      body: [
                            ['',''],
                            ['','\n\n'],
                            [{text: '....................................', bold: true, alignment: 'center'},''],                                  
                            [{text: 'FIRMA', bold: true, alignment: 'center'},{text: 'SELLO:', bold: true,alignment: 'center'}],
                        ]
                      },
                      layout: 'noBorders',
                      style: 'cuerpo',
                      border: [true, false, true, true]

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
     });// ============ FIN DE OBTENER EDAD
    
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

  });
}])

