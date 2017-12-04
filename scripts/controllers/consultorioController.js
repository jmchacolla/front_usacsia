'use strict';
angular.module("adminApp")

.controller('ListaConsultorioCtrl',['CONFIG', 'authUser','$scope', '$routeParams','ConsultoriosEstablecimientos', 'Cons', 'toastr', '$route',
function (CONFIG,authUser, $scope, $routeParams, ConsultoriosEstablecimientos, Cons, toastr, $route){
	$scope.ajustes = {
	    menu:{
	      titulo: 'Gestión de Consultorios',
	      items:[
	        {nombre:'Consultorios', enlace:'#/consultorios', estilo:'active'},
	        {nombre:'Registrar Consultorio', enlace:'#/consultorios/create', estilo:''}]
	    },
	    pagina:{
	      titulo:'Consultorios'
	    }
	};
    $scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
  	$scope.sortType = 'con_id'; // set the default sort type
  	$scope.sortReverse  = true;  // set the default sort order
  	
  	if (authUser.isLoggedIn()) {
  		if(CONFIG.ROL_CURRENT_USER == 1){//Si es administrador del SEDES
			var es_id = $routeParams.es_id;
		}
		else{//Si es Administrador del establecimiento
			var FunG = localStorage.getItem("Funcionario");
	  		var FunG = JSON.parse(FunG);
			var es_id = FunG.es_id;
		} 
	} 	
	else{
		var es_id = $routeParams.es_id;
	}
	ConsultoriosEstablecimientos.get({es_id:es_id}, function(data)
	{
		$scope.consultorios = data.consultorio;
		if(($scope.consultorios.length >0 && data.status) ){
			$scope.loading = false;
  			$scope.msg = true;
		}
		$scope.loading = false;
	},function () {
      $scope.loading = false;
      $scope.msg = false;
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
    });

	//PARA ELIMINAR UN CONSULTORIO
	var id = 0;
	$scope.nombre = "";
	$scope.get_con_id = function(con_id, con_nombre){
	    id=con_id;
	    $scope.nombre = con_nombre;
	}

	$scope.remove = function(){
	    Cons.delete({con_id:id}).$promise.then(function(data){
	      if(data.mensaje) {
	        toastr.success('Eliminado correctamente');
	        $route.reload();
	      }
	    })
	}
}])

.controller('CreateConsultorioCtrl', ['$scope','Cons','$location', '$timeout', 'toastr', 'EstablecimientoPresta', 'ServicioConsultorios', function ($scope,Cons, $location, $timeout, toastr,EstablecimientoPresta,ServicioConsultorios){
 	$scope.ajustes = {
	    menu:{
	      titulo: 'Gestión de Consultorios',
	      items:[
	        {nombre:'Consultorios', enlace:'#/consultorios', estilo:''},
	        {nombre:'Registrar Consultorio', enlace:'#/consultorios/create', estilo:'active'}]
	    },
	    pagina:{
	      titulo:'Registrar Consultorio',
	      action: "GUARDAR"
	    }
	};
 	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;

 	EstablecimientoPresta.get({es_id:es_id}, function(data) {
        $scope.prestas = data.servicio_especialidad;
    });

	$scope.consultorios ={
		con_nombre:null,
		con_tipo:null,
		con_descripcion:null,
		con_cod:null,
	};

	$scope.servicios_consultorios = {
		con_id : null,
		se_id : null
	}

	$scope.patternCadena = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
  	$scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ 0-9,]*$/;
  
	$scope.submit =function()
	{
		Cons.save($scope.consultorios).$promise.then(function(data)
		{
			if(data.msg)
			{
				//creando el servicio consultorio
				$scope.servicios_consultorios.con_id = data.consultorio.con_id;
				ServicioConsultorios.save($scope.servicios_consultorios).$promise.then(function(data1){
					if(data1.msg){
						angular.copy({},$scope.consultorios);
						angular.copy({},$scope.servicios_consultorios);

						$scope.ajustes.pagina.success ="CONSULTORIO REGISTRADO CORRECTAMENTE";
						toastr.success('CONSULTORIO REGISTRADO CORRECTAMENTE');
		        		$timeout(function() {
		            		$location.path('/consultorios/ver/'+data.consultorio.con_id);
		        		},1000);
					} else{
						Cons.delete({con_id:data.consultorio.con_id}).$promise.then(function(data){
							toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
	      				});
					}
				});
			}
		});
	}
	$scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };
}])

