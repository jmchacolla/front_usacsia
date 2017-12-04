'use strict';
angular.module("adminApp")
.controller('AsignarHorarioCrearCtrl', ['$scope', '$http','$route', 'CONFIG','ConsultoriosEstablecimientos', 'ConfigTurnos','ConfiguracionHorario','HorariosConsultorio','MedicosEstablecimiento','toastr', 'HorariosAtiendeDiariamente', 'ServicioConsultorios',
	function ($scope, $http,$route,CONFIG,ConsultoriosEstablecimientos,ConfigTurnos,ConfiguracionHorario,HorariosConsultorio,MedicosEstablecimiento,toastr,HorariosAtiendeDiariamente,ServicioConsultorios){
	$scope.ajustes = {
	  menu:{
		titulo: 'Gestión de Asignación de Horarios',
		items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:''},
			   {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:'active'},
			   {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
			   {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:''}]
	  },
	  pagina:{
		titulo:'Asignar Horario a Funcionario'
	  }
	}
	var FunG = localStorage.getItem("Funcionario");
    var FunG = JSON.parse(FunG);
    var fun_id = FunG.fun_id;
    var es_id1 = FunG.es_id;

    //Obteniendo los consultorios de los establecimientos
    ConsultoriosEstablecimientos.get({es_id:es_id1}, function(data)
    {
      $scope.consultorios = data.consultorio;
    });

    var asi=this;//muestra los servicios del consultorio seleccionado
    asi.buscaCons1 = function(){
      $http.get(CONFIG.DOMINIO_SERVICIOS+'/consultorios/'+asi.con_id).success(function(respuesta){
        asi.cons = respuesta.consultorio.servicio_consultorio;
      });
    };

    //Obteniendo a los funcionarios de un establecimiento
    MedicosEstablecimiento.get({es_id:es_id1}, function(data)
    {
      $scope.funcionarios = data.medico;   
    });

    //Para la validación de la hora y fecha
	$scope.patternHora = /^[0-9:]*$/;
	$scope.patternFecha = /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/;

    //$scope.ch_tiempo_promedio_atencion=null;
    $scope.ch_fecha_inicio=null;
    $scope.ch_fecha_final=null;
    $scope.sc_id=null;//Es el id del consultorio  
    $scope.fe_id=null;

    $scope.asignar={
      //ch_tiempo_promedio_atencion:0,
      ch_fecha_inicio:null,
      ch_fecha_final:null,
      sc_id:null,      
      fe_id:null
    };
    
    $scope.ch_id=0;//id de la configuración de horario
    $scope.con_id=0;
    var con=0;

	$scope.myDate = null;
	$scope.res=false;
	
	$scope.compara = function(a,b){//Para validar que la fecha final de vigencia no sea menor a la fecha de inicio
      if(a==null || b==null)
      {   
        $scope.res=false;
      }
      else if(a!=null && b!=null)
      {   
        $scope.c = moment(a,"DD-MM-YYYY");
		$scope.d = moment(b,"DD-MM-YYYY");
		if($scope.d <= $scope.c){
		  $scope.res=true;
		}else{
		  $scope.res=false;
		}
      }
    }

	//Para crear una configuración horario(el primero)
    $scope.submit =function(ch_fecha_inicio,ch_fecha_final,sc_id,fe_id){
       	$scope.asignar={
            //ch_tiempo_promedio_atencion:"00:"+ch_tiempo_promedio_atencion,
            ch_fecha_inicio:ch_fecha_inicio,
            ch_fecha_final:ch_fecha_final,
            sc_id:sc_id,
            fe_id:fe_id
        };
        ConfiguracionHorario.save($scope.asignar).$promise.then(function(data)
        {
            if(data.status)
            {
               	angular.copy({}, $scope.asignar);
               	toastr.success('Creado correctamente');
                ServicioConsultorios.get({sc_id:data.configuracion_horario.sc_id},function(respuesta){
                	$scope.ch_id=data.configuracion_horario.ch_id;
	               	$scope.con_id=data.configuracion_horario.con_id;
	               	con=data.configuracion_horario.con_id;
	               	$scope.check1=false;
	               	$scope.apellido1="";
				    $scope.check2=false;
				    $scope.apellido2="";
				    $scope.check3=false;
				    $scope.apellido3="";
				    $scope.check4=false;
				    $scope.apellido4="";
				    $scope.check5=false;
				    $scope.apellido5="";
				    $scope.check6=false;
				    $scope.apellido6="";
				    $scope.check7=false;
				    $scope.apellido7="";
				    $scope.check8=false;
				    $scope.apellido8="";
				    $scope.check9=false;
				    $scope.apellido9="";
				    $scope.check10=false;
				    $scope.apellido10="";
				    $scope.check11=false;
				    $scope.apellido11="";
				    $scope.check12=false;
				    $scope.apellido12="";
				    $scope.check13=false;
				    $scope.apellido13="";
				    $scope.check14=false;
				    $scope.apellido14="";
				    $scope.check15=false;
				    $scope.apellido15="";
				    $scope.check16=false;
				    $scope.apellido16="";
				    $scope.check17=false;
				    $scope.apellido17="";
				    $scope.check18=false;
				    $scope.apellido18="";
				    $scope.check19=false;
				    $scope.apellido19="";
				    $scope.check20=false;
				    $scope.apellido20="";
				    $scope.check21=false;
					$scope.apellido21="";
				    
				    $scope.checkl1=0;
				    $scope.checkl2=0;
				    $scope.checkl3=0;
				    $scope.checkm1=0;
				    $scope.checkm2=0;
				    $scope.checkm3=0;
				    $scope.checkmi1=0; 
				    $scope.checkmi2=0;
				    $scope.checkmi3=0;
				    $scope.checkj1=0;
				    $scope.checkj2=0;
				    $scope.checkj3=0;
				    $scope.checkv1=0;
				    $scope.checkv2=0;
				    $scope.checkv3=0;
				    $scope.checks1=0;
				    $scope.checks2=0;
				    $scope.checks3=0;
				    $scope.checkd1=0;
				    $scope.checkd2=0;
				    $scope.checkd3=0;

	                HorariosConsultorio.get({con_id:respuesta.consultorio[0].con_id},function(data)
				    {

				    	$scope.turnitos_x_cons=data.configuracion_turno;
				    	for(var i=0;i<$scope.turnitos_x_cons.length;i++){
							if($scope.turnitos_x_cons[i].ct_dia=="1"){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check1=true;
				    				 $scope.apellido1=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkl1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check8=true;
				    				 $scope.apellido8=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkl2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check15=true;
				    				 $scope.apellido15=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkl3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==2){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check2=true;
				    				 $scope.apellido2=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkm1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check9=true;
				    				 $scope.apellido9=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkm2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check16=true;
				    				 $scope.apellido16=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkm3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==3){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check3=true;
				    				 $scope.apellido3=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkmi1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check10=true;
				    				 $scope.apellido10=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkmi2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check17=true;
				    				 $scope.apellido17=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkmi3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==4){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check4=true;
				    				 $scope.apellido4=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkj1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check11=true;
				    				 $scope.apellido11=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkj2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check18=true;
				    				 $scope.apellido18=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkj3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==5){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check5=true;
				    				 $scope.apellido5=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkv1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check12=true;
				    				 $scope.apellido12=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkv2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check19=true;
				    				 $scope.apellido19=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkv3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==6){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check6=true;
				    				 $scope.apellido6=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checks1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check13=true;
				    				 $scope.apellido13=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checks2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check20=true;
				    				 $scope.apellido20=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checks3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
							if($scope.turnitos_x_cons[i].ct_dia==7){
				    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
				    				 $scope.check7=true;
				    				 $scope.apellido7=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkd1=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
				    				 $scope.check14=true;
				    				 $scope.apellido14=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkd2=$scope.turnitos_x_cons[i].ct_id;
				    			}
				    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
				    				 $scope.check21=true;
				    				 $scope.apellido21=$scope.turnitos_x_cons[i].per_apellido_primero;
				    				 $scope.checkd3=$scope.turnitos_x_cons[i].ct_id;
				    			}
							}
				    	}
				    });
                })
            }
        });
    }

    $scope.btn_continuar=false;
    $scope.ver_horarios=function()
    {	
    	if($scope.btn_continuar==false)
    		$scope.btn_continuar=true;
    	else{
    		$scope.btn_continuar=false;
    	}
    };

    $scope.fin_turno_m=null;
    $scope.fin_turno_t=null;
    $scope.fin_turno_n=null;
	$scope.ini_turno_m=null;
	$scope.ini_turno_t=null;
	$scope.ini_turno_n=null;

	$scope.ct_ficha_total_m=null;
    $scope.ct_ficha_sesar_m=null;
    $scope.ct_ficha_total_t=null;
	$scope.ct_ficha_sesar_t=null;
	$scope.ct_ficha_total_n=null;
	$scope.ct_ficha_sesar_n=null;
	$scope.config_turno={
		ct_dia:'',
		ct_turno:'',
		ct_ini_turno:null,
		ct_fin_turno:null,
		ct_ficha_total:null,
		ct_ficha_sesar:null,
  		ch_id:null
  	};

  	var ct_id;
  	$scope.res_h_m=false;
  	$scope.res_hf_m=false;
  	/*$scope.horas_m = function(a,b){
  		if (a<="06:59") {
  			$scope.res_h_m=true;
  			console.log("true",$scope.res_h_m);
  		}
  		else{
  			if (b>="12:30") {
			$scope.res_hf_m=true;
			console.log("es mayor",$scope.res_hf_m);
	  		}
	  		else{
	  			$scope.res_hf_m=false;
	  		}
	  		$scope.res_h_m=false;
  		}
  	}*/
  	
  	$scope.calculaat=function(a,b,c){
  		/*console.log("hora1",a);
  		console.log("hora1",b);
  		console.log("total",c);
  		if(a!=null || b!=null || c!=null){
  			$scope.hori=a.getHours();
  			$scope.horf=b.getHours();
  			$scope.horaq=$scope.horf-$scope.hori;
  			console.log("horasq",$scope.horaq);
  			$scope.resp=($scope.horaq*60)/c;
  			console.log("promedio atencion en minutos",$scope.resp);
  		}*/
  	}
  	$scope.horasf_m = function(b){
  		if (b>"12:30:00") {
			$scope.res_hf_m=true;
  		}
  		else{
  			$scope.res_hf_m=false;
  		}
  	}

  	$scope.error_total_fichas_m = false;
  	$scope.error_total_fichas_t = false;
  	$scope.error_total_fichas_n = false;
  	$scope.submit2 = function(ini,fin,dia,turno,total,sesar,c_b){
  		// console.log("que es estoooooo",dia,turno);
  		$scope.error_total_fichas_m = false;
  		$scope.error_total_fichas_t = false;
  		$scope.error_total_fichas_n = false;

  		$scope.config_turno.ct_dia=dia;
  		$scope.config_turno.ct_turno=turno;
  		$scope.config_turno.ct_ini_turno=ini;
  		$scope.config_turno.ct_fin_turno=fin;
  		$scope.config_turno.ct_ficha_total=total;
  		$scope.config_turno.ct_ficha_sesar=sesar;
  		$scope.config_turno.ch_id= $scope.ch_id;
  		if (c_b==true){
  			$scope.aux = 0;
  			ConfigTurnos.save($scope.config_turno).$promise.then(function(data){//guarda los turnos
		      if(data.status) {
		      	//console.log(typeof data.configuracion_turno);
		      	if(data.configuracion_turno == "false") {
		      		toastr.error('El número total de fichas es incorrecto, vuelva a intentar', 'Error');
		      		if(turno == "MAÑANA"){
		      			$scope.error_total_fichas_m = true;
		      		}
		      		if(turno == "TARDE"){
		      			$scope.error_total_fichas_t = true;
		      		}
		      		if(turno == "NOCHE"){
		      			$scope.error_total_fichas_n = true;
		      		}
		      	} else {
			      	ct_id=data.configuracion_turno.ct_id;
			      	$scope.aux = ct_id;
			        angular.copy({}, $scope.config_turno);
			        toastr.success('Creado correctamente');
		      	}
		      }
		    });
  		}
  		else{
  			$scope.elim=function(a){
  				if (a!=0) {//en caso de que sea otra vez con check toda la configuración de horarios
  					ConfigTurnos.delete({ct_id:a}).$promise.then(function(data){
				      if(data.mensaje) {
				        toastr.success('Eliminado correctamente');
				      }
			    	}) 
  			    } else  if ($scope.aux != 0){
  					ConfigTurnos.delete({ct_id:$scope.aux}).$promise.then(function(data){
				      if(data.mensaje) {
				        toastr.success('Eliminado correctamente');
				     
				      }
			    	}) 	
  				}
	  		}
        }
	};

	$scope.genera = function(){	
	  	HorariosAtiendeDiariamente.get({ch_id:$scope.ch_id}, function(data)
		{
		  console.log("lo logro generar:",$scope.ch_id );
		});
  	};
}])

