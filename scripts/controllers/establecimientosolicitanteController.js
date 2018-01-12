'use strict';
angular.module("adminApp")

.controller('ListaEstabSolCtrl', ['$scope','EstabSols', '$route', 'toastr', 'Establecimientos',  function ($scope, EstabSols, $route, toastr, Establecimientos){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Establecimientos', enlace:'#/tramite-establecimientosol', estilo:''},
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:'active'},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientosol/persona', estilo:''}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Establecimientos Registrados'
    }
  }

  $scope.sortType = 'ess_id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.establecimientos = [];
  
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
  $scope.establecimientoss = [];

  $scope.getEstablecimientos = function(page){
    //page = 20;
    $scope.establecimientoss = Establecimientos.query({
      page: page,
      max: 10
    })
    console.log($scope.establecimientoss);
  };

  EstabSols.get(function(data){
    $scope.establecimientos = data.est_sol;
    console.log("lista de Establecimientos solicitantes",$scope.establecimientos);
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
    console.log("entro al if");
      $scope.loading = false;
      $scope.msg = data.status;
    }
  },function () {
      console.log("error");
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });

  var id = 0;
  $scope.nombre = "";
  $scope.get_es_id = function(usa_id, es_nombre){
    id=usa_id;
    $scope.nombre = es_nombre;
  }

  $scope.remove = function(es_id){
    Establecimientos.delete({es_id:id}).$promise.then(function(data){
      if(data.mensaje) {
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
  
  //PARA PAGINACIÓN 
  $scope.currentPage = 0;
  $scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
  $scope.pages = [];

  $scope.configPages = function() {
   $scope.pages.length = 0;
   var ini = $scope.currentPage - 4;
   var fin = $scope.currentPage + 5;
   if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.establecimientos.length / $scope.pageSize) > 10) fin = 10;
      else fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
   } else {
      if (ini >= Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10) {
         ini = Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10;
         fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
      }
   }
   if (ini < 1) ini = 1;
   for (var i = ini; i <= fin; i++) {
      $scope.pages.push({ no: i });
   }
   if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  };
  $scope.setPage = function(index) {
     $scope.currentPage = index - 1;
  };
  //para llamar a la función:
  $scope.configPages();
  //fin paginación 
}])




.controller('ListaEstabSolTramitePagadoCtrl', ['$scope','TramiteCerPagado', '$route', 'toastr', 'Establecimientos',  function ($scope, TramiteCerPagado, $route, toastr, Establecimientos){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Tramites iniciados', enlace:'#/tramite-establecimientosol', estilo:'active'},
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientosol/persona', estilo:''}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Tramites iniciados'
    }
  }

  $scope.sortType = 'ess_id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.establecimientos = [];
  
  $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
  $scope.establecimientoss = [];

  $scope.getEstablecimientos = function(page){
    //page = 20;
    $scope.establecimientoss = Establecimientos.query({
      page: page,
      max: 10
    })
    console.log($scope.establecimientoss);
  };

  TramiteCerPagado.get(function(data){
    $scope.establecimientos = data.establecimientosol;
    console.log("lista de Establecimientos solicitantes",$scope.establecimientos);
    //PARA HACER UN LOADING EN EL TEMPLATE
    if(data.status){
    console.log("entro al if");
      $scope.loading = false;
      $scope.msg = data.status;
    }
  },function () {
      console.log("error");
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });

  var id = 0;
  $scope.nombre = "";
  $scope.get_es_id = function(usa_id, es_nombre){
    id=usa_id;
    $scope.nombre = es_nombre;
  }

  $scope.remove = function(es_id){
    Establecimientos.delete({es_id:id}).$promise.then(function(data){
      if(data.mensaje) {
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
  
  //PARA PAGINACIÓN 
  $scope.currentPage = 0;
  $scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
  $scope.pages = [];

  $scope.configPages = function() {
   $scope.pages.length = 0;
   var ini = $scope.currentPage - 4;
   var fin = $scope.currentPage + 5;
   if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.establecimientos.length / $scope.pageSize) > 10) fin = 10;
      else fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
   } else {
      if (ini >= Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10) {
         ini = Math.ceil($scope.establecimientos.length / $scope.pageSize) - 10;
         fin = Math.ceil($scope.establecimientos.length / $scope.pageSize);
      }
   }
   if (ini < 1) ini = 1;
   for (var i = ini; i <= fin; i++) {
      $scope.pages.push({ no: i });
   }
   if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  };
  $scope.setPage = function(index) {
     $scope.currentPage = index - 1;
  };
  //para llamar a la función:
  $scope.configPages();
  //fin paginación 
}])






