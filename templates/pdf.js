  /*-----------------------------REPORTES PDF ADMINISTRADOR DE SEDES-----------------------------------------*/

  /******************FUNCIONARIOS*******************/

   function generate() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de personal de salud'
        });
        //pdf.text(300, 40, 'LISTA DE FUNCIONARIOS' );


/*        pdf.autoTableSetDefaults({
             margin: {top: 25},
             addPageContent: function(data) {
                 pdf.setFontSize(20);
                 pdf.text('Document specific header', data.settings.margin.left, 20);
             }
        });
*/

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              pdf.text(280,30, "LISTA DE PERSONAL DE SALUD");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("table"));
        var col=res.columns;
        col.splice(4,4);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            1: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

/*********************************ESTABLECIMIENTOS************************************************/
        function generateEST() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de establecimientos de salud'
        });
        pdf.text(270, 40, 'LISTA DE ESTABLECIMIENTOS DE SALUD' );

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tablaES"));
        var col=res.columns;
        col.splice(6,7);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
            2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
            4: {columnWidth: 'auto'},
            5: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

/********************************SERVICIOS**************************/

 function generateSER() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de servicios de salud'
        });
        //pdf.text(300, 40, 'LISTA DE SERVICIOS DE SALUD' );

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
             pdf.text(280,30, "LISTA DE SERVICIOS DE SALUD");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tablaSER"));
        var col=res.columns;
        col.splice(3,4);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //para arreglar tamanios de la tabla
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
            2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };


/*-------------------------------REPORTES DE ADMINISTRADOR DE ESTABLECIMIENTO DE SALUD-------------------------------------*/
/*  1)  funcionarios  */
function generateFUN_AE() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de personal de salud'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
          console.log("dataaa",data);
             // HEADER
              pdf.text(280,30, "LISTA DE PERSONAL");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("table"));
        console.log("resss",res);
        var col=res.columns;
        col.splice(4,5);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'},
           4: {columnWidth: 'auto'},
           5: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

/*  2) consultorios*/

function generateCON() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de consultorios'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
          console.log("data_cons",data);
             // HEADER
              pdf.text(280,30, "LISTA DE CONSULTORIOS");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tableCON"));
        var col=res.columns;
        col.splice(4,5);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            //rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           // 0: {columnWidth: 300}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

function generateCon_usa() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  
        pdf.setProperties({
          title: 'Lista de consultorios'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {

             // HEADER
              pdf.text(280,30, "LISTA DE CONSULTORIOS");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("table"));
        console.log("resss",res);
        var col=res.columns;
        col.splice(3,5);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'},
           4: {columnWidth: 'auto'},
           5: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

/*  3) servicios del estblecimiento de salud  */

function generateSER_AE() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  


        pdf.setProperties({
          title: 'Lista de servicios de salud'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              pdf.text(280,30, "LISTA DE SERVICIOS DE SALUD");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tableSER"));
        var col=res.columns;
        col.splice(3,5);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            //rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           // 0: {columnWidth: 300}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'}
          }
        });
        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };

        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");

      };

/*  4) pacientes del estblecimiento de salud  */

function generatePAC_AE() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  

        pdf.setProperties({
          title: 'Lista de pacientes'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              pdf.text(280,30, "LISTA DE PACIENTES");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tablePAC"));
        var col=res.columns;
        col.splice(5,6);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            //rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           // 0: {columnWidth: 300}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'}
          }
        });     
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };
        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");
      };

/*  5) referencias recibidas  */

function generateREF_AE() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  

        pdf.setProperties({
          title: 'Lista de referencias'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              pdf.text(280,30, "LISTA DE REFERENCIAS");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tableREF"));
        var col=res.columns;
        col.splice(7,8);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            //rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           // 0: {columnWidth: 300}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'},
           4: {columnWidth: 'auto'},
           5: {columnWidth: 'auto'},
           6: {columnWidth: 'auto'}
          }
        });     
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };
        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");
      };

/*  6) contrareferencias realizadas */

function generateCON_AE() {
        var pdfsize = 'a4';
        var pdf = new jsPDF('l', 'pt', 'letter');  

        pdf.setProperties({
          title: 'Lista de contrareferencias'
        });

        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
             // HEADER
              pdf.text(220,30, "LISTA DE CONTRAREFERENCIAS");
            //FOOTER
              var str = "Página " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+
              if (typeof pdf.putTotalPages === 'function') {
                  str = str + " de " + totalPagesExp;
              }
              pdf.setFontSize(10);
              pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        };


        var res = pdf.autoTableHtmlToJson(document.getElementById("tableCON"));
        var col=res.columns;
        col.splice(5,6);
        pdf.autoTable(col, res.data, {
          addPageContent: pageContent,
          theme: 'grid',
          //startY: pdf.autoTableEndPosY() + 30,
          startY: 60,
          styles: {
            overflow: 'linebreak',
            fontSize: 10,
            //rowHeight: 40,
            columnWidth: 'wrap'
          },
          columnStyles: {
            //1: {columnWidth: 'auto'}
           // 0: {columnWidth: 300}
           0: {columnWidth: 'auto'},
           1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
           3: {columnWidth: 'auto'},
           4: {columnWidth: 'auto'},
           5: {columnWidth: 'auto'},
           6: {columnWidth: 'auto'}
          }
        });     
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        };
        /*pdf.save(pdfsize + ".pdf");*/
        pdf.output("dataurlnewwindow");
      };