.controller('ReplicarHorarioCtrl', ['$scope', 'ConfiguracionHorario', 'ConfigTurnos', 'HorariosAtiendeDiariamente', '$routeParams', 'toastr', function ($scope,ConfiguracionHorario,ConfigTurnos,HorariosAtiendeDiariamente,$routeParams,toastr) {
	$scope.ajustes = {
	  menu:{
		titulo: 'Gestión de Asignación de Horarios',
		items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:''},
			   {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:''},
			   {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
			   {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:''}]
	  },
	  pagina:{
		titulo:'Replicar Asignación de Horario'
	  }
	}
	$scope.ch_id = $routeParams.ch_id;
	ConfiguracionHorario.get({ch_id:$scope.ch_id}, function(data)
	{
	  $scope.horario = data.horario;
	  $scope.horario.configuracion_horario.ch_fecha_inicio = moment($scope.horario.configuracion_horario.ch_fecha_inicio,"YYYY-MM-DD").format("DD-MM-YYYY");
	  $scope.horario.configuracion_horario.ch_fecha_final = moment($scope.horario.configuracion_horario.ch_fecha_final,"YYYY-MM-DD").format("DD-MM-YYYY");
	});

	$scope.btn_continuar = false;
	var con=0;
	$scope.replicar = function() {
		ConfiguracionHorario.update({ch_id:$scope.ch_id, ch_fecha_final:$scope.fecha_replica}).$promise.then(function(data){
	      if(data.status) {
	        toastr.success('Se replicó la asignación de horarios hasta la fecha seleccionada');
	        $scope.btn_continuar = true;
	        $scope.configuracion_replicada = data.configuracion_horario;
	        console.log(typeof data.configuracion_horario.ch_fecha_inicio.date);
	        $scope.configuracion_replicada.ch_fecha_inicio.date = moment($scope.configuracion_replicada.ch_fecha_inicio.date,"YYYY-MM-DD").format("DD-MM-YYYY");
	        ConfiguracionHorario.get({ch_id:data.configuracion_horario.ch_id},function(respuesta){
            	$scope.ch_id=respuesta.horario.configuracion_horario.ch_id;
               	$scope.con_id=respuesta.horario.servicio_consultorio[0].con_id;
               	con=respuesta.horario.servicio_consultorio[0].con_id;
               	$scope.check1=false;
               	$scope.apellido1="";
			    $scope.check2=false;
			    $scope.apellido2="";
			    $scope.check3=false;
			    $scope.apellido3="";
			    $scope.check4=false;
			    $scope.apellido4="";
			    $scope.check5=false;
			    $scope.apellido5="";
			    $scope.check6=false;
			    $scope.apellido6="";
			    $scope.check7=false;
			    $scope.apellido7="";
			    $scope.check8=false;
			    $scope.apellido8="";
			    $scope.check9=false;
			    $scope.apellido9="";
			    $scope.check10=false;
			    $scope.apellido10="";
			    $scope.check11=false;
			    $scope.apellido11="";
			    $scope.check12=false;
			    $scope.apellido12="";
			    $scope.check13=false;
			    $scope.apellido13="";
			    $scope.check14=false;
			    $scope.apellido14="";
			    $scope.check15=false;
			    $scope.apellido15="";
			    $scope.check16=false;
			    $scope.apellido16="";
			    $scope.check17=false;
			    $scope.apellido17="";
			    $scope.check18=false;
			    $scope.apellido18="";
			    $scope.check19=false;
			    $scope.apellido19="";
			    $scope.check20=false;
			    $scope.apellido20="";
			    $scope.check21=false;
				$scope.apellido21="";
			    
			    $scope.checkl1=0;
			    $scope.checkl2=0;
			    $scope.checkl3=0;
			    $scope.checkm1=0;
			    $scope.checkm2=0;
			    $scope.checkm3=0;
			    $scope.checkmi1=0; 
			    $scope.checkmi2=0;
			    $scope.checkmi3=0;
			    $scope.checkj1=0;
			    $scope.checkj2=0;
			    $scope.checkj3=0;
			    $scope.checkv1=0;
			    $scope.checkv2=0;
			    $scope.checkv3=0;
			    $scope.checks1=0;
			    $scope.checks2=0;
			    $scope.checks3=0;
			    $scope.checkd1=0;
			    $scope.checkd2=0;
			    $scope.checkd3=0;

                //HorariosConsultorio.get({con_id:respuesta.consultorio[0].con_id},function(data)
			    //{
			    	$scope.turnitos_x_cons=respuesta.horario.configuracion_turno;
			    	for(var i=0;i<$scope.turnitos_x_cons.length;i++){
						if($scope.turnitos_x_cons[i].ct_dia=="1"){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check1=true;
			    				 $scope.apellido1=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkl1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check8=true;
			    				 $scope.apellido8=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkl2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check15=true;
			    				 $scope.apellido15=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkl3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==2){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check2=true;
			    				 $scope.apellido2=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkm1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check9=true;
			    				 $scope.apellido9=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkm2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check16=true;
			    				 $scope.apellido16=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkm3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==3){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check3=true;
			    				 $scope.apellido3=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkmi1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check10=true;
			    				 $scope.apellido10=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkmi2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check17=true;
			    				 $scope.apellido17=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkmi3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==4){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check4=true;
			    				 $scope.apellido4=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkj1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check11=true;
			    				 $scope.apellido11=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkj2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check18=true;
			    				 $scope.apellido18=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkj3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==5){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check5=true;
			    				 $scope.apellido5=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkv1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check12=true;
			    				 $scope.apellido12=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkv2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check19=true;
			    				 $scope.apellido19=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkv3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==6){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check6=true;
			    				 $scope.apellido6=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checks1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check13=true;
			    				 $scope.apellido13=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checks2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check20=true;
			    				 $scope.apellido20=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checks3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
						if($scope.turnitos_x_cons[i].ct_dia==7){
			    			if($scope.turnitos_x_cons[i].ct_turno=='MAÑANA'){
			    				 $scope.check7=true;
			    				 $scope.apellido7=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkd1=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='TARDE'){
			    				 $scope.check14=true;
			    				 $scope.apellido14=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkd2=$scope.turnitos_x_cons[i].ct_id;
			    			}
			    			if($scope.turnitos_x_cons[i].ct_turno=='NOCHE'){
			    				 $scope.check21=true;
			    				 $scope.apellido21=$scope.turnitos_x_cons[i].per_apellido_primero;
			    				 $scope.checkd3=$scope.turnitos_x_cons[i].ct_id;
			    			}
						}
			    	}
			    //});
            })
	      } 
	    })
	}

	//para la creación de turnos
	$scope.fin_turno_m=null;
    $scope.fin_turno_t=null;
    $scope.fin_turno_n=null;
	$scope.ini_turno_m=null;
	$scope.ini_turno_t=null;
	$scope.ini_turno_n=null;

	$scope.ct_ficha_total_m=null;
    $scope.ct_ficha_sesar_m=null;
    $scope.ct_ficha_total_t=null;
	$scope.ct_ficha_sesar_t=null;
	$scope.ct_ficha_total_n=null;
	$scope.ct_ficha_sesar_n=null;
	$scope.config_turno={
		ct_dia:'',
		ct_turno:'',
		ct_ini_turno:null,
		ct_fin_turno:null,
		ct_ficha_total:null,
		ct_ficha_sesar:null,
  		ch_id:null
  	};

  	var ct_id;
  	$scope.res_h_m=false;
  	$scope.res_hf_m=false;
  	/*$scope.horas_m = function(a,b){
  		if (a<="06:59") {
  			$scope.res_h_m=true;
  			console.log("true",$scope.res_h_m);
  		}
  		else{
  			if (b>="12:30") {
			$scope.res_hf_m=true;
			console.log("es mayor",$scope.res_hf_m);
	  		}
	  		else{
	  			$scope.res_hf_m=false;
	  		}
	  		$scope.res_h_m=false;
  		}
  	}*/
  	
  	$scope.calculaat=function(a,b,c){
  		/*console.log("hora1",a);
  		console.log("hora1",b);
  		console.log("total",c);
  		if(a!=null || b!=null || c!=null){
  			$scope.hori=a.getHours();
  			$scope.horf=b.getHours();
  			$scope.horaq=$scope.horf-$scope.hori;
  			console.log("horasq",$scope.horaq);
  			$scope.resp=($scope.horaq*60)/c;
  			console.log("promedio atencion en minutos",$scope.resp);
  		}*/
  	}
  	$scope.horasf_m = function(b){
  		if (b>"12:30:00") {
			$scope.res_hf_m=true;
  		}
  		else{
  			$scope.res_hf_m=false;
  		}
  	}

  	$scope.submit2 = function(ini,fin,dia,turno,total,sesar,c_b){
  		// console.log("que es estoooooo",dia,turno);
  		$scope.config_turno.ct_dia=dia;
  		$scope.config_turno.ct_turno=turno;
  		$scope.config_turno.ct_ini_turno=ini;
  		$scope.config_turno.ct_fin_turno=fin;
  		$scope.config_turno.ct_ficha_total=total;
  		$scope.config_turno.ct_ficha_sesar=sesar;
  		$scope.config_turno.ch_id= $scope.ch_id;
  		if (c_b==true){
  			$scope.aux = 0;
  			ConfigTurnos.save($scope.config_turno).$promise.then(function(data){//guarda los turnos
		      if(data.status) {
		      	ct_id=data.configuracion_turno.ct_id;
		      	$scope.aux = ct_id;
		        angular.copy({}, $scope.config_turno);
		        //$scope.ajustes.pagina.success = "Horario añadido correctamente";
		      }
		    });
  		}
  		else{
  			$scope.elim=function(a){
  				if (a!=0) {//en caso de que sea otra vez con check toda la configuración de horarios
  					ConfigTurnos.delete({ct_id:a}).$promise.then(function(data){
				      if(data.mensaje) {
				        toastr.success('Eliminado correctamente');
				      }
			    	}) 
  			    } else  if ($scope.aux != 0){
  					ConfigTurnos.delete({ct_id:$scope.aux}).$promise.then(function(data){
				      if(data.mensaje) {
				        toastr.success('Eliminado correctamente');
				     
				      }
			    	}) 	
  				}
	  		}
        }
	};

	$scope.genera = function(){	
	  	HorariosAtiendeDiariamente.get({ch_id:$scope.ch_id}, function(data)
		{
		  console.log("lo logro generar:",$scope.ch_id );
		});
  	};
}])

