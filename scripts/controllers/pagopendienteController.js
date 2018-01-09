'use strict';
angular.module("adminApp")

.controller('BoletaCesCtrl', ['$scope', '$http', 'EmpTra', 'Tramite','PagoPendienteTramite', 'PagoPendiente', 'EmpresaTramite', 'CrearEstados', '$route', '$resource', '$routeParams', 'toastr', '$location', '$timeout', 'CONFIG', function ($scope, $http,EmpTra, Tramite, PagoPendienteTramite, PagoPendiente, EmpresaTramite, CrearEstados, $route, $resource,$routeParams, toastr, $location, $timeout,CONFIG) {
  var et_id=$routeParams.et_id;
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;

      $scope.ajustes = {
        menu:{
          titulo: 'Búsqueda de Establecimiento',
          items:[
            {nombre:'Solicitudes de Propietarios Naturales', enlace:'#/tramites_certi', estilo:''},
            {nombre:'Solicitudes de Propietarios Juridicos', enlace:'#/tramites_certiJ', estilo:''},
            {nombre:'Buscar empresa solicitante', enlace:'#/buscar-propietario', estilo:''}/*,
            {nombre:'Registrar pago', enlace:'#/boleta-ces/'+et_id, estilo:'active'}*/
           ]
        },
        pagina:{
          titulo:'Boleta de pago Formulario N° 1'
        }
      }
EmpTra.get({et_id:et_id}, function (argument) {
      console.log('argument-------', argument);
      $scope.establecimiento=argument.establecimiento;
    })
    Tramite.get(function(data){
    $scope.tramite = data.tramites;
    console.log("tramite del get",$scope.tramite);
      $scope.monto = function(costo){
        console.log("tramite del get",costo);
          $scope.establecimiento.et_monto=costo;  
          // $scope.pagop=costo;
      }
    })
    // $scope.verpagos=function (tra_id) {
    //   if (tra_id==2) {
          
    //       $scope.verdeudas=true;
    //       PagoPendienteTramite.get({et_id:et_id}, function (argument) { 
    //         console.log('argument-------', argument);
    //         if (argument.pagop.length<=0) {
    //           $scope.verdeudas=false;
    //         }
    //         else{
    //           $scope.pagop=argument.pagop;
    //         }
    //       })
    //   }
      
    // }
    $scope.save=function (et_id, tra_costo) {
      // var today=moment().format('DD-MM-YYYY');
      var pago={
              fun_id:fun_id,/*-------debe recoger de la sesion*/
              et_estado_pago:'PAGADO',
              et_estado_tramite:'INICIADO',
              et_monto:tra_costo
          };
      CrearEstados.save({et_id:et_id}).$promise.then(function (data) {
        console.log('los estados++++++++', data);
      })


      $http.post(CONFIG.DOMINIO_SERVICIOS+'/crearestados/'+et_id).success(function(respuesta){
        console.log("_respuesta__",respuesta);
      });



      EmpTra.update({et_id:et_id},pago, function (argument) {
          toastr.success('Pago registrado exitosamente');
          console.log('pago', argument);
          if (argument.mensaje) {
            $timeout(function() {
                $location.path('/boleta-ces-f1/'+et_id);
            },200);
          }
      })

      /*var emptramite={
        fun_id:1,//----------------debe recoger de la sesion
        et_estado_pago:'PAGADO',
        et_estado_tramite:'INICIADO',
      };*/
      /*EmpresaTramite.update(emptramite, {et_id:et_id}, function (data) {
          toastr.success('Pago registrado exitosamente');
        console.log('empt', data);
        if (data.mensaje) {
          $timeout(function() {
              $location.path('/pago-pendiente/'+pp_id);
          },1000);
        }
      })*/
    }
}])

