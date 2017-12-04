'use strict';
angular.module("adminApp")
.controller('ListarAlertasCtrl', ['$scope', 'Alertas', '$route', 'toastr', function ($scope, Alertas, $route, toastr){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	$scope.ajustes = {
	  menu:{
		  titulo: 'Gestion de Alertas Preventivas',
		  items:[{nombre:'Crear nueva alerta', enlace:'#/crear_alerta',estilo:''},
				 {nombre:'Lista de alertas', enlace:'#/alertas',estilo:'active'}]
	  },
	  pagina:{
		  titulo:'Lista de alertas preventivas'
	  }
	}

	$scope.sortType = 'ca_id'; // set the default sort type
  	$scope.sortReverse  = true;
  	$scope.loading=true;

	$scope.obtiene_alerta = function(id_alerta){
		Alertas.get({ca_id:id_alerta},function(data){
			$scope.valerta = data.configuracion_alerta;
			if($scope.valerta.ca_fecha_campania != null)
			{
				$scope.valerta.ca_fecha_campania = moment($scope.valerta.ca_fecha_campania,"YYYY-MM-DD").format("DD-MM-YYYY");
			}
			console.log($scope.valerta);
		});
	};

	Alertas.get(function(data){
		$scope.alertas = data.configuracion_alerta;
		for(var i in $scope.alertas){
			if($scope.alertas[i].ca_fecha_campania != null)
			{
				$scope.alertas[i].ca_fecha_campania = moment($scope.alertas[i].ca_fecha_campania,"YYYY-MM-DD").format("DD-MM-YYYY");
			}
		}
		if(data.status){
			$scope.msg = data.status;// HACER TRUEEEEEE
			$scope.loading = false;
		}

		
	},function () {
      console.log("error");
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });

	var id = 0;
	$scope.tipo= "";
	$scope.get_ca_id = function(ca_id, men_tipo){
		id=ca_id;
		console.log(id);
		console.log(men_tipo);
		$scope.tipo = men_tipo;
		console.log($scope.tipo);
	}

	$scope.remove = function(ca_id){
		console.log(id);
	    Alertas.delete({ca_id:id}).$promise.then(function(data){
	      if(data.mensaje){
	        toastr.success('Eliminado correctamente');
	        $route.reload();
	      }
	    })
  	}
}])