.controller('VerConfigHorarioTurnoCtrl', ['$scope','$http','$routeParams','CONFIG', '$location', '$timeout', 'toastr','ConfiguracionHorario',
  function ($scope,$http,$routeParams,CONFIG, $location, $timeout, toastr,ConfiguracionHorario){
  	if(CONFIG.ROL_CURRENT_USER != 4){
  		$scope.ajustes = {
		  menu:{
			  titulo: 'Gestión de Asignación de Horarios',
			  items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:''},
				     {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:''},
				     {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
				     {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:''}]
		  },
		  pagina:{
			  titulo:'Ver Configuración de Horario del Funcionario'
		  }
		}
  	} else {
  		$scope.ajustes = {
		  menu:{
			  titulo: 'Gestión de Asignación de Horarios',
			  items:[{nombre:'Lista de asignaciones', enlace:'#/horarios/medico',estilo:''}]
		  },
		  pagina:{
			  titulo:'Ver Horario'
		  }
		}
  	}

  	var ch_id = $routeParams.ch_id;
  	ConfiguracionHorario.get({ch_id:ch_id},function(data)
    {
    	$scope.horario=data.horario;
    	$scope.horario.configuracion_horario.ch_fecha_inicio = moment($scope.horario.configuracion_horario.ch_fecha_inicio,"YYYY-MM-DD").format("DD-MM-YYYY");
    	$scope.horario.configuracion_horario.ch_fecha_final = moment($scope.horario.configuracion_horario.ch_fecha_final,"YYYY-MM-DD").format("DD-MM-YYYY");
    	$scope.turnos=data.horario.configuracion_turno;
    	
    	for(var i=0;i<$scope.turnos.length;i++){
            
            if($scope.turnos[i].ct_dia=="1"){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check1=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check8=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check15=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==2){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check2=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check9=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check16=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==3){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check3=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check10=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check17=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==4){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check4=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check11=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check18=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==5){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check5=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check12=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check19=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==6){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check6=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check13=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                    $scope.check20=$scope.turnos[i];
                }
            }
            if($scope.turnos[i].ct_dia==7){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check7=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check14=$scope.turnos[i];
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check21=$scope.turnos[i];
                }
            }
        }
        function sin_seg(a){
        	var aux=a.split(':');
        	return aux[0]+':'+aux[1];
        }
    });
}])