.controller('BoletaCesVerCtrl', ['CONFIG', /*'authUser',*/ '$scope', 'PagoPendiente', '$route', '$routeParams', 'toastr', '$location', function (CONFIG,/*authUser,*/$scope,PagoPendiente,$route,$routeParams,toastr,$location) {
    var pp_id=$routeParams.pp_id;
    $scope.ajustes = {
      menu:{
        titulo: 'Gestión de Trámites',
        items:[
          {nombre:'Buscar empresa solicitante', enlace:'#/buscar-propietario', estilo:''},
          // {nombre:'Lista de pagos', enlace:'#/', estilo:''},
          // {nombre:'Imprimir boleta de pago', enlace:'#/pago-pendiente/'+pp_id, estilo:'active'}
          ]
      },
      pagina:{
        titulo:'Boleta de pago'
      }
    }
    PagoPendiente.get({pp_id:pp_id}, function (argument) {
        $scope.pagop=argument.pagop;
        console.log('pagop----',$scope.pagop);
    })
}])
.controller('BoletaF1Ctrl', ['$scope', 'CONFIG', '$route', '$routeParams', 'toastr', '$location', 'Tramite', 'EmpresaTramite', function ($scope,CONFIG,$route,$routeParams,toastr,$location,Tramite, EmpresaTramite) {
  var et_id=$routeParams.et_id;
  $scope.ajustes = {
    menu:{
      titulo: 'Gestión de Trámites',
      items:[
        {nombre:'Buscar empresa solicitante', enlace:'#/buscar-propietario', estilo:''},
        // {nombre:'Lista de pagos', enlace:'#/', estilo:''},
        {nombre:'Imprimir boleta de pago', enlace:'', estilo:'active'}
        ]
    },
    pagina:{
      titulo:'Comprobante de pago'
    }
  }
  EmpresaTramite.get({et_id:et_id}, function (argument) {
    $scope.establecimiento=argument.establecimiento;
    console.log('et_id++++++++', argument);
    console.log('establecimiento++++++++', $scope.establecimiento);
    Tramite.get({tra_id:$scope.establecimiento.empresa_tramite.tra_id}, function (data) {
      $scope.tramite=data.tramite;
    })
    var nombre="";
    var monto=null;
    var fecha_pago=moment($scope.establecimiento.empresa_tramite.et_fecha_ini, "YYYY-MM-DD") .format("DD-MM-YYYY");
    // var horaC=fecha_cont[1];
    // var fechaCONT = moment(fecha_cont,"DD-MM-YYYY").format("DD-MM-YYYY");
    var firma_acomp = "FIRMA USUARIO";
    var bolivia="";
    var gober="";
    var sedes="";

    var img2 =convertImgToDataURLviaCanvas("./scripts/escudo-gober.png", function(base64Img) {
      gober =base64Img;
      var img3 =convertImgToDataURLviaCanvas("./scripts/logoSEDES.png", function(base64Img) {
        sedes =base64Img;

        var docDefinition = {
            
            pageOrientation: 'landscape',
            pageSize: 'A6',
            pageMargins: [ 30, 10, 30, 10 ],

              watermark:{text:'EN DESARROLLO', color: 'blue', opacity: 0.3, bold: true, italics: false},
            content: [
            ]
          }


        $scope.openPdfF1 = function() {
          console.log('llego maricas');
          pdfMake.createPdf(docDefinition).open();
        };

        $scope.downloadPdfF1 = function() {
          console.log('llego maricas');
          pdfMake.createPdf(docDefinition).download();
        };


      });//-----img3
    });//----img2
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





  })//-----empresa_tramite
  
}])
.controller('pdf_pagopF_Ctrl',['$scope', 'PagoPendiente', 'CONFIG','$routeParams', '$http', function ($scope, PagoPendiente, CONFIG, $routeParams, $http){
  // prepare the document definition using declarative approach
    var id = $routeParams.pp_id;
    console.log("IDEDESS",id);
   /* var id=8;*/
    PagoPendiente.get({pp_id:id}, function(data)
    {
      $scope.pagop = data.pagop;
      console.log('pagopp---', $scope.pagop);
      var nombre='';
      var identificador='';
      // if ($scope.pagop.propietario.pjur_id) {
      //       nombre=$scope.pagop.propietario.pjur_nombre;
      //       identificador=$scope.pagop.propietario.pjur_nit;
      // }
      if ($scope.pagop.propietario.per_id) {
            nombre=$scope.pagop.propietario.per_nombres+' '+$scope.pagop.propietario.per_apellido_primero+' '+$scope.pagop.propietario.per_apellido_segundo;
            identificador=$scope.pagop.propietario.per_ci+'  '+$scope.pagop.propietario.per_ci_expedido;
      }
      var fechapago= $scope.pagop.et.pt_fecha_ini;
      var fecha_cont=moment($scope.pagop.pagop.pp_fecha_pagado, "YYYY-MM-DD") .format("DD-MM-YYYY");
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
            console.log("entro al controlador pdf",$scope.pagop)

            var tituloqr= 'Nro. Trámite: '+$scope.pagop.et.et_numero_tramite;
            var textoqr= 'USACSIA-CERTIFICADO-SANITARIO-'+$scope.pagop.et.et_numero_tramite+'-'+identificador;
            //estilo, encabezado de QR
            function header(text) {
              return {text: text, margins: [0, 0, 0, 8],alignment: 'right'};
            }
            var docDefinition = {
                
                pageOrientation: 'landscape',
                pageSize: 'A5',
                pageMargins: [ 30, 10, 30, 10 ],

                content: [

                  {
                  table: {
                  widths: [110, 310, 100],
                  body: [
                      [
                        {
                          image: gober,
                          width: 68,
                          height: 73
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
                          height: 55,
                          alignment:'right'
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
                   text: "C.I./NIT:  "+identificador, fontSize: 12, alignment: 'right'
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
                                 [{text: 'UNIDAD DE:', bold: true},$scope.pagop.tramite.tra_nombre,{text: 'FECHA: ', bold: true},fechaCONT,{text: 'HORA: ', bold: true},horaC],
                                  [{text: 'HEMOS RECIBIDO DEL SR:', bold: true}, nombre, {text: ''},'',{text: ' '},''],
                                   [{text: 'LA SUMA DE:', bold: true},$scope.pagop.pagop.pp_monto_total+" BOLIVIANOS",{text: ''},'',{text: ' '},''],
                                   [{text: 'POR CONCEPTO DE:', bold: true},$scope.pagop.pagop.pp_descripcion,{text: ''},'',{text: ' '},''],
                             
                                
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

              $scope.openPdfCESF1 = function() {
                console.log('llego maricas');
                pdfMake.createPdf(docDefinition).open();
              };

              $scope.downloadPdfCESF1 = function() {
                console.log('llego maricas');
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