.controller('CrearEstablecimientoSolicitanteCtrl', ['$scope','$routeParams','PNaturalPJuridicaPro_id','Subclacificacion','EstabSols','Zonas',  '$location', '$timeout', 'toastr',
 function ($scope,$routeParams, PNaturalPJuridicaPro_id,Subclacificacion,EstabSols,Zonas,  $location, $timeout, toastr){

 $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Establecimientos', enlace:'#/tramite-establecimientosol', estilo:''},
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientosol/persona', estilo:'active'}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Registrar Establecimiento',
      action: "CREAR"
    }
  }

    var pro_id=$routeParams.pro_id;
    PNaturalPJuridicaPro_id.get({pro_id:pro_id},function(data2){
        if(!data2.pjuridica){
          $scope.persona=data2.pnatural;
          console.log('persona natural dentro del ver persona', $scope.persona);
        }else{
          $scope.pjuridica=data2.pjuridica;
          console.log('persona juridica dentro del ver persona', $scope.pjuridica);
        }
      });

  $scope.CurrentDate=new Date();

  $scope.items = [];
  Subclacificacion.get(function(data){
      $scope.subcla=data.subclacificacion;


/*agregar rubros en la empresa*/
    var aux=null;
    
    $scope.agregar = function (sub_id, item) {
      if (item){
        $scope.items.push(item);
        for (var i = $scope.subcla.length - 1; i >= 0; i--) {
          if($scope.subcla[i].sub_id==sub_id){
            aux=$scope.subcla[i];
            $scope.subcla.splice(i,1);
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
          if($scope.items[i].sub_id==sub_id){
            aux=$scope.items[i];
            $scope.items.splice(i,1);
          }
        };
      }
    };

  });
/*------------------------------------------------*/
    
  $scope.zon=false;
  $scope.ver_zonas=function(mun_id){
      console.log(mun_id+"<<< MUN_ID");
      $scope.zon=false;
      Zonas.get({mun_id:mun_id}, function(data){
          $scope.zonas=data.zona;
          console.log("ZOnasss",$scope.zonas);

          if($scope.zonas.length == 0){
                $scope.zon=true;
          }
          console.log("length "+$scope.zonas.length);
      })
  };
$scope.latitud=null;
 $scope.longitud=null;
 var lat,long;

$scope.ver_mapita=false;
$scope.initMap = function(){
  if(!$scope.ver_mapita){
    $scope.ver_mapita=true;
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          // console.log(JSON.stringify($scope.position));
          // Creamos un objeto mapa y lo situamos en coordenadas actuales
        /* */   var map = new google.maps.Map(document.getElementById('mapa'),{
            center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
            scrollwheel: false,
            zoom: 16
            });
            
            //marcador solito
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              draggable: true,
    //        animation: google.maps.Animation.BOUNCE,
            title: ''
            });   
            
            var markerLatLng = marker.getPosition();
            $scope.markerLatLng=markerLatLng;
            $scope.latitud=markerLatLng.lat();
            $scope.longitud=markerLatLng.lng();
            console.log("el objeto con la posicion completa",$scope.markerLatLng);
            console.log("latitud por defecto",$scope.latitud);
            console.log("longitud por defecto",$scope.longitud);
            //console.log("POSITIONmmmmm",marker.position.lat.[[Scopes]].0.a);  
            infowindow.setContent('<h4 class="text-primary">Tú estas aquí <br><small>Esta es tu ubicación aproximada</small></h4>');
            infowindow.open(map, marker);

            google.maps.event.addListener(marker, 'click', (function(marker) {
                return function() {
                var markerLatLng1 = marker.getPosition();
                document.getElementById("establecimientolatitud").value=markerLatLng1.lat();
                document.getElementById("establecimientolongitud").value=markerLatLng1.lng();
                infowindow.open(map, marker);
                }
            })(marker));

         })   
      }else{
        $scope.ver_mapita=false;
        document.getElementById("establecimientolatitud").value=0;
        document.getElementById("establecimientolongitud").value=0;
      };
  }

       

  $scope.establecimiento = {
    zon_id:null,
    ess_razon_social:null,
    ess_telefono:0,
    ess_correo_electronico:'',
    ess_tipo:'',
    ess_avenida_calle:'',
    ess_numero:0,
    ess_stand:"",
    ess_latitud:0,
    ess_longitud:0,
    ess_altitud:0,
    ie_nombre:"EST.JPG",
    ie_enlace: "./img-est/",
    ie_tipo:"fotografia",
    emp_nit:"",
    emp_url_nit:"",
    emp_url_licencia:"",
    pro_id:pro_id,
    tra_id:2
  };

  /*
  FALTA LLENAR EMP_NIT
  URL_LICENCIA
  TRA_ID
  */
    
  $scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]*$/;
  $scope.patternNumero = /^[0-9]*$/;
  $scope.patternNombreEstab = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9()-º]*$/;
  $scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  $scope.patternFecha = /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/;
  $scope.patternHora = /^[0-9:]*$/;
  //VALIDAR NUMEROS !!!!!!
  $scope.submit = function(){
    $scope.establecimiento.ess_latitud=document.getElementById("establecimientolatitud").value;
    $scope.establecimiento.ess_longitud=document.getElementById("establecimientolongitud").value;
    $scope.todo={
      establecimiento:$scope.establecimiento,
      vector:$scope.items
    };
    console.log('EL OBJETO QUE SE VA A CREAR', $scope.todo);
      EstabSols.save($scope.todo).$promise.then(function(data){
        if(data.status) {
          $scope.ajustes.pagina.success = "Establecimiento añadido correctamente";
          toastr.success('Establecimiento añadido correctamente');
          $timeout(function() {
            $location.path('/establecimientossol');
        },100);
        }
      });
  };


  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };

}])