.controller('HorariosVigentesCtrl', ['$scope', '$timeout', 'toastr', '$route', 'AtiendeDiariamente', 'ConfiguracionHorario', function ($scope, $timeout,toastr,$route,AtiendeDiariamente,ConfiguracionHorario) {  	
	$scope.ajustes = {
	  menu:{
		  titulo: 'Gestión de Asignación de Horarios',
		  items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:'active'},
			     {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:''},
			     {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
			     {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:''}]
	  },
	  pagina:{
		  titulo:'Asignaciones Vigentes del Establecimiento'
	  }
	}
	$scope.sortType='ch_id';
	$scope.sortReverse=true;
	$scope.loading=true;

	var FunG=localStorage.getItem("Funcionario");
	var FunG=JSON.parse(FunG);
	$scope.es_id=FunG.es_id;
	ConfiguracionHorario.get({es_id:$scope.es_id},function(data)
  	{
  		$scope.horarios=data.configuracion_horario;
  		if(data.status && $scope.horarios.length > 0){
      		$scope.loading = false;
      		$scope.msg = data.status;
	    }
	    else{
	      $scope.loading = false;
	    }
  	},function () {
      $scope.loading = false;
      $scope.msg = false;
    });

	///Cancela todas las fichas de un establecimietno de una fecha
    $scope.cancelar_citas_todas = function(fecha) {
    	$scope.fecha_para_cancelar=moment(fecha,"DD-MM-YYYY").format("YYYY-MM-DD");
    	AtiendeDiariamente.save({fecha:$scope.fecha_para_cancelar,es_id:$scope.es_id}).$promise.then(function(data){
    	  if(data.atiende_diariamente == 'true') {
	        toastr.success('Se cancelaron las fichas para la fecha seleccionada');
	      } else if(data.atiende_diariamente == 'false'){
	      	toastr.error('No se pudo cancelar, la fecha no es válida');
	      } else {
	      	toastr.error('No existen fichas para la fecha seleccionada');
	      }
    	})
    }

	$scope.obt_asignacion = function(ch_id,fe_id,servicio,consultorio,apellido_paterno,apellido_materno,nombres,finicio,ffin){
    	$scope.ch_id = ch_id;
    	$scope.fe_id_seleccionado=fe_id;
    	$scope.servicio=servicio;
    	$scope.consultorio=consultorio;
    	$scope.nombre_funcionario=apellido_paterno + " " /*+ apellido_materno + " "*/ + nombres;
    	$scope.finicio=moment(finicio,"YYYY-MM-DD").format("DD-MM-YYYY");
    	$scope.ffin=moment(ffin,"YYYY-MM-DD").format("DD-MM-YYYY");
    }

	$scope.patternFecha = /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/;
   	
   	//Cancelar todas las fichas de una asignación de horario de una fecha
   	$scope.cancelar_citas = function(fe_id,fecha_asignacion){
   		$scope.cancela_asignacion=moment(fecha_asignacion,"DD-MM-YYYY").format("YYYY-MM-DD");
    	AtiendeDiariamente.update({fe_id:fe_id, fecha:$scope.cancela_asignacion}).$promise.then(function(data){
	      //console.log(data.atiende_diariamente);
	      //console.log(typeof data.atiende_diariamente);
	      if(data.atiende_diariamente == 'true') {
	        toastr.success('Se cancelaron las fichas para la fecha seleccionada');
	      } else if(data.atiende_diariamente == 'false'){
	      	toastr.error('No se pudo cancelar, la fecha no es válida');
	      } else {
	      	toastr.error('No existen fichas para la fecha seleccionada');
	      }
	    })
    }

    $scope.eliminar = function(ch_id){
    	console.log($scope.ch_id);
    	ConfiguracionHorario.delete({ch_id:$scope.ch_id}).$promise.then(function(data){
	      if(data.mensaje) {
	        toastr.success('CONFIGURACIÓN ELIMINADA CORRECTAMENTE');
	        $route.reload();
	      }
    	}) 	
    }
}])

