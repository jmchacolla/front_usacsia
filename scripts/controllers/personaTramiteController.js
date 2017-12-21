'use strict';
angular.module("adminApp")

.controller('PersonaTramiteController', ['$scope', 'ListarTramitesService', '$route', 'toastr', '$location', function ($scope, ListarTramitesService, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites de Carné Sanitario',
      items:[
        {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
    },
    pagina:{
      titulo:'Tramites de Carné Sanitario'
    }
  }

  console.log('LLEGO AL CONTROLADOR---------');
  
  $scope.sortType = 'per_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];

  
  $scope.loading=true;//para hacer un loading
  var tra_id = 1;
  ListarTramitesService.get({tra_id:1}, function(data){
    console.log('*******persona_tramite ---------', data);
    $scope.persona_tramite = data.persona_tramite;
    // for (var i=0; i=$scope.persona_tramite.length; i++)
    // {
    // 	 if ($scope.persona_tramite[i].per_genero=='F' || $scope.persona_tramite[i].per_genero=='f'){
    //     $scope.persona_tramite[i].per_genero='FEMENINO';
    //   }
    //   else if($scope.persona_tramite[i].per_genero=='M' || $scope.persona_tramite[i].per_genero=='m'){
    //     $scope.persona_tramite[i].per_genero='MASCULINO';
    //   }
    // }

    
    if(data.persona_tramite.length>0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
    
  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 

  var id=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = per_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  }

  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])



/*CRAEAR PERSONA TRAMITE*/
.controller('CrearPersonaTramiteCtrl', ['$scope', '$route','PersonaTramite','Tramite' ,'toastr', '$location', function ($scope, $route, PersonaTramite,Tramite,toastr, $location){
  $scope.ajustes = {
    menu:{
      titulo: 'Gestion de solicitudes de trámite',
      items:[
        {nombre:'Busqueda de personas registradas', enlace:'#/', estilo:'active'}]
    },
    pagina:{
      titulo:'Registrar Pago'
    }
  }
 
    $scope.persona_tramite={
      tra_id:null, 
      per_id:null,
      // pt_fecha_ini :"",
      pt_monto:null,
      pt_tipo_tramite:""
    };

    $scope.CurrentDate = new Date();
    Tramite.get(function(data){
    $scope.tramite = data.tramites;
    console.log("tramite del get",$scope.tramite);

      $scope.monto = function(costo){
          $scope.persona_tramite.pt_monto=costo;  
      }
    })

    /**/
      $scope.tramiteselect={
    tra_id:null,
    tra_nombre:"",
    tr_costo:null,
    tra_vigencia:"",
  };
  $scope.save = function(a, per_id,tra_id,tra_costo){
    $scope.persona_tramite.per_id=per_id;
    $scope.persona_tramite.tra_id=tra_id;
    $scope.persona_tramite.pt_monto=tra_costo;
    console.log('la persona-tramite que se va a cerar', $scope.persona_tramite);
    PersonaTramite.save($scope.persona_tramite).$promise.then(function(data)
    {
      console.log('el data', data);

        if(data.mensaje){
          toastr.success('Pago registrado correctamente'+data.persona_tramite.pt_id+' es');
               $location.path('/boleta-pago/'+data.persona_tramite.pt_id);

        }
    })
  }

   $scope.ver=false;
}])


/*LISTAR FICHAS DE ATENCION*/
.controller('AtencionCtrl', ['$scope', 'FichasfechaService', 'Ficha', '$route', 'toastr', '$timeout', '$location',function ($scope, FichasfechaService, Ficha, $route, toastr,$timeout, $location) 
{
    $scope.today=moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YY");
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de tramites de Carné Sanitario',
        items:[
          {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
      },
      pagina:{
        titulo:'Atención para el Carné Sanitario '+$scope.today
      }
    };
    $scope.fecha={
      fecha1:moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YYYY"),
      fecha2:moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YYYY"),
      fic_estado:'PENDIENTE'
    };
    $scope.sortType = 'per_id'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.Personas = [];
    $scope.loading=true;//para hacer un loading
    var tra_id = 1;
    FichasfechaService.get($scope.fecha, function(data){
      console.log('*******fichafecha---------', data);
      $scope.fichas = data.fichas;

      if(data.fichas.length>0){
        $scope.loading = false;
        $scope.msg = true;
      }
      else{
        $scope.loading = false;
        $scope.msg = false;
      }
    
    },function () {
        toastr.error("ERROR INESPERADO, por favor actualize la página");
        $scope.loading = false;
        $scope.msg = false;
      }); 
    var id=0;
    $scope.nombre_completo = "";
    $scope.get_per_id = function(pt_id, per_apellido_primero, per_apellido_segundo, per_nombres){
      id = pt_id;
      $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
    }
    $scope.atender = function (fic_id/*, pt_id*/) {
      // body...
      var fic_id=fic_id;
      var pt=id;
      console.log(pt, 'akiiiii');
      Ficha.update({fic_id:fic_id}).$promise.then(function (data) {
        if(data.status){
                toastr.success('Registrando paciente');
                $timeout(function() {
                 $location.path('/prueba-medica/'+pt);
                  },1000);
              }
      })
    }
}])
.controller('BoletaCtrl', ['$scope', 'PersonaTramite', 'Ficha', '$route', 'toastr', '$timeout', '$location', '$routeParams', function ($scope, PersonaTramite, Ficha, $route, toastr,$timeout, $location, $routeParams) {
    
    var pt_id = $routeParams.pt_id;
    var nt;
    PersonaTramite.get({pt_id:pt_id}, function(data)
    {
      $scope.pertramite = data.pertramite;
      console.log('-----', $scope.pertramite);
      nt=$scope.pertramite.persona_tramite.pt_numero_tramite;
      $scope.today=moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YY");
      $scope.monto='Numeros a Letras';
      // if ($scope.pertramite.persona.per_genero=='F' || $scope.pertramite.persona.per_genero=='f'){
      //   $scope.pertramite.persona.per_genero='FEMENINO';
      // }
      // else if($scope.pertramite.persona.per_genero=='M' || $scope.pertramite.persona.per_genero=='m'){
      //   $scope.pertramite.persona.per_genero='MASCULINO';
      // }
      $scope.ajustes = {
        menu:{
          titulo: 'Gestión de tramites de Carné Sanitario',
          items:[
            {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
        },
        pagina:{
          titulo:'Comprobante de pago Trámite N°: '+nt/*$scope.pertramite.persona_tramite.pt_numero_tramite*/
        }
      };
    });

}])


.controller('ListaFinalCtrl', ['$scope', 'Final', '$route', 'toastr', '$location', function ($scope, Final, $route, toastr,$location)
{
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de tramites Concluidos',
      items:[
        {nombre:'Tramites Concluidos', enlace:'#/personas/conc', estilo:'active'}]
    },
    pagina:{
      titulo:'Tramites de Carné Sanitario'
    }
  }

  
  $scope.sortType = 'pt_id'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.Personas = [];


  $scope.loading=true;//para hacer un loading

  Final.get(function(data){
  
    $scope.persona_tramite = data.persona_tramite;

    if(data.persona_tramite.length>0){
      $scope.loading = false;
      $scope.msg = true;
    }
    else{
      $scope.loading = false;
      $scope.msg = false;
    }
    
  },function () {
      toastr.error("ERROR INESPERADO, por favor actualize la página");
      $scope.loading = false;
      $scope.msg = false;
    }); 

  var id=0;
  $scope.nombre_completo = "";
  $scope.get_per_id = function(per_id, per_apellido_primero, per_apellido_segundo, per_nombres){
    id = per_id;
    $scope.nombre_completo = per_apellido_primero + " " + per_apellido_segundo + " " + per_nombres;
  }

  $scope.remove = function(per_id){
    Personas.delete({per_id:id}).$promise.then(function(data){
      if(data.mensaje){
        toastr.success('Eliminado correctamente');
        $route.reload();
      }
    })
  }
}])
.controller('VerFinalCtrl', ['$scope', 'VerPT',  '$route', 'toastr', '$timeout', '$location', '$routeParams', function ($scope, VerPT, $route, toastr,$timeout, $location, $routeParams) {

  $scope.ajustes = {
      menu:{
        titulo: 'Gestión de tramites de Carné Sanitario',
        items:[
          {nombre:'Solicitudes de Carné Sanitario', enlace:'#/persona-usacsia', estilo:'active'}]
      },
      pagina:{
        titulo:'Tramite: '/*$scope.pertramite.persona_tramite.pt_numero_tramite*/
      }
    };
    
    var pt_id = $routeParams.pt_id;

    VerPT.get({pt_id:pt_id}, function(data)
    {
      $scope.pertramite = data.pertramite;
      $scope.numero=$scope.pertramite.persona_tramite.pt_numero_tramite;
     console.log('pertramite-----', $scope.pertramite);
       /*nt=$scope.pertramite.persona_tramite.pt_numero_tramite;
      $scope.today=moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YY");
      $scope.monto='Numeros a Letras';*/
     
    
    });

}])


.controller('pdf_pago_Ctrl',['$scope', 'PersonaTramite', 'CONFIG','$routeParams', '$http', function ($scope, PersonaTramite, CONFIG, $routeParams, $http){
  // prepare the document definition using declarative approach
    var id = $routeParams.pt_id;
    console.log("IDEDESS",id);
   /* var id=8;*/
    PersonaTramite.get({pt_id:id}, function(data)
    {
      $scope.persona = data.pertramite;
      console.log('persona', $scope.persona);
      var fechapago= $scope.persona.persona_tramite.pt_fecha_ini;
      var fecha_cont=moment(new Date(), "YYYY-MM-DD") .format("DD-MM-YYYY");
      var horaC=fecha_cont[1];
      var fechaCONT = moment(fecha_cont,"DD-MM-YYYY").format("DD-MM-YYYY");
      var firma_acomp = "FIRMA USUARIO";
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
            console.log("entro al controlador pdf",$scope.persona)

            var tituloqr= 'Nro. Trámite: '+$scope.persona.persona_tramite.pt_numero_tramite;
            var textoqr= 'USACSIA-CARNÉ-SANITARIO-'+$scope.persona.persona_tramite.pt_numero_tramite;
            //estilo, encabezado de QR
            function header(text) {
              return {text: text, margins: [0, 0, 0, 8],alignment: 'right'};
            }
            var docDefinition = {
                
                //pageOrientation: 'landscape',
                //pageSize: 'LEGAL',
                pageMargins: [ 30, 5, 30, 5 ],

                content: [

                  {
                  table: {
                  widths: [110, 300, 260],
                  body: [
                      [
                        {
                          image: gober,
                          width: 70,
                          height: 76
                        },
                        {
                          /*image: gober,
                          width: 64,
                          height: 62*/
                          text: "\n \n \n GOBIERNO AUTONOMO DEPARTAMENTAL DE LA PAZ \n SERVICIO DEPARTAMENTAL DE SALUD \n UNIDAD DE SALUD AMBIENTAL \n CONTROL SANITARIO E INOCUIDAD ALIMENTARIA \n \n CAJA RECAUDADORA DE USACSIA",
                          alignment: 'center',
                          style: 'header' 
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
                  border: [false, false, false, false]

                },
                header(tituloqr),
                    {
                      qr: textoqr,
                      fit:50,
                      alignment: 'right'
                    },
                {
                   text: "CI:  N°"+$scope.persona.persona.per_ci, fontSize: 12, alignment: 'right'
                },
                {
                  text: " \nBOLETA DE PAGOS\n\n",
                  alignment: 'center',
                  style: 'header'  
                },

{

                    table: {
                    widths: [530],

                      body: [
                        [
                          {
                            table: {
                              headerRows: 1,
                              body: [
                                 [{text: 'UNIDAD DE:', bold: true},$scope.persona.tramite.tra_nombre,{text: 'FECHA: ', bold: true},fechaCONT,{text: 'HORA: ', bold: true},horaC],
                                  [{text: 'HEMOS RECIBIDO DEL SR:', bold: true},$scope.persona.persona.per_nombres+" "+$scope.persona.persona.per_apellido_primero+" "+$scope.persona.persona.per_apellido_segundo,{text: ''},'',{text: ' '},''],
                                   [{text: 'LA SUMA DE:', bold: true},$scope.persona.tramite.tra_costo+" BOLIVIANOS",{text: ''},'',{text: ' '},''],
                                   [{text: 'POR CONCEPTO DE:', bold: true},$scope.persona.tramite.tra_nombre,{text: ''},'',{text: ' '},''],
                             
                                
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
                            widths: [130, 130, 130,130],
                            body: [
                                  ['\n \n',''/*,'',''*/],
                                  ['\n \n',''/*,'\n\n',''*/],
                                  ['',''/*,'\n\n',''*/],                                  
                                  [{text: 'REVISADO', bold: true, alignment: 'center'},
                                  {text: 'FIRMA USUARIO', bold: true,alignment: 'center'}/*,{text: '', bold: true,alignment: 'center'},{text: '', bold: true, alignment: 'center' }*/]
                              ]
                            },
                            layout: 'noBorders',
                            style: 'cuerpo1',
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

              $scope.openPdf1 = function() {
                
                pdfMake.createPdf(docDefinition).open();
              };

              $scope.downloadPdf1 = function() {
                pdfMake.createPdf(docDefinition).download();
              };
 

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
    });// ============  FIN persona tramite.get

}])//=================  FIN pdf_pago_Ctrl


// 





























/*BUSCA PERSONA POR CI*/
.controller('BuscaPersonaCtrl', ['$http', '$scope', 'CONFIG', buscaPersonaController])
function buscaPersonaController($http, $scope, CONFIG){
  $scope.buscaPersona = function(){
    console.log('esta buscando persona');
      $scope.resultado="Cargando...";
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/personas_ci/'+$scope.per_ci).success(function(respuesta){
          $scope.persona = respuesta.persona;
          if(!respuesta.persona){
              $scope.ver=false;
              $scope.resultado=" La persona no se encuentra registrada";              
          } else if(respuesta.persona){
              $scope.ver=true;
              $scope.resultado='';
          }  
      });
  }
}