.controller('ListarAlertasVacunasCtrl', ['$scope', 'AlertasVacunas', '$route', 'toastr', function ($scope, AlertasVacunas, $route, toastr){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	$scope.ajustes = {
	  menu:{
		  titulo: 'Gestion de Alertas Preventivas',
		  items:[{nombre:'Crear nueva alerta', enlace:'#/crear_alerta',estilo:''},
				 {nombre:'Lista de alertas', enlace:'#/alertas',estilo:'active'}]
	  },
	  pagina:{
		  titulo:'Lista de alertas preventivas'
	  }
	}

	$scope.sortType = 'atv_id'; // set the default sort type
  	$scope.sortReverse  = true;
  	$scope.loading=true;

	$scope.obtiene_alerta_vacuna = function(id_alerta){
		AlertasVacunas.get({atv_id:id_alerta},function(data){
			$scope.alertav = data.vacuna_alerta;
			$scope.alertav.atv_id = id_alerta;
			console.log($scope.alertav);
		});
	};

	AlertasVacunas.get(function(data){
		$scope.vacunas = data.vacuna;
		if(data.status){
			$scope.msg = data.status;// HACER TRUEEEEEE
			$scope.loading = false;
		}
		$scope.loading = false;
	},function () {
      console.log("error");
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });

	var id = 0;
	$scope.tipo = "";
	$scope.get_atv_id = function(atv_id, men_tipo){
	    id=atv_id;
		console.log(id);
		$scope.tipo = men_tipo;
	}

	$scope.remove = function(atv_id){
		console.log(id);
	    AlertasVacunas.delete({atv_id:id}).$promise.then(function(data){
	      if(data.mensaje){
	        toastr.success('Eliminado correctamente');
	        $route.reload();
	      }
	    })
	}

}])
.controller('CrearAlertaCtrl', ['$scope', 'Alertas', 'Enfermedades', 'Vacunas', 'AlertasVacunas', '$route', '$location', '$timeout', 'toastr',
	function ($scope, Alertas, Enfermedades, Vacunas,AlertasVacunas ,$route, $location, $timeout, toastr){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	$scope.ajustes = {
		menu:{
			titulo: 'Gestion de Alertas Preventivas',
			items:[{nombre:'Crear nueva alerta', enlace:'#/crear_alerta',estilo:'active'},
				 {nombre:'Lista de alertas', enlace:'#/alertas',estilo:''}]
		},
		  	pagina:{
			  	titulo:'Crear nueva alerta preventiva'
		}
	}
	Alertas.get(function(data){
		$scope.alertas = data.configuracion_alerta;
	});
	Enfermedades.get(function(data){
		$scope.enfermedades = data.enfermedad;
	});
	Vacunas.get(function(data){
		$scope.vacunas = data.vacuna;
	});
	$scope.patternFecha = /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/;
    $scope.configuracion = {
		men_encabezado:'',
		men_cuerpo:'',
		men_despedida:'',
		men_tipo: '',
		ca_intervalo_inicio_envio:null,
		ca_intervalo_fin_envio:null,
		ca_frecuencia:null,
		ca_fecha_campania:null,
    	ca_sexo:'',
		enf_id:null,
		vac_id:null,
	};
	$scope.patternCadenaNumero = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ. 0-9]*$/;
  
	$scope.es_menor_igual = function(){
  		if($scope.configuracion.ca_intervalo_inicio_envio <= $scope.configuracion.ca_intervalo_fin_envio){
  			return true;
  		} else {
  			return false;
  		}
  	}
    $scope.submit_vacuna = function()
    {	
    	$scope.configvacuna = {
    		men_encabezado:$scope.configuracion.men_encabezado,
			men_cuerpo:$scope.configuracion.men_cuerpo,
			men_despedida:$scope.configuracion.men_despedida,
			vac_id:$scope.configuracion.vac_id
    	}
        AlertasVacunas.save($scope.configvacuna).$promise.then(function(data)
        {	
        	console.log("Datos de la vacuna");
        	console.log(data);
            if(!data.error)	
            {
				console.log('Se envio');
				toastr.success('Alerta creada correctamente');
		        $timeout(function() {
		          	$location.path('/alertas');
		        },0);
            }
        })
    }
    $scope.submit_prevencion = function()
    {
        Alertas.save($scope.configuracion).$promise.then(function(data)
        {
        	console.log('Para prevencion');
        	console.log(data);
            if(!data.error)	
            {
				console.log('Se envio');
				toastr.success('Alerta creada correctamente');
		        $timeout(function() {
		          	$location.path('/alertas');
		        },0);
            }
        })
    }
    $scope.submit_campania = function()
    {
        Alertas.save($scope.configuracion).$promise.then(function(data)
        {
        	console.log('Para campania');
        	console.log(data);
            if(!data.error)	
            {
				console.log('Se envio');
				toastr.success('Alerta creada correctamente');
		        $timeout(function() {
		          	$location.path('/alertas');
		        },0);
            }
        })
    }
}])

.controller('EditarAlertaCtrl', ['authUser', '$scope', '$routeParams', 'Alertas', 'Enfermedades', 'Vacunas', 'AlertasVacunas', '$route', '$location', '$timeout', 'toastr',
	function (authUser, $scope, $routeParams, Alertas, Enfermedades, Vacunas,AlertasVacunas ,$route, $location, $timeout, toastr){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	if(authUser.isLoggedIn()){
	$scope.ajustes = {
		menu:{
			titulo: 'Gestion de Alertas Preventivas',
			items:[{nombre:'Crear nueva alerta', enlace:'#/crear_alerta',estilo:''},
				 {nombre:'Lista de alertas', enlace:'#/alertas',estilo:''}]
		},
		  	pagina:{
			  	titulo:'Editar alerta preventiva'
		}
	}
	
	Enfermedades.get(function(data){
		$scope.enfermedades = data.enfermedad;
	});
	Vacunas.get(function(data){
		$scope.vacunas = data.vacuna;
	});
	
	var ca_id = $routeParams.ca_id;
	Alertas.get({ca_id:ca_id}, function(data){
		$scope.configuracion = data.configuracion_alerta;
		if($scope.configuracion.ca_fecha_campania != null)
		{
			$scope.configuracion.ca_fecha_campania = moment($scope.configuracion.ca_fecha_campania,"YYYY-MM-DD").format("DD-MM-YYYY");
		}
	})

     $scope.submit = function()
    {
        Alertas.update({ca_id:$scope.configuracion.ca_id}, $scope.configuracion).$promise.then(function(data)
        {
        	console.log(data);
            if(!data.error)	
            {
				console.log('Se envio');
				toastr.success('Alerta editada correctamente');
		        $timeout(function() {
		          	$location.path('/alertas');
		        },0);
            }
        })
    }
} else {
	$location.path('/inicio');
}
}])