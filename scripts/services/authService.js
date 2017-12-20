'use strict';
angular.module('authService', [])
	.factory('sessionControl', function(){
		return {
			get: function(key){
				return sessionStorage.getItem(key);
			},
			set: function(key,val){
				return sessionStorage.setItem(key, val);
			},
			unset: function(key){
				return sessionStorage.removeItem(key);
			}
		};
	})

	.factory('authUser', function ($auth, sessionControl, toastr, $location, $rootScope, FuncionarioPer, CONFIG,/* Establecimientos,*/$route,$timeout,RolResource,Personas,Paises,/*PacientePersona,*/UsuariosEstab) {
		var cacheSession = function(usu_nick, rol_id, usu_identificador, id){
			//Asigna variables de sesion
			sessionControl.set('userIsLogin',true);
			sessionControl.set('usu_nick', usu_nick);
			sessionControl.set('rol_id', rol_id);
			sessionControl.set('per_id', usu_identificador);
			sessionControl.set('id', id);//Id del usuario
		};
		var unCacheSession = function (){
			//Elimina variables de sesion
			sessionControl.unset('userIsLogin');
			sessionControl.unset('usu_nick');
			sessionControl.unset('rol_id');
			sessionControl.unset('per_id');
			sessionControl.unset('id');
		};

		var login = function(loginForm){
			$auth.login(loginForm).then(
				function(response){
					console.log("DATA",response.data);
					console.log("CONFIG",response.config.data);
					if(response.data.error && response.config.data.usu_nick !='' && response.config.data.password != undefined) {
						toastr.error('El nombre de usuario y la contraseña no coinciden', 'Error');
						console.log(response);
					}
					cacheSession(response.data.user.usu_nick, response.data.user.rol_id, /*response.data.user.per_id,*/ response.data.user.id);
					toastr.success('Sesion iniciada con exito.', 'Mensaje');
					console.log(response,"RESPONSE");
					//Guardando los datos de la sesión en una variable para localStorage
					var datosSesion = {//datos de la sesion
						usu_nick: response.data.user.usu_nick,
						per_id: response.data.user.usu_identificador,
						rol_id: response.data.user.rol_id,
						id: response.data.user.id,
					};
					/*Paises.get(function(data){
						var paisess=data.pais;
						console.log(paisess);
					});*/
					//guardando en localStorage los datos de la sesion
					var Sesion = JSON.stringify(datosSesion);
					console.log("datos sesion", Sesion);
					localStorage.setItem("Sesion", Sesion);
					console.log("GUARDO DATOS DE LA SESION");

					//para almacenar en localStorage los datos de la persona logueada
					//convirtiendo text a int
					var per_id= parseInt(response.data.user.usu_identificador, 10);
					console.log("CONVIRTIENDO TEXT EN INT",per_id);
					Personas.get({per_id:per_id}, function(data){
						var persona = data.persona;
						//console.log("GUARDANDO DATOS DE PERSONA EN LOCALSTORAGE",persona)
						persona = JSON.stringify(persona);
						localStorage.setItem("DatosPer", persona);
					});




//para el rol
					CONFIG.ROL_CURRENT_USER = parseInt(response.data.user.rol_id, 10);//este es el usuario que esta logueado
					console.log("ROL",CONFIG.ROL_CURRENT_USER );
					//DEBERIA GUARDARSE EL ROL NOMBRE AQUI, MIENTRAS ESTOY PONIENDO USU_NICK
  					CONFIG.ROL_CURRENT_USER_NAME = response.data.rol.rol_nombre;
  					console.log("rol_nombre",CONFIG.ROL_CURRENT_USER_NAME );


					localStorage.setItem("ROL_CURRENT_USER", parseInt(response.data.user.rol_id, 10));//para obtener el rol_id
					//localStorage.setItem("ROL_CURRENT_USER_NAME", response.data.user.rol_nombre);//para obtener el rol_nombre
					//mientras no corre el servicio de roles
					localStorage.setItem("ROL_CURRENT_USER_NAME", response.data.rol.rol_nombre);//para
					//para saber que persona es
					if(response.data.user.rol_id !=1)
					{
						FuncionarioPer.get({per_id:response.data.user.usu_identificador}, function(data)
						{
							var funcionario = data.funcionario;
							console.log("GUARDANDO DATOS DE FUNCIONARIO EN LOCALSTORAGE",funcionario)
							funcionario = JSON.stringify(funcionario);
							localStorage.setItem("Funcionario", funcionario);
					  		//Guarda los datos del funcionario en LocalStorage, se guarda el establecimiento del rol que seleccionó
						  		/*var datosFun = {
							   		fun_id: funcionario.fun_id,//data.funcionario.funcionario.fun_id,
							  	}
							  	var datosFunG = JSON.stringify(datosFun);
							  	localStorage.setItem("Funcionario", datosFunG);*/
						});
					}
					$timeout(function() {
						              $location.path('/');
						          	},1500);
										
					//PARA ROLES
		/*			if (datosSesion.roles.length>1){//Cuando el usuario tiene más roles
						$timeout(function() {
			              	$location.path('/rol/usuario');
			          	},1500);
					} 
					else {//Cuando el usuario tiene solo un rol
						CONFIG.ROL_CURRENT_USER = parseInt(response.data.roles[0].rol_id, 10);//este es el usuario que esta logueado
  						CONFIG.ROL_CURRENT_USER_NAME = response.data.roles[0].rol_nombre;
						localStorage.setItem("ROL_CURRENT_USER", parseInt(response.data.roles[0].rol_id, 10));//para obtener el rol_id
						localStorage.setItem("ROL_CURRENT_USER_NAME", response.data.roles[0].rol_nombre);//para obtener el rol_id
*/
						//Para almacenar los datos de un funcionario de un establecimiento en localStorage
						/*if((response.data.roles[0].rol_id !=1) && (response.data.roles[0].rol_id !=7))
						{	
							var es_id=0;
							var nombres_establecimientos = [];
							var cont_act = 0;
							FuncionarioPer.get({per_id:response.data.user.per_id}, function(data)
						  	{
						  		var funcionario = data.funcionario;
						  		for (var i = 0; i < data.funcionario.funcionario_establecimiento.length; i++) {
						  			if (data.funcionario.funcionario_establecimiento[i].fe_estado=='ACTIVO') {
						  				nombres_establecimientos[cont_act] = {
								          es_id: funcionario.funcionario_establecimiento[i].es_id,
								          fe_id: funcionario.funcionario_establecimiento[i].fe_id,
								          fun_id: funcionario.funcionario.fun_id,
								          es_nombre: funcionario.funcionario_establecimiento[i].es_nombre,
								        }
								        cont_act++;
						  			}
							    };
						  		if(cont_act>1) {//Si está activo en más de un establecimiento pero solo tiene un rol
						  			localStorage.setItem("DOS_ESTAB", 2);
						  			$timeout(function() {
						              	$location.path('/rol/usuario');
						          	},0);
						  		}
						  		else {//Cuando tiene un rol y está activo un establecimiento
						  			es_id = nombres_establecimientos[0].es_id;
							  		//Guarda los datos del establecimiento en localStorage
							  		Establecimientos.get({es_id:es_id}, function(data){
							  			var datosEst = JSON.stringify(data.establecimiento);
							  			localStorage.setItem("DatosEstablecimiento", datosEst);
									});
							  		//Guarda los datos del funcionario en LocalStorage, se guarda el establecimiento del rol que seleccionó
							  		var datosFun = {
								  		es_id: es_id,
								  		fun_id: nombres_establecimientos[0].fun_id,//data.funcionario.funcionario.fun_id,
								  		fe_id: nombres_establecimientos[0].fe_id,//data.funcionario.funcionario_establecimiento[0].fe_id,
								  	}
								  	var datosFunG = JSON.stringify(datosFun);
								  	localStorage.setItem("Funcionario", datosFunG);
								  	$timeout(function() {
						              $location.path('/');
						          	},1500);
						  		}
						  		
							});
						}*/
						//Para almacenar el pac_id del paciente
					/*	if((response.data.roles[0].rol_id == 7)) {
							var pac_id=0;
							PacientePersona.get({per_id:response.data.user.per_id}, function(data)
						  	{
						  		pac_id = data.paciente[0].pac_id;
							  	localStorage.setItem("PacId", pac_id);
							});
							$timeout(function() {
				              $location.path('/');
				          	},1500);
						}

						if(response.data.roles[0].rol_id == 1) {
							$timeout(function() {
				              $location.path('/');
				          	},1500);
						}*/
				/*	}*/
					//console.log(typeof response.data.user.rol_id);
				},
				function(){
					unCacheSession();
					toastr.error('Error inesperado, por favor vuelva a intentar');
				}
			);
		};
		
		return {
			loginApi: function(loginForm){
				login(loginForm);
			},
			logout: function(){
				//localStorage.removeItem("nombreEst");
				localStorage.removeItem("Sesion");//removeItem
				localStorage.removeItem("DatosPer");
				localStorage.removeItem("ROL_CURRENT_USER");
				localStorage.removeItem("ROL_CURRENT_USER_NAME");
				//localStorage.removeItem("DatosEstablecimiento");
				localStorage.removeItem("Funcionario");
			//	localStorage.removeItem("PacId");
				localStorage.removeItem("aux_es_id");
				localStorage.removeItem("DOS_ESTAB");
				
				$auth.logout();
				unCacheSession();
				$timeout(function() {
	              $location.path('/inicio');
	            },0);
				toastr.success('Sesion cerrada con exito.', 'Mensaje');
			},
			isLoggedIn: function(){
				return sessionControl.get('userIsLogin') !== null;
			}
		}
	});