//Lista las todas asignaciones realizadas en el establecimiento, es como un historial de asignaciones
.controller('ListarAsignacionesCtrl', ['$scope', '$timeout', 'toastr', '$route', 'HorariosEstablecimiento','AtiendeDiariamente','ConfiguracionHorario',
  function ($scope, $timeout, toastr,$route,HorariosEstablecimiento,AtiendeDiariamente,ConfiguracionHorario){
  	
	$scope.ajustes = {
	  menu:{
		  titulo: 'Gestión de Asignación de Horarios',
		  items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:''},
			     {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:''},
			     {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
			     {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:'active'}]
	  },
	  pagina:{
		  titulo:'Historial de Asignaciones de Horarios'
	  }
	}
	
	$scope.sortType='created_at';
	$scope.sortReverse=true;
	$scope.loading=true;

	var FunG=localStorage.getItem("Funcionario");
	var FunG=JSON.parse(FunG);
	var es_id=FunG.es_id;
	HorariosEstablecimiento.get({es_id:es_id},function(data)
  	{
  		$scope.horarios=data.configuracion_horario;
  		if(data.status && $scope.horarios.length > 0){
      		$scope.loading = false;
      		$scope.msg = data.status;
      		for (var i = $scope.horarios.length - 1; i >= 0; i--) {
      			$scope.horarios[i].ch_fecha_inicio = moment($scope.horarios[i].ch_fecha_inicio,"YYYY-MM-DD").format("DD-MM-YYYY");;
      			$scope.horarios[i].ch_fecha_final = moment($scope.horarios[i].ch_fecha_final,"YYYY-MM-DD").format("DD-MM-YYYY");;
      		};
	    }
	    else{
	      $scope.loading = false;
	    }
  	},function () {
      $scope.loading = false;
      $scope.msg = false;
    });

	$scope.obt_asignacion = function(ch_id,fe_id,servicio,consultorio,apellido_paterno,apellido_materno,nombres,finicio,ffin){
    	$scope.ch_id = ch_id;
    	$scope.fe_id_seleccionado=fe_id;
    	$scope.servicio=servicio;
    	$scope.consultorio=consultorio;
    	$scope.nombre_funcionario=apellido_paterno + " " /*+ apellido_materno + " "*/ + nombres;
    	$scope.finicio=finicio;
    	$scope.ffin=ffin;
    }

	$scope.eliminar = function(ch_id){
    	console.log($scope.ch_id);
    	ConfiguracionHorario.delete({ch_id:$scope.ch_id}).$promise.then(function(data){
	      if(data.mensaje) {
	        toastr.success('CONFIGURACIÓN ELIMINADA CORRECTAMENTE');
	        $route.reload();
	      }
    	}) 	
    }
}])

