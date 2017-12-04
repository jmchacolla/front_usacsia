'use strict';
angular.module("adminApp")
.controller('CrearCitaprogramadaCtrl', ['AtiendeDiariamente','ReservasMedico','Citas','Cons','CitasMedicos','$routeParams','$auth','$scope', '$route', 'Pacientes','$http', 'CONFIG','$location', '$timeout', 'toastr', 
	function (AtiendeDiariamente,ReservasMedico,Citas,Cons,CitasMedicos,$routeParams,$auth,$scope,$route,Pacientes,$http, CONFIG, $location, $timeout, toastr){
	if(CONFIG.ROL_CURRENT_USER == 4) {
		$scope.ajustes = {
		  	menu:{
			  titulo: 'Realizar Cita Programada',
			  items:[{nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas programadas', enlace:'#/cita/list',estilo:''},
			  		 {nombre:'Historial de Citas', enlace:'#/reservas/historial_reservas',estilo:''}]
		  	},
		  	pagina:{
			  titulo:'Realizar Cita Programada'
			}
		}
	} else {//Es medico administrador
		$scope.ajustes = {
		  	menu:{
			  titulo: 'Realizar Cita Programada',
			  items:[{nombre:'Mis Citas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas',estilo:''},
			  		 {nombre:'Citas Programadas', enlace:'#/cita/list',estilo:''},
					 {nombre:'Historial de Citas', enlace:'#/reservas/historial_reservas',estilo:''}]
		  	},
		  	pagina:{
			  titulo:'Realizar Cita Programada'
			}
		}
	}
		

	$scope.cita = {
        ad_id: null,
        pac_id: null,
        cit_motivo_consulta: "",
        cit_estado_asistencia: false,
        cit_estado_pago: false,
        cit_tipo: "PROGRAMADA",
        cit_es_id: null,
        cit_se_id: null,
        cit_con_id: null,
        cit_estado_confirmacion: false
    };

    var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	var fun_id = FunG.fun_id;
	var fe_id = FunG.fe_id;

	var pac_id = $routeParams.pac_id;

	$scope.get_inf = function(horario){
		//console.log("entro a la funcion get_inf");
		$scope.horariog = horario;

		Pacientes.get({pac_id:pac_id}, function(data){
			$scope.paciente=data.paciente.persona;
			$scope.paciente1=data.paciente.paciente;
		});

		//para obtener el nombre del servicio
		Cons.get({con_id:$scope.horariog.con_id}, function(data){
			$scope.servicio=data.consultorio.servicio_consultorio;
			if($scope.servicio.length > 0){
				for(var i = 0; i < $scope.servicio.length; i++) {
					if($scope.servicio[i].sc_id == $scope.horariog.sc_id){
						$scope.nomser = data.consultorio.servicio_consultorio[i].ser_nombre;
					}
				}
			}else{
				$scope.nomser = data.consultorio.servicio_consultorio[0].ser_nombre;
			}
		});
	};

	//funcion para obtener los atiende diariamente
	//$scope.fun_id=2349;
	//$scope.loading = true;
	$scope.buscar = false;
	$scope.valida = false;
	$scope.buscar_horarios = function(){
		$scope.loading = true;
		$scope.msg = false;
		$scope.buscar = true;
		$scope.valida = false;
		var fec = moment($scope.fecha,"DD-MM-YYYY").format("YYYY-MM-DD");
		console.log("FUNN"+fun_id);
		$scope.horariosd = [];

		var pac_id = $routeParams.pac_id;
		AtiendeDiariamente.get({fe_id:fe_id,fecha:fec, pac_id:pac_id}, function(data){
			if(data.funcionario_atiende != "false"){
				console.log("no tiene cita ");
				$scope.verifica=true;
				$scope.horariosd = data.funcionario_atiende;
				//console.log("obteniendo horarios"+$scope.horariosd[1].ad_hora_inicio);

				for(var i in $scope.horariosd) {
					$scope.horariosd[i].ad_hora_inicio = toTime($scope.horariosd[i].ad_hora_inicio);
					$scope.horariosd[i].ad_fecha_atiende = moment($scope.horariosd[i].ad_fecha_atiende,"YYYY-MM-DD").format("DD-MM-YYYY");
					//console.log("ESTADO"+$scope.horariosd[i].ad_estado);
				}
				if($scope.horariosd.length > 0){
					$scope.msg = data.status;
				}

				$scope.loading = false;
				if($scope.horariosd.length > 0){
					$scope.msg = data.status;
				}
				$scope.loading = false;
			}else{
				$scope.valida=true;
				$scope.loading = false;
				console.log("tiene cita ");
			}

			//contar el numero de fichas
			CitasMedicos.get({fe_id:FunG.fe_id,fecha:fec}, function(data){
		    	$scope.citamed=data.cita;
		    	$scope.cont = $scope.citamed.length;
		    });
		},function () {
	      toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
	      $scope.loading = false;
	      $scope.msg = false;	      
	    });
		$scope.citamed=[];
		$scope.cont = 0;
		$scope.cancel = 0;
    }

	$scope.submit = function(){
		$scope.cita.ad_id = $scope.horariog.ad_id;
        $scope.cita.pac_id = $scope.paciente1.pac_id;
        $scope.cita.cit_motivo_consulta = "motivo";
        $scope.cita.cit_estado_asistencia = false;
        $scope.cita.cit_estado_pago = false;
        $scope.cita.cit_tipo = "PROGRAMADA";
        $scope.cita.cit_es_id = es_id;
        $scope.cita.cit_se_id = $scope.horariog.sc_id;
        $scope.cita.cit_con_id = $scope.horariog.con_id;
        $scope.cita.cit_estado_confirmacion = false;

		Citas.save($scope.cita).$promise.then(function(data){
			if(data.status){
				toastr.success('cita registrada correctamente');
				$timeout(function() {
               		 console.log("cit_id "+ data.cita.cit_id);
               		 $location.path('/cita/ver_cita/'+data.cita.cit_id);
           		},1000);
			}
		});
	}

	function toTime(timeString){
	    var timeTokens = timeString.split(':');
	    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
	}
}])


//Lista las citas programadas para un médico y un MédicoAdministrador
.controller('ListCitaprogramadaCtrl', ['$scope', '$route','Citas', 'ReservasMedico','Pacientes','$http', 'CONFIG','$location', '$timeout', 'toastr',
	function ($scope,$route,Citas,ReservasMedico, Pacientes,$http, CONFIG, $location, $timeout, toastr){
	if(CONFIG.ROL_CURRENT_USER == 4) {
		$scope.ajustes = {
		  menu:{
			  titulo: 'Lista Citas Programadas',
			  items:[{nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas programadas', enlace:'#/cita/list',estilo:'active'},
			  		 {nombre:'Historial de Citas Medico', enlace:'#/reservas/historial_reservas_med',estilo:''}]
		  },
		  pagina:{
			  titulo:'Lista Citas Programadas'
		  }
		}
	} else{//Medico administrador
		$scope.ajustes = {
		  menu:{
			  titulo: 'Lista Citas Programadas',
			  items:[{nombre:'Mis Citas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas',estilo:''},
			  		 {nombre:'Citas Programadas', enlace:'#/cita/list',estilo:'active'},
					 {nombre:'Historial de Citas', enlace:'#/reservas/historial_reservas',estilo:''}]
		  },
		  pagina:{
			  titulo:'Lista Citas Programadas'
		  }
		}
	}

	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	var fun_id = FunG.fun_id;
	var fe_id = FunG.fe_id;

	$scope.citprog = [];
	$scope.citprog1 = [];

	//console.log("EL ES_ID ES..."+es_id);

	$scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE
	$scope.nro_filas = 10;
	$scope.last_page=1;
	$scope.filas = [];

	ReservasMedico.get({fe_id:fe_id, nro:$scope.nro_filas}, function(data){
		$scope.loading = true;
		$scope.msg = false;
		$scope.citprog1 = data.cita;
		//console.log("tamanio "+$scope.citprog1.data.length);
		$scope.last_page = data.cita.last_page;
		for(var i in $scope.citprog1.data) {
			$scope.citprog1.data[i].cit_hora_consulta = toTime($scope.citprog1.data[i].cit_hora_consulta);
			$scope.citprog1.data[i].cit_fecha_consulta = moment($scope.citprog1.data[i].cit_fecha_consulta,"YYYY-MM-DD").format("DD-MM-YYYY");
			if($scope.citprog1.data[i].cit_estado_confirmacion){
				$scope.citprog1.data[i].cit_estado_confirmacion = "CONFIRMADA";
			}else{
				$scope.citprog1.data[i].cit_estado_confirmacion = "POR CONFIRMAR";
			}
		}
		$scope.msg = data.status;
		$scope.loading = false;

		for (var i = 0; i < $scope.last_page; i++) {
	      $scope.filas[i] = i+1;
	    };
	},function(){
	      $scope.loading = false;
	      $scope.msg = false;
	});
	//agregado
	$scope.paginar = function (url){
		//console.log("entro a la funcion");
	    if (url != null){
	      $http.get(url+"&nro="+$scope.nro_filas).success(function(respuesta){
	        $scope.citprog1 = respuesta.cita;
	        $scope.last_page=respuesta.cita.last_page;
	        for(var i in $scope.citprog1.data) {
				$scope.citprog1.data[i].cit_hora_consulta = toTime($scope.citprog1.data[i].cit_hora_consulta);
				$scope.citprog1.data[i].cit_fecha_consulta = moment($scope.citprog1.data[i].cit_fecha_consulta,"YYYY-MM-DD").format("DD-MM-YYYY");
				if($scope.citprog1.data[i].cit_estado_confirmacion){
				$scope.citprog1.data[i].cit_estado_confirmacion = "CONFIRMADA";
				}else{
					$scope.citprog1.data[i].cit_estado_confirmacion = "POR CONFIRMAR";
				}
			}
	        if($scope.citprog1.data.length >0){
	       	  $scope.loading=false;
	          $scope.msg = true;
	        }
	        else{
	          $scope.loading = false;
	          $scope.msg = false;
	        }
	      });
	    }
  	}

  	$scope.cambia_pagina = function (pag,nro) {
	    $scope.nro_filas = nro;
	    ReservasMedico.get({fe_id:fe_id, nro:nro, page:pag}, function(data){
			$scope.loading = true;
			$scope.msg = false;
			$scope.citprog1 = data.cita;
			$scope.last_page = data.cita.last_page;
			for(var i in $scope.citprog1.data) {
				$scope.citprog1.data[i].cit_hora_consulta = toTime($scope.citprog1.data[i].cit_hora_consulta);
				$scope.citprog1.data[i].cit_fecha_consulta = moment($scope.citprog1.data[i].cit_fecha_consulta,"YYYY-MM-DD").format("DD-MM-YYYY");
				if($scope.citprog1.data[i].cit_estado_confirmacion){
				$scope.citprog1.data[i].cit_estado_confirmacion = "CONFIRMADA";
				}else{
					$scope.citprog1.data[i].cit_estado_confirmacion = "POR CONFIRMAR";
				}
			}
			if($scope.citprog1.data.length >0){
	        	$scope.loading=false;
	        	$scope.msg = true;
	      	}
	      	else{
	        	$scope.loading = false;
	        	$scope.msg = false;
	      	}
		});
	}

	function toTime(timeString){
	    var timeTokens = timeString.split(':');
	    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
	}
}])

//AGREGADO Oct
.controller('AsignaFichaCtrl', ['$scope', '$route','Citas', 'Pacientes','$http', 'CONFIG','$location', '$timeout', 'toastr','$routeParams','ServiciosEstablecimiento', 'Cons',
	function ($scope,$route,Citas,Pacientes,$http, CONFIG, $location, $timeout, toastr, $routeParams, ServiciosEstablecimiento, Cons){
	$scope.ajustes = {
	  menu:{
		  titulo: 'Asignación de ficha',
		  items:[{nombre:'Asignar Ficha', enlace:'#/citas/asigna_ficha/'+$routeParams.pac_id,estilo:'active'},
		  		 {nombre:'Pacientes Registrados', enlace:'#/establecimientos/pacientes', estilo:''}]
	  },
	  pagina:{
		  titulo:'Asignación de Ficha'
	  }
	}

	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	var fun_id = FunG.fun_id;
	var fe_id = FunG.fe_id;


	//servicio que consume los servicios
    $http.get(CONFIG.DOMINIO_SERVICIOS+'/servicios_no_referencias/'+es_id).success(function(respuesta){
      $scope.servicios=respuesta.servicio_establecimiento;
 	});

 	$scope.buscar=false;
 	$scope.fichas=false;

 	//funcionarios dado el servicios
 	$scope.loading = true;
 	$scope.get_fun = function(datosSer)
 	{
 		$scope.buscar=false;
 		$scope.msg = false;
 		$scope.loading = true;
 		$scope.fichas=false;

 		//console.log("Datos ser"+datosSer.se_id+" "+datosSer.ser_nombre);
 		var se_id = datosSer.se_id;
 		$http.get(CONFIG.DOMINIO_SERVICIOS+'/servicios_establecimientos?se_id='+se_id).success(function(respuesta){
	    	$scope.funcionarios = respuesta.funcionario;
	    	$scope.est=true;
	    	$scope.loading = false;
			if($scope.funcionarios.length > 0){
				$scope.msg = respuesta.status;
			}
			$scope.loading = false;
	 	},function () {
	      toastr.error("ERROR INESPERADO, POR FAVOR VUELVA A INTENTAR");
	      $scope.loading = false;
	      $scope.msg = false;	      
	    });
 	}

 	$scope.get_horarios = function(funcionario){
 		$scope.loading1 = true;
 		$scope.msg1 = false;
 		$scope.buscar=true;
 		var fe_id = funcionario.fe_id;
 		$scope.funcionario = funcionario;
 		$scope.turno = $scope.funcionario.ct_turno;

 		$http.get(CONFIG.DOMINIO_SERVICIOS+'/atiende_diariamente?fe_id='+fe_id+"&ct_turno="+$scope.funcionario.ct_turno).success(function(respuesta){
 			$scope.horariosd = respuesta.atiende_diariamente;
 			if($scope.horariosd.length > 0){
 				$scope.fichas = true;
 				$scope.msg1 = respuesta.status;
 			}

 			$scope.nro_fichas = $scope.horariosd.length;
	 		
	 		for(var i in $scope.horariosd) {
				$scope.horariosd[i].ad_hora_inicio = toTime($scope.horariosd[i].ad_hora_inicio);
				$scope.horariosd[i].ad_fecha_atiende = moment($scope.horariosd[i].ad_fecha_atiende,"YYYY-MM-DD").format("DD-MM-YYYY");
				//console.log("ESTADO"+$scope.horariosd[i].ad_estado);
			}

	 		$scope.loading1 = false;
 		},function(){
	      $scope.loading1 = false;
	      $scope.msg1 = false;
	 	});

	 	$http.get(CONFIG.DOMINIO_SERVICIOS+'/configuracion_turnos?fe_id='+fe_id).success(function(respuesta){
 			$scope.fichas = respuesta.fichas;
 		},function(){
	     
	 	});
 	}

    //Variables para crear
	$scope.cita = {
        ad_id: null,
        pac_id: null,
        cit_motivo_consulta: "",
        cit_estado_asistencia: false,
        cit_estado_pago: false,
        cit_tipo: "TRADICIONAL",
        cit_es_id: null,
        cit_se_id: null,
        cit_con_id: null,
        cit_estado_confirmacion: true
    };

    //variable del pac_id
    var pac_id = $routeParams.pac_id;

    $scope.get_inf = function(horario){
		$scope.horariog = horario;
		Pacientes.get({pac_id:pac_id}, function(data){
			$scope.paciente=data.paciente.persona;
			$scope.paciente1=data.paciente.paciente;
		});
		//para obtener el nombre del servicio
		Cons.get({con_id:$scope.horariog.con_id}, function(data){
			$scope.consultorio=data.consultorio.consultorio.con_nombre;
			$scope.servicio=data.consultorio.servicio_consultorio;
			if($scope.servicio.length > 0){
				for(var i = 0; i < $scope.servicio.length; i++) {
					if($scope.servicio[i].sc_id == $scope.horariog.sc_id){
						$scope.nomser = data.consultorio.servicio_consultorio[i].ser_nombre;
					}
				}
			}else{
				$scope.nomser = data.consultorio.servicio_consultorio[0].ser_nombre;
			}
		});
	};

    $scope.submit = function(){
    	$scope.cita.ad_id = $scope.horariog.ad_id;
        $scope.cita.pac_id = $scope.paciente1.pac_id;
        $scope.cita.cit_motivo_consulta = "motivo";
        $scope.cita.cit_estado_asistencia = false;
        $scope.cita.cit_estado_pago = true;
        $scope.cita.cit_tipo = "TRADICIONAL";
        $scope.cita.cit_es_id = es_id;
        $scope.cita.cit_se_id = $scope.horariog.sc_id;
        $scope.cita.cit_con_id = $scope.horariog.con_id;
        $scope.cita.cit_estado_confirmacion = true;

		Citas.save($scope.cita).$promise.then(function(data){
			if(data.status){
				toastr.success('Ficha asignada correctamente');
				$timeout(function() {
               		 $location.path('/reservas/listar_reservas');
           		},1000);
			}
		});
    }

    function toTime(timeString){
	    var timeTokens = timeString.split(':');
	    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
	}

}])

//Para médicos
.controller('VerCitaprogramadaCtrl', ['$scope', '$route','$routeParams','Citas','Cons','Funcionarios','Pacientes','CONFIG','$location', '$timeout', 'toastr',
	function ($scope,$route,$routeParams,Citas,Cons,Funcionarios, Pacientes,CONFIG, $location, $timeout, toastr){
	if(CONFIG.ROL_CURRENT_USER == 4) {
		$scope.ajustes = {
		  menu:{
			  titulo: 'Cita Médica Programada',
			  items:[{nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas programadas', enlace:'#/cita/list',estilo:'active'},
			  		 {nombre:'Historial de Citas Medico', enlace:'#/reservas/historial_reservas_med',estilo:''}]
		  },
		  pagina:{
			  titulo:'Cita Médica Programada'
		  }
		}
	} else{//Medico administrador
		$scope.ajustes = {
		  menu:{
			  titulo: 'Cita Médica Programada',
			  items:[{nombre:'Mis Citas', enlace:'#/reservas/listar_reservas_med',estilo:''},
			  		 {nombre:'Citas Médicas', enlace:'#/reservas/listar_reservas',estilo:''},
			  		 {nombre:'Citas Programadas', enlace:'#/cita/list',estilo:'active'},
					 {nombre:'Historial de Citas', enlace:'#/reservas/historial_reservas',estilo:''}]
		  },
		  pagina:{
			  titulo:'Cita Médica Programada'
		  }
		}
	}

	var FunG = localStorage.getItem("Funcionario");
	var FunG = JSON.parse(FunG);
	var es_id = FunG.es_id;
	var fun_id = FunG.fun_id;
	var fe_id = FunG.fe_id;

	$scope.citprog = [];
	$scope.citprog1 = [];

	//console.log("EL ES_ID ES..."+es_id);

	$scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

	var cit_id = $routeParams.cit_id;

	Citas.get({cit_id:cit_id}, function(data){

		$scope.citas=data.cita;
		if($scope.pac_id != $scope.citas.pac_id){
			$scope.es_familiar=true;
		}

		//$scope.citas.cit_hora_consulta = toTime($scope.citas.cit_hora_consulta);
		$scope.citas.cit_fecha_consulta = moment($scope.citas.cit_fecha_consulta,"YYYY-MM-DD").format("DD-MM-YYYY");
		//Para obtener el nombre del paciente
		Pacientes.get({pac_id:$scope.citas.pac_id}, function(data){
			$scope.paciente = data.paciente.persona;
		});
		//para obtener el nombre del servicio
		console.log("con_id "+$scope.citas.cit_con_id);
		Cons.get({con_id:$scope.citas.cit_con_id}, function(data){
			$scope.servicio=data.consultorio.servicio_consultorio;
			if($scope.servicio.length > 0){
				for(var i = 0; i < $scope.servicio.length; i++) {
					if($scope.servicio[i].sc_id == $scope.citas.cit_se_id){
						$scope.nomser = data.consultorio.servicio_consultorio[i].ser_nombre;
					}
				}
			}else{
				$scope.nomser = data.consultorio.servicio_consultorio[0].ser_nombre;
			}
		});

		//obtenemos los datos del funcionario
		Funcionarios.get({fe_id:$scope.citas.cit_fe_id}, function(data){
			$scope.funcionario = data.funcionario;
		});

	});

	function toTime(timeString){
	    var timeTokens = timeString.split(':');
	    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
	}
}])