.controller('VerConsultorioCtrl', ['$scope','Cons','$route','$routeParams','$location','toastr', 'ServicioConsultorios', 'EstablecimientoPresta', function ($scope,Cons,$route,$routeParams,$location,toastr,ServicioConsultorios,EstablecimientoPresta){
	$scope.ajustes = {
	    menu:{
	      titulo: 'Gestión de Consultorios',
	      items:[
	        {nombre:'Consultorios', enlace:'#/consultorios', estilo:''},
	        {nombre:'Registrar Consultorio', enlace:'#/consultorios/create', estilo:''}]
	    },
	    pagina:{
	      titulo:'Detalles Consultorio',
	      action: "AGREGAR OTRO SERVICIO"
	    }
	};

	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	EstablecimientoPresta.get({es_id:es_id}, function(data)
    {
        $scope.prestas = data.servicio_especialidad;
    });
  	
  	var con_id = $routeParams.con_id;
	Cons.get({con_id:con_id}, function(data)
	{
		$scope.consultorios = data.consultorio;
	});
	
	$scope.servicios_consultorios = {
		con_id : con_id,
		se_id : null
	}
	$scope.get_ser = function(id,nombre_servicio){
		$scope.se_sc_id = id;//recibe sc_id cuando quita un servicio y recibe se_id cuando agrega un servicio 
		$scope.nombre_servicio = nombre_servicio;
	}

	$scope.asigna_servicio_consultorio = function(se_id1){//Para agregar más servicios a un consultorio
		$scope.servicios_consultorios.se_id = se_id1;
		ServicioConsultorios.save($scope.servicios_consultorios).$promise.then(function(data){
			if(data.msg){
				angular.copy({},$scope.servicios_consultorios);
				toastr.success('SERVICIO AGREGADO CORRECTAMENTE');
        		$route.reload();
			} else{
				toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
			}
		});
	}

	$scope.quitar = function(sc_id) {
		ServicioConsultorios.delete({sc_id:sc_id}).$promise.then(function(data){
	      if(data.mensaje) {
	        $route.reload();
	        toastr.success('SERVICIO QUITADO CORRECTAMENTE');
	      }
	    })
	}
}])

.controller('EditConsultorioCtrl', ['$scope', 'Cons', '$routeParams', '$location', '$timeout', 'toastr', function ($scope, Cons, $routeParams, $location, $timeout, toastr) {
	$scope.ajustes = {
	    menu:{
	      titulo: 'Gestión de Consultorios',
	      items:[
	        {nombre:'Consultorios', enlace:'#/consultorios', estilo:''},
	        {nombre:'Registrar Consultorio', enlace:'#/consultorios/create', estilo:''}]
	    },
	    pagina:{
	      titulo:'Editar Consultorio',
	      action: "EDITAR"
	    }
	};

	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	
	var con_id = $routeParams.con_id;
	Cons.get({con_id:con_id}, function(data)
	{
		$scope.consultorio = data.consultorio;
		$scope.consultorios ={
			con_nombre:$scope.consultorio.consultorio.con_nombre,
			con_tipo:$scope.consultorio.consultorio.con_tipo,
			con_descripcion:$scope.consultorio.consultorio.con_descripcion,
			con_cod:$scope.consultorio.consultorio.con_cod,
		};
	});

	$scope.submit = function(){
		Cons.update({con_id:con_id}, $scope.consultorios).$promise.then(function(data){
			if(data.msg) {
				$scope.ajustes.pagina.success = "LOS DATOS FUERON ACTUALIZADOS CORRECTAMENTE";
	        	toastr.success('LOS DATOS FUERON ACTUALIZADOS CORRECTAMENTE');
		        $timeout(function() {
		          	$location.path('/consultorios/ver/'+data.consultorio.con_id);	          	
		        },0);
			}
		})
	}
}])