'use-strict';
angular.module("adminApp")
.controller('CrearFicha1Ctrl', ['$http','CONFIG','$scope','Ficha1', '$route', 'toastr','EmpTra', function ($http,CONFIG,$scope,Ficha1, $route, toastr,EmpTra){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Fichas de Inspección',
      items:[
        {nombre:'Crear Ficha', enlace:'#/numero-ficha/crear', estilo:'active'}]
    },
    pagina:{
      titulo:'Crear Ficha'
    }
  }
var et_id=1;
 $scope.CurrentDate = new Date();
 var mes=$scope.CurrentDate.getMonth()+1;
 //var mess=mes+1;
 
 var fecha=$scope.CurrentDate.getDate()+"-"+mes+"-"+$scope.CurrentDate.getFullYear();

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  console.log("__HORA__",fecha);


  $scope.propietario='';

  EmpTra.get({et_id:et_id},function(data){
    $scope.emp_tra=data.establecimiento;

    if (Object.keys($scope.emp_tra.propietario).length==7) {
      $scope.propietario=$scope.emp_tra.propietario.pjur_razon_social;
    }
    if (Object.keys($scope.emp_tra.propietario).length==22) {
      $scope.propietario=$scope.emp_tra.propietario.per_nombres+' '+$scope.emp_tra.propietario.per_apellido_primero+' '+$scope.emp_tra.propietario.per_apellido_segundo;
    }
    $scope.direccion=$scope.emp_tra.establecimiento_sol.ess_avenida_calle+' #'+$scope.emp_tra.establecimiento_sol.ess_numero+' '+$scope.emp_tra.establecimiento_sol.ess_stand
   
  });

  $scope.ficha1 = {

      et_id :null,
      fun_id :null,
      cat_id :null,
      fi_fecha_asignacion:fecha,
      fi_fecha_realizacion:fecha,
      fi_observacion:'',
      fi_estado:'',
      fi_foco_insalubridad:false,
      fi_exibe_certificado:false,
      fi_exibe_carne:false,
      fi_extinguidor:'',
      fi_botiquin:'',
     /* fi_id:null,*/
      fi1_fecha_realizacion :fecha,
      fi1_observacion:'',
      fi1_estado :'',
      fi1_foco_insalubridad :false,
      fi1_exibe_certificado :false,
      fi1_exibe_carnes :false,
      fi1_infraestructura :'',
      fi1_servicios_higienicos :0,
      fi1_otros_servicios :0,
      fi1_inodoro :0,
      fi1_jaboncillo :0,
      fi1_lavamanos_porcelana :0,
      fi1_toallas :0,
      fi1_duchas :0,
      fi1_detalle_equipo :'',
      fi1_detalle_utencilios :'',
      fi1_otros :'',
      fi1_recomendaciones :'',
      fi1_aseo_personal:'',
      fi1_residuos_solidos :'',
      fi1_abastecimiento_agua :'',
      fi1_control_insectos_roedores :'',
      fi1_residuos_liquidos :'',
      fi1_distribucion_dependencias :'',
      fi1_conservacion_productos_materia_prima :''
    
    };

    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9.]*$/;
    
    $scope.submit = function(b)
    {
        $scope.ficha1.fun_id=fun_id;
        $scope.ficha1.et_id=et_id;
        $scope.ficha1.fi_estado='INSPECCIONADO';
        $scope.ficha1.fi1_estado='INSPECCIONADO';
        $scope.ficha1.fi_exibe_certificado=$scope.ficha1.fi1_exibe_certificado;
        $scope.ficha1.fi_exibe_carne=$scope.ficha1.fi1_exibe_carnes;
        $scope.ficha1.fi_foco_insalubridad=$scope.ficha1.fi1_foco_insalubridad; 
        $scope.ficha1.fi_fecha_realizacion= fecha;
        $scope.ficha1.fi1_fecha_realizacion=fecha;
        $scope.ficha1.fi_observacion=$scope.ficha1.fi1_observacion;


     console.log("_______GURDANDO_______",$scope.ficha1);
    
      Ficha1.save($scope.ficha1).$promise.then(function(data)
      {
        console.log("------GUARDADO.---------",data);
        if(data.msg)
        {
          console.log("data",data);
          angular.copy({}, $scope.ficha1);
          $scope.ajustes.pagina.success = "FICHA REGISTRADA CORRECTAMENTE";
          toastr.success('FICHA REGISTRADA CORRECTAMENTE');
          $route.reload();
          /*$timeout(function() {
            $location.path('/funcionarios');
          },1000);*/
        }
      },function () {
        toastr.error("Error inesperado");
      })
    }
    $scope.reset = function(form) {
      $scope.ficha1 = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };




/*  $scope.recarga=function(){
    $route.reload();
  }*/

}])