//Horarios del médico
.controller('HorariosMedicoCtrl', ['$scope', 'HorariosEstablecimiento', function ($scope,HorariosEstablecimiento) {
	$scope.ajustes = {
	  menu:{
		  titulo: 'Horarios',
		  items:[{nombre:'Lista de asignaciones', enlace:'#/horarios/medico',estilo:'active'}]
	  },
	  pagina:{
		  titulo:'Horarios'
	  }
	}

	var FunG=localStorage.getItem("Funcionario");
	var FunG=JSON.parse(FunG);
	var es_id=FunG.es_id;
	$scope.fe_id=FunG.fe_id;
	$scope.loading = true;
	HorariosEstablecimiento.get({es_id:es_id},function(data)
  	{
  		$scope.horarios=data.configuracion_horario;
  		if(data.status && $scope.horarios.length > 0){
      		$scope.loading = false;
      		$scope.msg = data.status;
	    }
	    else{
	      $scope.loading = false;
	    }
  	},function () {
      $scope.loading = false;
      $scope.msg = false;
    });
	
}])

///Horarios de consultorios para el administrador del establecimiento y el admisionista
.controller('VerConfigHorarioTurnoConsCtrl', ['$scope','$http','$routeParams','CONFIG', '$location', '$timeout', 'toastr','ConfiguracionHorario','HorariosConsultorio','ConsultoriosEstablecimientos',
  function ($scope,$http,$routeParams,CONFIG, $location, $timeout, toastr,ConfiguracionHorario,HorariosConsultorio,ConsultoriosEstablecimientos){
  	if(CONFIG.ROL_CURRENT_USER == 6){
		$scope.ajustes = {
		  menu:{
			  titulo: 'Horarios de atención',
			  items:[{nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''}]
		  },
		  pagina:{
			  titulo:'Horarios de Atención por Consultorio'
		  }
		}
	} else {
		$scope.ajustes = {
		  menu:{
			  titulo: 'Gestión de Asignación de Horarios',
			  items:[{nombre:'Asignaciones vigentes', enlace:'#/horarios_vigentes',estilo:''},
				     {nombre:'Asignar horario', enlace:'#/crear/asignar_horarios',estilo:''},
				     {nombre:'Horarios de consultorios', enlace:'#/horarios/consultorio',estilo:''},
				     {nombre:'Historial de asignaciones', enlace:'#/horarios',estilo:''}]
		  },
		  pagina:{
			  titulo:'Horarios de Atención por Consultorio'
		  }
		}
	}

	var FunG=localStorage.getItem("Funcionario");
	var FunG=JSON.parse(FunG);
	var es_id=FunG.es_id;

	$scope.loading=true;//PARA HACER UN LOADING EN EL TEMPLATE

	//obteniendo consultorios
	ConsultoriosEstablecimientos.get({es_id:es_id},function(data)
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

	$scope.show=false;
	$scope.showtab=true;
	$scope.update=function(){
		$scope.show=false;
		$scope.showtab=true;
	}

	$scope.get=function(con){
	$scope.show=true;
	$scope.showtab=false;
  	//variables
  	$scope.check1=[];
  	var cont1 = 0;
  	$scope.check2=[];
  	var cont2 = 0;
  	$scope.check3=[];
  	var cont3 = 0;
  	$scope.check4=[];
  	var cont4 = 0;
  	$scope.check5=[];
  	var cont5 = 0;
  	$scope.check6=[];
  	var cont6 = 0;
  	$scope.check7=[];
  	var cont7 = 0;
  	$scope.check8=[];
  	var cont8 = 0;
  	$scope.check9=[];
  	var cont9 = 0;
  	$scope.check10=[];
  	var cont10 = 0;
  	$scope.check11=[];
  	var cont11 = 0;
  	$scope.check12=[];
  	var cont12 = 0;
  	$scope.check13=[];
  	var cont13 = 0;
  	$scope.check14=[];
  	var cont14 = 0;
  	$scope.check15=[];
  	var cont15 = 0;
  	$scope.check16=[];
  	var cont16 = 0;
  	$scope.check17=[];
  	var cont17 = 0;
  	$scope.check18=[];
  	var cont18 = 0;
  	$scope.check19=[];
  	var cont19 = 0;
  	$scope.check20=[];
  	var cont20 = 0;
  	$scope.check21=[];
  	var cont21 = 0;

  	 //var sc_id = $routeParams.ch_id;
  	var sc_id = con.con_id;
  	$scope.con_nombre = con.con_nombre;

  	$scope.loading1 = true;//PARA HACER UN LOADING EN EL TEMPLATE

  	HorariosConsultorio.get({con_id:sc_id},function(data)
    {
    	//$scope.horario=data.horario;
    	//$scope.horario.configuracion_horario.ch_fecha_inicio = moment($scope.horario.configuracion_horario.ch_fecha_inicio,"YYYY-MM-DD").format("DD-MM-YYYY");
    	//$scope.horario.configuracion_horario.ch_fecha_final = moment($scope.horario.configuracion_horario.ch_fecha_final,"YYYY-MM-DD").format("DD-MM-YYYY");
    	$scope.turnos=data.configuracion_turno;

    	if(($scope.turnos.length >0 && data.status) ){
			$scope.loading1 = false;
  			$scope.msg1 = true;
		}
		$scope.loading1 = false;
    	
    	for(var i=0;i<$scope.turnos.length;i++){
            
            if($scope.turnos[i].ct_dia=="1"){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check1[cont1]=$scope.turnos[i];
                     cont1 = cont1 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check8[cont8]=$scope.turnos[i];
                     cont8 = cont8 + 1;
                     console.log("tamanio "+$scope.check8.length+$scope.check8[0]);
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check15[cont15]=$scope.turnos[i];
                     cont15 = cont15 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==2){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check2[cont2]=$scope.turnos[i];
                     cont2 = cont2 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check9[cont9]=$scope.turnos[i];
                     cont9 = cont9 + 1;
                     console.log("tamanio 9 "+$scope.check9.length+$scope.check9[0]);
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check16[cont16]=$scope.turnos[i];
                     cont16 = cont16 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==3){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check3[cont3]=$scope.turnos[i];
                     cont3 = cont3 + 1;

                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check10[cont10]=$scope.turnos[i];
                     cont10 = cont10 + 1;
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check17[cont17]=$scope.turnos[i];
                     cont17 = cont17 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==4){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
					$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check4[cont4]=$scope.turnos[i];
                     cont4 = cont4 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check11[cont11]=$scope.turnos[i];
                     cont11 = cont11 + 1;
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check18[cont18]=$scope.turnos[i];
                     cont18 = cont18 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==5){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check5[cont5]=$scope.turnos[i];
                     cont5 = cont5 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check12[cont12]=$scope.turnos[i];
                     cont12 = cont12 + 1;
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check19[cont19]=$scope.turnos[i];
                     cont19 = cont19 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==6){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check6[cont6]=$scope.turnos[i];
                     cont6 = cont6 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check13[cont13]=$scope.turnos[i];
                     cont13 = cont13 + 1;
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                    $scope.check20[cont20]=$scope.turnos[i];
                    cont20 = cont20 + 1;
                }
            }
            if($scope.turnos[i].ct_dia==7){
                if($scope.turnos[i].ct_turno=='MAÑANA'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check7[cont7]=$scope.turnos[i];
                     cont7 = cont7 + 1;
                }
                if($scope.turnos[i].ct_turno=='TARDE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check14[cont14]=$scope.turnos[i];
                     cont14 = cont14 + 1;
                }
                if($scope.turnos[i].ct_turno=='NOCHE'){
                	$scope.turnos[i].ct_ini_turno=sin_seg($scope.turnos[i].ct_ini_turno);
					$scope.turnos[i].ct_fin_turno=sin_seg($scope.turnos[i].ct_fin_turno);
                     $scope.check21[cont21]=$scope.turnos[i];
                     cont21 = cont21 + 1;
                }
            }
        }
        function sin_seg(a){
        	var aux=a.split(':');
        	return aux[0]+':'+aux[1];
        }
    },function () {
      $scope.loading1 = false;
      $scope.msg1 = false;
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
    });
	}//fin funcion get
}])