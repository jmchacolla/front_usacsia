'use strict';
angular.module("adminApp")

.controller('CertificadoCtrl', ['CONFIG', /*'authUser',*/ '$scope', 'EmpTra', '$route', '$routeParams', 'toastr', '$location', function (CONFIG,/*authUser,*/$scope,EmpTra,$route,$routeParams,toastr,$location) {
    

    var et_id = $routeParams.et_id;
    EmpTra.get({et_id:et_id}, function(data)
    {
        console.log(data);
        $scope.empresatramite=data.establecimiento;

        $scope.ajustes = {
          menu:{
            titulo: 'Impresión de certificado sanitario',
            items:[
              {nombre:'Ciudadanos Registrados', enlace:'#/persona-usacsia', estilo:'active'}]
          },
          pagina:{
            titulo:'Registro de Certificado Sanitario trámite N°: '+$scope.empresatramite.empresa_tramite.et_numero_tramite
          }
        }

    })


}])

.controller('PdfCertificadoCtrl', ['CONFIG', /*'authUser',*/ '$scope', 'EmpTra', '$route', '$routeParams', 'toastr', '$location', function (CONFIG,/*authUser,*/$scope,EmpTra,$route,$routeParams,toastr,$location) {


  var et_id = $routeParams.et_id;
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id=FunG.fun_id;//remplaar con la sesion

  
  EmpTra.get({et_id:et_id},function (argument) {
    console.log(argument);
    $scope.empresatra=argument.establecimiento;


        var gober='';
        var sedes='';
        var ifirma='';
        var watermark='';
        var tituloqr='';
        var textoqr='';
        var razon_social='';
        var clasificacion='';
        var tipotramite='';
        var item='';
        var propietario='';
        var direccion='';
        var gestion='';
        var vencimiento='';
        var nroregistro='';
        var kardex='';


        var img2 =convertImgToDataURLviaCanvas("./scripts/escudo-gober.png", function(base64Img) {
          gober =base64Img;
          var img3 =convertImgToDataURLviaCanvas("./scripts/logoSEDES.png", function(base64Img) {
            sedes =base64Img;
            /*var img4 =convertImgToDataURLviaCanvas( 'imagenfirma', function(base64Img) {
              ifirma =base64Img;*/
                var img5 =convertImgToDataURLviaCanvas("./images/waterlogoSEDES.png", function(base64Img) {
                  watermark =base64Img;

                var docDefinition = {
                  pageOrientation: 'portrait',
                  pageSize: 'letter',
                  pageMargins: [ 30, 30, 30, 30 ],

                  info: {/*Metadatos*/
                    title: 'textoqr',
                    author: 'USACSIA-SEDES LA PAZ',
                    subject: 'certificado sanitario'+tituloqr,
                    keywords: 'certificado sanitario',
                    creator: 'USACSIA',
                    producer: 'USACSIA',
                  },
                  content:[
                    {
                      image:gober, width:125, height:125, absolutePosition:{x:30, y:50}
                    },
                    {
                      image:sedes, width:80, height:125, absolutePosition:{x:480, y:50}
                    },
                    {
                      image: watermark, width: 300, height:500, absolutePosition:{x:150, y: 200}
                    },
                    {
                      text:'GOBIERNO AUTÓNOMO DEPARTAMENTAL DE LA PAZ', fontSize: 22, alignment: 'center', color:'#BA0000', bold: true,
                    },
                    {
                      text:'SERVICIO DEPARTAMENTAL DE SALUD', fontSize: 18, alignment: 'center', color:'#BA0000', margin:[0,20,0,0], bold: true,
                    },
                    {
                      text:'UNIDAD DE SALUD AMBIENTAL, CONTROL SANITARIO\n E INOCUIDAD ALIMENTARIA ', fontSize: 13, alignment: 'center', color:'#BA0000', margin:[0,20,0,0]
                    },
                    {
                      text:'CERTIFICADO SANITARIO ', fontSize: 45, bold:true, alignment: 'center', color:'#007E31', margin:[0,30,0,0]
                    },
                    {
                      text: 'Que de conformidad a alos Art. 57 al 70 Capítulo V, del Control Sanitario de Establecimientos Públicos y de alimentos en actual vigencia, El Servicio Departamental de Salud, Autoriza el Funcionamiento de:', fontSize:10, alignment:'center', bold:true, margin:[40,0,40,0]
                    },
                    {
                      table:{
                        
                        widths:[120, 120, 120, 120],
                        body:[
                              [
                                {text:'RAZON SOCIAL RAZON SOCIAL RAZON SOCIAL', colSpan:3, alignment:'right', fontSize:34, bold:true,italics: true},
                                {},
                                {},
                                {qr: 'textoqr', fit:100, alignment: 'right'}
                              ],
                              [
                                {text:'DENOMINACIÓN', colSpan:4, alignment:'center', fontSize:13, bold:true},
                                {},
                                {},
                                {}
                              ],
                              [
                                {text:'CLASIFICACIÓN: ', alignment:'left', bold:true, fontSize:13},
                                {text:'clasificacion', alignment:'center', bold:true, fontSize:15},
                                {text:'DERECHO DE: ', alignment:'left', bold:true, fontSize:13},
                                {text:'tipotramite', alignment:'center', bold:true, fontSize:15},
                              ],
                              [
                                {text:'ITEM: ',alignment:'left', bold:true, fontSize:13},
                                {text:'item', alignment:'center', bold:true, colSpan:3, fontSize:15},
                                {},
                                {},
                              ],
                              [
                                {text:'PROPIETARIO: ',alignment:'left', bold:true, fontSize:13},
                                {text:'propietario', alignment:'center', bold:true, colSpan:3, fontSize:15},
                                {},
                                {},
                              ],
                              [
                                {text:'DIRECCIÓN: ',alignment:'left', bold:true, fontSize:13},
                                {text:'direccion', alignment:'center', bold:true, colSpan:3, fontSize:15},
                                {},
                                {},
                              ],
                              [
                                {text:'GESTIÓN: ',alignment:'left', bold:true, fontSize:13},
                                {text:'gestion', alignment:'center', bold:true, fontSize:15},
                                {text:'VENCIMIENTO: ',alignment:'left', bold:true, fontSize:13},
                                {text:'vencimiento', alignment:'center', bold:true, fontSize:15},
                              ],
                              [
                                {text:'N° DE REGISTRO: ',alignment:'left', bold:true, fontSize:13},
                                {text:'nroregistro', alignment:'center', bold:true, fontSize:15},
                                {text:'KARDEX: ',alignment:'left', bold:true, fontSize:13},
                                {text:'kardex', alignment:'center', bold:true, fontSize:15},
                              ],

                        ]
                      },
                      margin:[20, 30, 10, 0],
                      layout: 'noBorders',
                      // layout: 'lightHorizontalLines',
                      border: [false, false, false, false]
                    },
                    {
                      table:{
                        body:[
                              [
                                {text:'NOTA: ',alignment:'left', bold:true, fontSize:13},
                                {text:'Señor Propietario este Certificado deberá estar en un lugar visible Según el Art. 57 del Código de Salud, la renovación es anual y de caracter obligatorio. Se debe prestar la colaboración a los funcionarios del SEDES, debidamente identificados las veces que lo requieran.', alignment:'justify'}
                              ]
                        ]
                      },
                      margin:[20, 30, 10, 0],
                      layout: 'noBorders',
                      border: [false, false, false, false]
                    },
                    {
                      table:{
                        widths:[160,160,160],
                        body:[
                                [
                                  {text:'RESPONSABLE\n CERTIFICADO SANITARIO', fontSize:8, bold:true, alignment:'center'},
                                  {text:'JEFE UNIDAD DE SALUD AMBIENTAL, CONTROL SANITARIO E INOCUIDAD ALIMENTARIA', fontSize:8, bold:true, alignment:'center'},
                                  {text:'JEFE DE UNIDAD\n ADMINISTRATIVA FINANCIERA', fontSize:8, bold:true, alignment:'center'}
                                ]

                        ]
                      },
                      absolutePosition:{x:50, y:720},
                      layout: 'noBorders',
                      border: [false, false, false, false]
                    }
                  ]


                }

                $scope.openPdfCES = function() {
                  pdfMake.createPdf(docDefinition).open();
                };

                $scope.downloadPdfCES = function() {
                  pdfMake.createPdf(docDefinition).download();
                };

              });//-----/img5
            /*});//----/img4*/
          });//------/img3
        });//--------/img2

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



  });/*-----/EmpTra.get*/

   



}])