.controller('BuscarCrearPersonaCtrl', ['$http','CONFIG','$scope','EstabSols', '$route', 'toastr','$location',
  function ($http,CONFIG,$scope, EstabSols, $route, toastr,$location){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Establecimientos', enlace:'#/tramite-establecimientosol', estilo:''},
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientosol/persona', estilo:'active'}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Buscar propietario registrado'
    }
  }
    
  $scope.crear_pnatural=function(per_id){
    $scope.data={
      per_id:per_id
    };
     $http.post(CONFIG.DOMINIO_SERVICIOS+'/pnatural', $scope.data).success(function(data){
          $scope.pro_id = data.pnatural.pnatural.pro_id;
          console.log('llamo a la funcion', data.pnatural.pnatural.pro_id);
      });
  }

  $scope.pag_buscar_empresa=function(){
      $location.path('/establecimientosol/empresa');
    }
   $scope.pag_buscar_persona=function(){
      $location.path('/establecimientosol/persona');
    }
  $scope.crear_desde_establecimiento=true;


    $scope.formcrear=false;
    $scope.vercrear=function(){
      $scope.formcrear=true;
    }

    $scope.recarga=function(){
      $route.reload();
    }
}])

.controller('VerPersonaEstablecimientoSolicitanteCtrl', ['$scope','PersonasC', 'PNatural','$routeParams','$route', 'toastr','$location',
  function ($scope, PersonasC,PNatural,$routeParams, $route, toastr,$location){
  $scope.ajustes = {
    //Configuraciones del menu:
    menu:{
      titulo: 'Gestión de Establecimientos Solicitantes',
      items:[
        {nombre:'Establecimientos', enlace:'#/tramite-establecimientosol', estilo:''},
        {nombre:'Establecimientos', enlace:'#/establecimientossol', estilo:''},
        {nombre:'Nuevo establecimiento', enlace:'#/establecimientosol/persona', estilo:'active'}]
    },
    //Configuraciones de la página
    pagina:{
      titulo:'Gestión de Establecimientos Solicitantes, Persona registrada'
    }
  }
  var per_id=$routeParams.per_id;
  PersonasC.get({per_id:per_id}, function(data)
    { 
      $scope.persona = data.persona;
      var fecha_naci = new Date($scope.persona.per_fecha_nacimiento);
      PNatural.get({per_id:per_id},function(data2){
        $scope.pnatural=data2.pnatural;
        console.log('persona natural dentro del ver persona', $scope.pnatural);
      });
    });
}])


/*BUSCA PERSONA POR CI*/
.controller('BuscaPersonaRegistradaCtrl', ['$http', '$scope', 'CONFIG', buscaPersonaRegistradaController])
.controller('BuscaPJuridicaRegistradaCtrl', ['$http', '$scope', 'CONFIG', buscaPJuridicaRegistradaController])
function buscaPersonaRegistradaController($http, $scope, CONFIG){
  $scope.buscaPersona = function(){
    console.log('esta buscando persona');
      $scope.resultado="Cargando...";
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/personas_ci/'+$scope.per_ci).success(function(respuesta){
        console.log('datos del apersona buscada: ', respuesta);
          if(!respuesta.persona){
              $scope.ver=false;
              $scope.noexiste=true;
              $scope.resultado=" La persona no se encuentra registrada";              
          } else if(respuesta.persona){
              $scope.ver=true;
              $scope.resultado='';
              $scope.persona = respuesta.persona.persona;
              $scope.zona = respuesta.persona.zona;
              $scope.municipio = respuesta.persona.municipio;
              $scope.provincia = respuesta.persona.provincia;
          }  
      });
  }
}


/*BUSCA PROPIETARIO POR NIT*/
function buscaPJuridicaRegistradaController($http, $scope, CONFIG){
  $scope.buscaPJuridica = function(pjur_nit){
    console.log('esta buscando pjuridica', pjur_nit);
      $scope.resultado="Cargando...";
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/buscarpjuridica/'+pjur_nit).success(function(respuesta){
        console.log('respuesta pjuridica: ', respuesta);
          if(respuesta.pjuridica==null){
              $scope.veremp=false;
              $scope.noexistemp=true;
              $scope.resultadoemp=" La empresa no se encuentra registrada";              
          } else if(respuesta.pjuridica){
              $scope.veremp=true;
              $scope.resultadoemp='';
              $scope.pjuridica=respuesta.pjuridica;
          }  
      });
  }
}