.controller('CrearFicha2Ctrl', ['$http','CONFIG','$scope','Ficha2', '$route', 'toastr','EmpTra', function ($http,CONFIG,$scope,Ficha2, $route, toastr,EmpTra){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Fichas de Inspección',
      items:[
        {nombre:'Crear Ficha', enlace:'#/numero-ficha/crear', estilo:'active'}]
    },
    pagina:{
      titulo:'Crear Ficha'
    }
  }
  var et_id=1;
 $scope.CurrentDate = new Date();
 var mes=$scope.CurrentDate.getMonth()+1;
 //var mess=mes+1;
 
 var fecha=$scope.CurrentDate.getDate()+"-"+mes+"-"+$scope.CurrentDate.getFullYear();

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  console.log("__HORA__",fecha);


  $scope.propietario='';

  EmpTra.get({et_id:et_id},function(data){
    $scope.emp_tra=data.establecimiento;

    if (Object.keys($scope.emp_tra.propietario).length==7) {
      $scope.propietario=$scope.emp_tra.propietario.pjur_razon_social;
    }
    if (Object.keys($scope.emp_tra.propietario).length==22) {
      $scope.propietario=$scope.emp_tra.propietario.per_nombres+' '+$scope.emp_tra.propietario.per_apellido_primero+' '+$scope.emp_tra.propietario.per_apellido_segundo;
    }
    $scope.direccion=$scope.emp_tra.establecimiento_sol.ess_avenida_calle+' #'+$scope.emp_tra.establecimiento_sol.ess_numero+' '+$scope.emp_tra.establecimiento_sol.ess_stand
   
  });

  $scope.ficha2 = {

      et_id :null,
      fun_id :null,
      cat_id :null,
      fi_fecha_asignacion:fecha,
      fi_fecha_realizacion:fecha,
      fi_observacion:'',
      fi_estado:'',
      fi_foco_insalubridad:false,
      fi_exibe_certificado:false,
      fi_exibe_carne:false,
      fi_extinguidor:'',
      fi_botiquin:'',
    
      fi2_fecha_realizacion :fecha ,
      fi2_cama :'' ,
      fi2_nro_habitaciones :0 ,
      fi2_nro_almacenes : 0,
      fi2_nro_salones : 0,
      fi2_salones_bueno :0 ,
      fi2_salones_regular :0 ,
      fi2_piscina_o_sauna : 0,
      fi2_piscina_regular : 0,
      fi2_piscina_bueno :0 ,
      fi2_nro_cocina :0 ,
      fi2_nro_cocinas_apart_hotel :0 ,
      fi2_total_gambusas : 0,
      fi2_recepcion : '',
      fi2_nro_restautant :0 ,
      fi2_aire_acondicionado :'' ,
      fi2_agua_caliente : '',
      fi2_calefaccion :'' ,
      fi2_frigobar: '',
      fi2_room_service :'' ,
      fi2_telefono_hab : '',
      fi2_tv : '',
      fi2_cubrecolchones :'' ,
      fi2_mesa : '',
      fi2_tocador :'' ,
      fi2_lampara :'' ,
      fi2_sillones :'' ,
      fi2_espejo : '',
      fi2_cesto_basura :'' ,
      fi2_portamaletas :'' ,
      fi2_ropero :'' ,
      fi2_lavanderia :'' ,
      fi2_cortina :'' ,
      fi2_pisos_bano :'' ,
      fi2_azulejos :'' ,
      fi2_depiso :'' ,
      fi2_inodoro :'' ,
      fi2_lavamanos:'' ,
      fi2_porta_papel :'' ,
      fi2_basura_bano : '',
      fi2_ducha :'' ,
      fi2_pieducha :'' ,
      fi2_colgador :'' ,
      fi2_sala_maquina :'' ,
      fi2_refrigeracion :'' ,
      fi2_grasas :'' ,
      fi2_iluminacion :'' ,
      fi2_mantenimieno :'' ,
      fi2_depositos :'' ,
      fi2_area_lavado_planchado :'' ,
      fi2_extinguidor : '',
      fi2_vectores : '',
      fi2_observacion :'' ,
      fi2_estado :'' 
    
    };

    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9.]*$/;
    
    $scope.submit = function(b)
    {
        $scope.ficha2.fun_id=fun_id;
        $scope.ficha2.et_id=et_id;
        $scope.ficha2.fi_estado='INSPECCIONADO';
       /* $scope.ficha2.fi1_estado='INSPECCIONADO';*/
     /*   $scope.ficha2.fi_exibe_certificado=$scope.ficha2.fi2_exibe_certificado;*/ 
     if ($scope.ficha2.fi2_exibe_carnes!=null) {
      $scope.ficha2.fi_exibe_carne=true;
     }
     if ($scope.ficha2.fi2_exibe_certificado!=null) {
      $scope.ficha2.fi_exibe_certificado=true;
     } 
        
        $scope.ficha2.fi_foco_insalubridad=$scope.ficha2.fi2_foco_insalubridad;
        $scope.ficha2.fi_fecha_realizacion= fecha;
        $scope.ficha2.fi2_fecha_realizacion=fecha;
        $scope.ficha2.fi_observacion=$scope.ficha2.fi2_observacion;


     console.log("_______GURDANDO_______",$scope.ficha1);
    
      Ficha2.save($scope.ficha2).$promise.then(function(data)
      {
        console.log("------GUARDADO.---------",data);
        if(data.msg)
        {
          console.log("data",data);
          angular.copy({}, $scope.ficha2);
          $scope.ajustes.pagina.success = "FICHA REGISTRADA CORRECTAMENTE";
          toastr.success('FICHA REGISTRADA CORRECTAMENTE');
          $route.reload();
          /*$timeout(function() {
            $location.path('/funcionarios');
          },1000);*/
        }
      },function () {
        toastr.error("Error inesperado");
      })
    }
    $scope.reset = function(form) {
      $scope.ficha2 = {};
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };




/*  $scope.recarga=function(){
    $route.reload();
  }*/

}])
