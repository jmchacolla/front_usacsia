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
  var FunG = localStorage.getItem("Funcionario");
  var FunG = JSON.parse(FunG);
  var fun_id = FunG.fun_id;

  $scope.ficha1='';
  $scope.ficha='';

  EmpTra.get({et_id:et_id},function(data){
    $scope.emp_tra=data.establecimiento;
    console.log("VER EMPRESA_TRAMITE___________",$scope.emp_tra);
  });
  //guarda la ficha input pt_id
/*  $scope.savef=function(a)
  {
     $scope.ficha.pt_id=a;
     console.log('hasta aqui llego la funcion',$scope.ficha);
    Ficha.save($scope.ficha).$promise.then(function(data)
    {
      if(data.status)
      {
        $scope.ajustes.pagina.success="Muestra asignada exitosamente";
        $scope.aux2=data.ficha.fic_id;
        console.log('ESTE ES EL NUMERO DE FICHA QUE SE ASIGNÓ',$scope.aux2);
        verNumeroFicha($scope.aux2);
        toastr.success('Número de ficha asignada correctamente');
      }
    });
  }*/
/*  function verNumeroFicha(fic_id){
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/ficha/'+fic_id).success(function(respuesta){
          $scope.num_ficha_traido_del_crear = respuesta.ficha.fic_numero;
          console.log('llamo a la funcion', $scope.num_ficha_traido_del_crear);
      });
  }
*/

/*  $scope.recarga=function(){
    $route.reload();
  }*/

}])
