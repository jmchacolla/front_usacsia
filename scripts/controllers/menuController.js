'use strict';

angular.module('adminApp')
	.controller('MenuCtrl', ['$auth','authUser', '$location', '$scope', 'sessionControl', 'ROLES', 'CONFIG', '$routeParams', 'ReferenciasEstablecimientoDestino','ContrareferenciasEstablecimientoOrigen', 'ReservasDia', 'CitasMedicos',
		function ($auth,authUser, $location, $scope, sessionControl, ROLES, CONFIG, $routeParams,ReferenciasEstablecimientoDestino,ContrareferenciasEstablecimientoOrigen,ReservasDia,CitasMedicos){
		var vm = this;
		vm.isLogin = authUser.isLoggedIn();

		$scope.$watch(function(){
			return authUser.isLoggedIn();
		}, function(newVal){
			if (typeof newVal !== 'undefined') {
				vm.isLogin = authUser.isLoggedIn();
			}			
		});

		vm.user = {
			usu_nick: sessionControl.get('usu_nick'),
			rol_id: sessionControl.get('rol_id'),
			roles: sessionControl.get('roles'),
			per_id: sessionControl.get('per_id'),
		}
				
		///$watch es para mostrar el dato
		$scope.$watch(function(){
			return sessionControl.get('usu_nick');
		}, function(newVal){
			if (typeof newVal !== 'undefined') {
				vm.user.usu_nick = sessionControl.get('usu_nick');
			}			
		});

		$scope.$watch(function(){
			return sessionControl.get('rol_id');
		}, function(newVal){
			if (typeof newVal !== 'undefined') {
				vm.user.rol_id = sessionControl.get('rol_id');
			}			
		});

		vm.ROLES = ROLES;
		vm.CONFIG = CONFIG;
		//console.log(typeof CONFIG.ROL_CURRENT_USER);
		//Almacena los datos de persona en caso de que sea una paciente
		var DatosPer = localStorage.getItem("DatosPer");
		var DatosPer = JSON.parse(DatosPer);
		vm.persona = DatosPer;

		vm.logout = function(){
			authUser.logout();
		};

		vm.isActive = function (viewLocation){
			return viewLocation == $location.path();
		};

		//Para cambiar de rol si, se tiene más de uno
		vm.cambia_rol=false;
		var SesionG = localStorage.getItem("Sesion");
  		var SesionG = JSON.parse(SesionG);
  		console.log(typeof localStorage.getItem("DOS_ESTAB"));
		/*if(SesionG.roles.length>1 || localStorage.getItem("DOS_ESTAB")=="2"){
			vm.cambia_rol=true;
		}*/
		
		var FunG = localStorage.getItem("Funcionario");
		var FunG = JSON.parse(FunG);
		
		/*$scope.muestranotireferencia = 0;// para que solo muestre las referencias recibidas a establecimientos que reciben referencias
		if (CONFIG.ROL_CURRENT_USER==4 || CONFIG.ROL_CURRENT_USER == 6 || CONFIG.ROL_CURRENT_USER == 9 || CONFIG.ROL_CURRENT_USER == 10) {
			if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
			{
				$scope.muestranotireferencia = 1;
				ReferenciasEstablecimientoDestino.get({es_id:FunG.es_id},function(data, headers){
					//console.log("cabeceras de la respuesta");
					//console.log(headers);
					$scope.valor1=0;
					for(var i=0; i < data.referencia.length; i++){
						if(data.referencia[i].br_estado_referencia==false){
							$scope.valor1=$scope.valor1+1;
						}
					}
				});
			}
				
			if (CONFIG.ROL_CURRENT_USER==6 || CONFIG.ROL_CURRENT_USER==10){
				ContrareferenciasEstablecimientoOrigen.get({es_id:FunG.es_id},function(data){
					$scope.valor2=0;
					for(var i=0; i < data.contrareferencia.length; i++){
						if(data.contrareferencia[i].bc_estado_contrareferencia==false){
							$scope.valor2=$scope.valor2+1;
						}
					}
				});
			}

			//HACIENDO UN INTERVALO PARA QUE DETECTE CAMBIOS EN LAS REFERENCIAS
			var timer = null;
			timer = setInterval(function () {
				// El método $apply sirve para notificar de cambios realizados asíncronamente a interacciones con la UI.
				if(authUser.isLoggedIn() && (CONFIG.ROL_CURRENT_USER==4 || CONFIG.ROL_CURRENT_USER == 6 || CONFIG.ROL_CURRENT_USER == 9 || CONFIG.ROL_CURRENT_USER == 10)){
					if ((localStorage.getItem("nivelEst")!='PRIMER NIVEL') || ((parseInt(localStorage.getItem("tipoEst"), 10)==5) && (localStorage.getItem("nivelEst")=='PRIMER NIVEL')))
					{
						ReferenciasEstablecimientoDestino.get({es_id:FunG.es_id},function(data){
							$scope.valor1=0;
							for(var i=0; i < data.referencia.length; i++){
								if(data.referencia[i].br_estado_referencia==false){
									$scope.valor1=$scope.valor1+1;
								}
							}
							localStorage.setItem("valor1", $scope.valor1);
						});
					}
					if (CONFIG.ROL_CURRENT_USER==6 || CONFIG.ROL_CURRENT_USER==10){
						ContrareferenciasEstablecimientoOrigen.get({es_id:FunG.es_id},function(data){
							$scope.valor2=0;
							for(var i=0; i < data.contrareferencia.length; i++){
								if(data.contrareferencia[i].bc_estado_contrareferencia==false){
									$scope.valor2=$scope.valor2+1;
								}
							}
							localStorage.setItem("valor2", $scope.valor2);
						});	
					}
					$scope.$apply();
				} else{
					clearInterval(timer);
					timer = null;
					$scope.muestranotireferencia = 0;
					$scope.$apply();
					CONFIG.ROL_CURRENT_USER == 0;
				}
			}, 60000);
		}*/

		//PARA LAS NOTIFICACIONES DE RESERVAS/////////////////////////////////////////////////////////
		//NOTIFICACIONES PARA EL MEDICO Y ADMINISTRADOR MEDICO
		if((CONFIG.ROL_CURRENT_USER == 4 || CONFIG.ROL_CURRENT_USER == 9) && FunG) {
			$scope.CurrentDate = new Date();
	   		$scope.fecha_hoy=moment($scope.CurrentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
			CitasMedicos.get({fe_id:FunG.fe_id,fecha:$scope.fecha_hoy},function(data){
				$scope.nro=0;
				for(var i=0; i < data.cita.length; i++){
					if((data.cita[i].cit_estado_asistencia==false || data.cita[i].cit_estado_asistencia==null) && data.cita[i].cit_estado_pago == true && data.cita[i].cit_fecha_consulta == $scope.fecha_hoy){
						$scope.nro=$scope.nro+1;
					}
				}
			});
			var timer = null;
			timer =	setInterval(function () {
				var FunG = localStorage.getItem("Funcionario");
				var FunG = JSON.parse(FunG);
				if(authUser.isLoggedIn()&&FunG!=null){
					console.log(FunG.fe_id);
					CitasMedicos.get({fe_id:FunG.fe_id,fecha:$scope.fecha_hoy},function(data){
						$scope.nro=0;
						for(var i=0; i < data.cita.length; i++){
							if((data.cita[i].cit_estado_asistencia==false || data.cita[i].cit_estado_asistencia==null) && data.cita[i].cit_estado_pago == true && data.cita[i].cit_fecha_consulta == $scope.fecha_hoy){
								$scope.nro=$scope.nro+1;
							}
						}
					});
					$scope.$apply();
				} else {
					clearInterval(timer);
					timer = null;
					$scope.$apply();
					CONFIG.ROL_CURRENT_USER == 0;
					FunG = null;
				}
			}, 120000);
		}
		//NOTIFICACIONES PARA EL ADMISIONISTA O ADMISIONISTA-ESTADISTICO-ENFERMERO
		if((CONFIG.ROL_CURRENT_USER == 6 || CONFIG.ROL_CURRENT_USER == 10) && FunG)
		{
			$scope.nro=0;
			ReservasDia.get({es_id:FunG.es_id},function(data){
				for(var i=0; i < data.cita.length; i++){
					if(data.cita[i].cit_estado_pago==false || data.cita[i].cit_estado_pago==null){
						$scope.nro=$scope.nro+1;
					}
				}
			});
			var timer = null;
			timer =	setInterval(function () {
				var FunG = localStorage.getItem("Funcionario");
				var FunG = JSON.parse(FunG);
				if(authUser.isLoggedIn()&&FunG!=null){
					ReservasDia.get({es_id:FunG.es_id},function(data){
						$scope.nro=0;
						for(var i=0; i < data.cita.length; i++){
							if(data.cita[i].cit_estado_pago==false || data.cita[i].cit_estado_pago==null){
								$scope.nro=$scope.nro+1;
							}
						}
					});
					$scope.$apply();
				}
				else {
					clearInterval(timer);
					timer = null;
					$scope.$apply();
					CONFIG.ROL_CURRENT_USER == 0;
					FunG = null;
				}
			}, 120000);
		}
	}])

	.controller('MenuLateralCtrl', ['$scope', 'CONFIG', function ($scope, CONFIG) {
		var SesionG = localStorage.getItem("Sesion");
  		var SesionG = JSON.parse(SesionG);
  		
  		var vm = this;
  		//obteniendo datos del rol
		vm.roles = CONFIG.ROL_CURRENT_USER_NAME;//localStorage.getItem("ROL_CURRENT_USER_NAME");
		vm.rol = CONFIG.ROL_CURRENT_USER;//SesionG.rol_id;
		//obteniendo datos de la persona
		var DatosPer = localStorage.getItem("DatosPer");
		var DatosPer = JSON.parse(DatosPer);
		vm.persona = DatosPer;
		
		vm.usu_nick=SesionG.usu_nick;
		//vm.nombreEst = localStorage.getItem("nombreEst");
		if(vm.rol != 1 && vm.rol != 7 && (localStorage.getItem("DatosEstablecimiento")!=null)) {
			var Establecimiento = localStorage.getItem("DatosEstablecimiento");
	  		var Establecimiento = JSON.parse(Establecimiento);
	  		vm.nombreEst = Establecimiento.establecimientos.es_nombre;
		}
		
	}])
;