'use-strict';
angular.module("adminApp")
.controller('CrearFichaInsCtrl', ['$http','CONFIG','$scope','FichaIn', '$route', 'toastr','EmpTra','Funcionarios','$timeout','$location','$routeParams', function ($http,CONFIG,$scope,FichaIn, $route, toastr,EmpTra,Funcionarios,$timeout,$location,$routeParams){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Fichas de Inspección',
      items:[
      {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},
        {nombre:'Crear Ficha', enlace:'#/numero-ficha/crear', estilo:'active'}]
    },
    pagina:{
      titulo:'Crear Ficha'
    }
  }
 var et_id=$routeParams.et_id;
 $scope.CurrentDate = new Date();
 var mes=$scope.CurrentDate.getMonth()+1;
 
 
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
 Funcionarios.get({fun_id:fun_id},function(data){
    $scope.funcionarios=data.funcionario;
    $scope.nombre=$scope.funcionarios.persona.per_nombres+' '+$scope.funcionarios.persona.per_apellido_primero+' '+$scope.funcionarios.persona.per_apellido_segundo;

  });

  $scope.ficha = {

      et_id :null,
      fun_id :null,
      fi_fecha_asignacion:fecha,
      fi_fecha_realizacion:fecha,
      fi_observacion:'',
      fi_estado:'',
      fi_foco_insalubridad:false,
      fi_exibe_certificado:false,
      fi_exibe_carne:false,
      fi_extinguidor:false,
      fi_botiquin:false
    
    
    };

    $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9.]*$/;
    
    $scope.submit = function(b)
    {
        $scope.ficha.fun_id=fun_id;
        $scope.ficha.et_id=et_id;
        $scope.ficha.fi_estado='INSPECCIONADO';
     

       
     console.log("_______GURDANDO_______",$scope.ficha);
    
      FichaIn.save($scope.ficha).$promise.then(function(data)
      {
        console.log("------GUARDADO.---------",data);
        if(data.msg)
        {
          console.log("data",data);
          angular.copy({}, $scope.ficha1);
          $scope.ajustes.pagina.success = "FICHA REGISTRADA CORRECTAMENTE";
          toastr.success('FICHA REGISTRADA CORRECTAMENTE');
          /*$route.reload();*/
           $timeout(function() {
            $location.path('/inspeccion/categoria/crear/'+data.ficha_inspeccion.fi_id+'/'+et_id);
          },10);

  
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

.controller('CrearCateCtrl', ['$scope','$routeParams','EmpTra','Categoria','FichaCat','Zonas',  '$location', '$timeout', 'toastr','Rubro','Cle','BusSub','BusCat','EstadoIns',
 function ($scope,$routeParams, EmpTra,Categoria,FichaCat,Zonas,  $location, $timeout, toastr,Rubro,Cle,BusSub,BusCat,EstadoIns){

 $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Fichas de Inspección',
      items:[
        /*{nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},*/
        {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},
        {nombre:'Asignar categoria', enlace:'#/inspeccion/categoria/crear', estilo:'active'}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Registrar Categoria',
      action: "CREAR"
    }
  }
 var et_id=$routeParams.et_id;
  var fi_id=$routeParams.fi_id;
    var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  console.log("_______llego al controlador asignar________",fi_id)
EmpTra.get({et_id:et_id},function(data){
    $scope.emp_tra=data.establecimiento;

    if (Object.keys($scope.emp_tra.propietario).length==7) {
      $scope.propietario=$scope.emp_tra.propietario.pjur_razon_social;
    }
    if (Object.keys($scope.emp_tra.propietario).length==22) {
      $scope.propietario=$scope.emp_tra.propietario.per_nombres+' '+$scope.emp_tra.propietario.per_apellido_primero+' '+$scope.emp_tra.propietario.per_apellido_segundo;
    }
    $scope.direccion=$scope.emp_tra.establecimiento_sol.ess_avenida_calle+' #'+$scope.emp_tra.establecimiento_sol.ess_numero+' '+$scope.emp_tra.establecimiento_sol.ess_stand
    Rubro.get({emp_id:$scope.emp_tra.empresa.emp_id},function(data){
        $scope.rubro=data.rubro;
    });
  });
$scope.ver=false;
$scope.sancion=false;
Cle.get(function(data){
    $scope.subclacificacion=data.cle;
});

  $scope.buscarS=function(cle_id){
      console.log(cle_id+"<<< cle_ID");
    if (cle_id==17) {
      $scope.sancion=true;
      $scope.ver=false;
       BusCat.get({sub_id:93}, function(data){
          $scope.subcla=data.categoria;
          console.log("ZOnasss",$scope.buscas);
          //Agregando 26/10/17
          
      })
    }
    else{
      $scope.ver=true;
      $scope.sancion=false;
      
    }
BusSub.get({cle_id:cle_id}, function(data){
          $scope.buscas=data.subcla;
          console.log("busca subclasificacion",$scope.buscas);
         
      })
      
  };

  $scope.buscarC=function(sub_id){

      console.log(sub_id+"<<< sub_ID");

      BusCat.get({sub_id:sub_id}, function(data){
          $scope.subcla=data.categoria;
          console.log("ZOnasss",$scope.buscas);
          //Agregando 26/10/17
          
      })

  };




  $scope.CurrentDate=new Date();

  $scope.items = [];
  Categoria.get(function(data){
      $scope.subcla2=data.categoria;
      console.log($scope.subcla);

/*agregar categorias a la empresa*/
    var aux=null;
    
    $scope.agregar = function (sub_id,sub_nombre, item) {

      //console.log("______este es el cat_id____",sub_id);
      if (item){
        $scope.items.push(item);

        for (var i = $scope.subcla.length - 1; i >= 0; i--) {

         // console.log("______antes del segundo if____",$scope.subcla[i].cat_id);
          if($scope.subcla[i].cat_id==sub_id){

            aux=$scope.subcla[i];
            $scope.subcla.splice(i,1);
           console.log("______agregando categoria__-___",aux);
          }
        };
        // console.log('este es el vector reducido', $scope.subcla);
        // console.log('este es el vector de items', $scope.items);
      }
    };

/*quitar rubros en la empresa*/
    $scope.quitar = function (sub_id,item) {
      if (sub_id){
        $scope.subcla.push(item);
        for (var i = $scope.items.length - 1; i >= 0; i--) {
          if($scope.items[i].cat_id==sub_id){
            aux=$scope.items[i];
            $scope.items.splice(i,1);
          }
        };
      }
    };
  });
$scope.checkedI=false;


    $scope.todo1={
      fi_id:fi_id,
      vector:$scope.items
    };


    $scope.todo=JSON.stringify($scope.todo1);
    $scope.CurrentDate = new Date();
    var mes=$scope.CurrentDate.getMonth()+1;
    var fecha=$scope.CurrentDate.getDate()+"-"+mes+"-"+$scope.CurrentDate.getFullYear();
   $scope.datos={
            fun_id:null,
           /* eta_id:null,*/
            te_estado:'',
            te_observacion:'',
            te_fecha:''
        }

  $scope.submit = function(){
    console.log('EL OBJETO QUE S VA A CREAR', $scope.todo1);
    FichaCat.save($scope.todo1).$promise.then(function(data){
      if(data.status) {
        
          if ($scope.checkedI) {
             $scope.datos={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:$scope.datos.te_observacion,
                te_fecha:fecha
            }
          }
          else{
             $scope.datos={
                fun_id:fun_id,
                /*eta_id:2,*/
                te_estado:'APROBADO',
                te_observacion:'NINGUNA',
                te_fecha:fecha
            }
          }
        

      EstadoIns.update({et_id:et_id}, $scope.datos).$promise.then(function(data)
      {
        console.log("__datos tramitecer__",$scope.datos);
          if(data.status) {
            angular.copy({}, $scope.datos);
          }
         

      })

        angular.copy({}, $scope.todo1);
        $scope.ajustes.pagina.success = "Categoria añadida correctamente";
        toastr.success('Categoria añadida correctamente');
         $timeout(function() {
            $location.path('/tramites_certi');
          },10);
      }
    });
  };

    $scope.submitS = function(){
    console.log('EL OBJETO QUE S VA A CREAR', $scope.todo1);
    FichaCat.save($scope.todo1).$promise.then(function(data){
      if(data.status) {
        angular.copy({}, $scope.todo1);
        $scope.ajustes.pagina.success = "Categoria añadida correctamente";
        toastr.success('Categoria añadida correctamente');
         $timeout(function() {
            $location.path('/tramites_certi');
          },10);
      }
    });
  };

  $scope.reset = function(form) {
    $scope.todo1 = {};
    if (form) {
      //console.log(form);
      form.$setPristine();
      form.$setUntouched();
    }
  };
}])
//FALTA HACER EL CONTROLADOR PARA LAS SANCIONES 9-1-2018
.controller('CrearSancionCtrl', ['$scope','$routeParams','EmpTra','Categoria','FichaCat','Zonas',  '$location', '$timeout', 'toastr','Rubro','BusSub','BusCat','EstadoIns',
 function ($scope,$routeParams, EmpTra,Categoria,FichaCat,Zonas,  $location, $timeout, toastr,Rubro,BusSub,BusCat,EstadoIns){

 $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Fichas de Inspección',
      items:[
        /*{nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},*/
        {nombre:'Propietarios Naturales', enlace:'#/tramites_nat', estilo:''},
        {nombre:'Propietarios Juridicos', enlace:'#/tramites_jur', estilo:''},
        {nombre:'Asignar sanción', enlace:'#/inspeccion/sancion/crear', estilo:'active'}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Registrar Sanción',
      action: "CREAR"
    }
  }
  var et_id=$routeParams.et_id;
  var fi_id=$routeParams.fi_id;

  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;
  console.log("_______llego al controlador sancion________",fi_id);

    EmpTra.get({et_id:et_id},function(data){
      $scope.emp_tra=data.establecimiento;

      if (Object.keys($scope.emp_tra.propietario).length==7) {
        $scope.propietario=$scope.emp_tra.propietario.pjur_razon_social;
      }
      if (Object.keys($scope.emp_tra.propietario).length==22) {
        $scope.propietario=$scope.emp_tra.propietario.per_nombres+' '+$scope.emp_tra.propietario.per_apellido_primero+' '+$scope.emp_tra.propietario.per_apellido_segundo;
      }
      $scope.direccion=$scope.emp_tra.establecimiento_sol.ess_avenida_calle+' #'+$scope.emp_tra.establecimiento_sol.ess_numero+' '+$scope.emp_tra.establecimiento_sol.ess_stand
      Rubro.get({emp_id:$scope.emp_tra.empresa.emp_id},function(data){
          $scope.rubro=data.rubro;
      });
    });

   FichaCat.get({fi_id:fi_id}, function(data){
      $scope.cat=data.ficha_categoria;
      console.log("categorias",$scope.buscas);
      //Agregando 26/10/17
      
  })
$scope.items = [];
   BusCat.get({sub_id:93}, function(data){
      $scope.subcla=data.categoria;
      console.log("sanciones",$scope.subcla);
      //Agregando 26/10/17
      
/*  })

  
  Categoria.get(function(data){
      $scope.subcla2=data.categoria;*/
      console.log($scope.subcla);

/*agregar categorias a la empresa*/
    var aux=null;
    
    $scope.agregar = function (sub_id,sub_nombre, item) {

      //console.log("______este es el cat_id____",sub_id);
      if (item){
        $scope.items.push(item);

        for (var i = $scope.subcla.length - 1; i >= 0; i--) {

         // console.log("______antes del segundo if____",$scope.subcla[i].cat_id);
          if($scope.subcla[i].cat_id==sub_id){

            aux=$scope.subcla[i];
            $scope.subcla.splice(i,1);
           console.log("______agregando categoria__-___",aux);
          }
        };
        // console.log('este es el vector reducido', $scope.subcla);
        // console.log('este es el vector de items', $scope.items);
      }
    };

/*quitar rubros en la empresa*/
    $scope.quitar = function (sub_id,item) {
      if (sub_id){
        $scope.subcla.push(item);
        for (var i = $scope.items.length - 1; i >= 0; i--) {
          if($scope.items[i].cat_id==sub_id){
            aux=$scope.items[i];
            $scope.items.splice(i,1);
          }
        };
      }
    };
  });
$scope.checkedI=false;


    $scope.todo1={
      fi_id:fi_id,
      vector:$scope.items
    };


    $scope.todo=JSON.stringify($scope.todo1);
    $scope.CurrentDate = new Date();
    var mes=$scope.CurrentDate.getMonth()+1;
    var fecha=$scope.CurrentDate.getDate()+"-"+mes+"-"+$scope.CurrentDate.getFullYear();
   $scope.datos={
            fun_id:null,
           /* eta_id:null,*/
            te_estado:'',
            te_observacion:'',
            te_fecha:''
        }

  $scope.submit = function(){
    console.log('EL OBJETO QUE S VA A CREAR', $scope.todo1);
    FichaCat.save($scope.todo1).$promise.then(function(data){
      if(data.status) {
        
          if ($scope.checkedI) {
             $scope.datos={
                fun_id:fun_id,
                te_estado:'OBSERVADO',
                te_observacion:$scope.datos.te_observacion,
                te_fecha:fecha
            }
          }
          else{
             $scope.datos={
                fun_id:fun_id,
                /*eta_id:2,*/
                te_estado:'APROBADO',
                te_observacion:'NINGUNA',
                te_fecha:fecha
            }
          }
        

      EstadoIns.update({et_id:et_id}, $scope.datos).$promise.then(function(data)
      {
        console.log("__datos tramitecer__",$scope.datos);
          if(data.status) {
            angular.copy({}, $scope.datos);
          }
         

      })

        angular.copy({}, $scope.todo1);
        $scope.ajustes.pagina.success = "Categoria añadida correctamente";
        toastr.success('Categoria añadida correctamente');
         $timeout(function() {
            $location.path('/tramites_certi');
          },10);
      }
    });
  };

    $scope.submitS = function(){
    console.log('EL OBJETO QUE S VA A CREAR', $scope.todo1);
    FichaCat.save($scope.todo1).$promise.then(function(data){
      if(data.status) {
        angular.copy({}, $scope.todo1);
        $scope.ajustes.pagina.success = "Categoria añadida correctamente";
        toastr.success('Categoria añadida correctamente');
         $timeout(function() {
            $location.path('/tramites_certi');
          },10);
      }
    });
  };

  $scope.reset = function(form) {
    $scope.todo1 = {};
    if (form) {
      //console.log(form);
      form.$setPristine();
      form.$setUntouched();
    }
  };
}])
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
$scope.checked=true;

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
.controller('VerFichaCtrl', [/*'authUser',*/ '$scope', 'FichaIn','EmpTra', '$routeParams', '$location','Rubro','CONFIG','Categoria','BusCat','FichaCatSan','toastr', 
  function (/*authUser,*/ $scope, FichaIn,EmpTra, $routeParams, $location,Rubro,CONFIG,Categoria,BusCat,FichaCatSan,toastr){
 /* if(authUser.isLoggedIn()){*/
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Fichas de Inspección',
        items:[
          {nombre:'Fichas de inspeccion', enlace:'#/', estilo:''}/*,
          {nombre:'Registrar Ciudadano', enlace:'#/personas/create', estilo:''}*/]
      },
      pagina:{
        titulo:'Detalle de ficha de inspeccion'
      }
    }
     $scope.user = {
    rol_id: CONFIG.ROL_CURRENT_USER
  }
    $scope.loading=true;
    var fi_id = $routeParams.fi_id;
    console.log("________________________________persona_id",fi_id);
    $scope.rec=function(fc_id,cat_id){

    id=fc_id;
    Categoria.get({cat_id:cat_id}, function(data)
    {
        $scope.categoria = data.categoria;
        $scope.nombre=$scope.categoria.cat_descripcion+' de monto '+$scope.categoria.cat_monto+' Bs';
       
      });
  }; 
  var sancion =93;
  BusCat.get({sub_id:sancion}, function(data){
      $scope.subcla=data.categoria;
      console.log("sanciones",$scope.subcla.cat_descripcion);   
  })
  FichaIn.get({fi_id:fi_id}, function(data){
      $scope.ficha_inspeccion = data.ficha_inspeccion;
      console.log("___________FICHA INSPECCION",data.ficha_inspeccion);
    
      $scope.loading = false;
      $scope.msg = data.mensaje;




    EmpTra.get({et_id:$scope.ficha_inspeccion.ficha_inspeccion.et_id},function(data){
    $scope.emp_tra=data.establecimiento;

    if (Object.keys($scope.emp_tra.propietario).length==7) {
      $scope.propietario=$scope.emp_tra.propietario.pjur_razon_social;

    }
    if (Object.keys($scope.emp_tra.propietario).length==22) {
      $scope.propietario=$scope.emp_tra.propietario.per_nombres+' '+$scope.emp_tra.propietario.per_apellido_primero+' '+$scope.emp_tra.propietario.per_apellido_segundo;

    }
    $scope.direccion=$scope.emp_tra.establecimiento_sol.ess_avenida_calle+' #'+$scope.emp_tra.establecimiento_sol.ess_numero+' '+$scope.emp_tra.establecimiento_sol.ess_stand
    Rubro.get({emp_id:$scope.emp_tra.empresa.emp_id},function(data){
        $scope.rubro=data.rubro;
    });
  });
     
    });
    $scope.ficha_san={
      fc_id:null,
      cat_id:null
    }

    $scope.submit=function(san){
       console.log(id,"__esta es la obs__",san);
 
    $scope.ficha_san.fc_id=id;
    $scope.ficha_san.cat_id=san;
    FichaCatSan.save($scope.ficha_san).$promise.then(function(data)
    {
      console.log("entra a save");
      if(data.status)
      {
          console.log("lo logro...",data);
          toastr.success('Sancion registrada correctamente');
        
      }

    });//FIN TRAMITE ESTADO
    
  };
  /*} else {
    $location.path('/inicio');
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

/*
.controller('apiAppCtrl_estadoCar', ['$http', '$scope', 'CONFIG', buscaEstadoCarCtrl])
function buscaEstadoCarCtrl($http, $scope, CONFIG){
  $scope.buscaEstadoCar = function(){

    console.log('esta buscando numero de pertramite', $scope.per_ci);
      $scope.tamanio="Cargando...";//////CAMBIADO
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/estado_carnet/'+$scope.per_ci).success(function(respuesta){
        console.log("_ERROR__",respuesta.errors);
          $scope.pertra = respuesta.pertramite;
          if(respuesta.pertramite){
              $scope.tamanio="";
              $scope.ver=true;
              $scope.switch=false;
          } else if(!respuesta.pertramite){
              $scope.ver=false;
              $scope.tamanio="El numero de pertramite ingresado no fue asignado";
          }
          if(respuesta.pruebalabo){
              $scope.tamanio="La pertramite ya fue analizada";
              $scope.verprueba=true;
          }
          if(respuesta.errors){

          }
      });
  }
}*/