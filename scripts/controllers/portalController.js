'use strict';
angular.module("adminApp")

/**
****************************************************************************	
CONTROLADORES PARA LAS PAGINAS PUBLICAS
****************************************************************************	
*/
.controller('BusquedaEstablecimientosCtrl', ['$scope', 'Establecimientos', 'toastr', function ($scope, Establecimientos, toastr){
	$scope.ajustes = {
        pagina:{
	      	titulo:'Servicio de Información de Establecimientos de Salud'
	    }
	}
	$scope.sortType = 'es_nombre'; // set the default sort type
  	$scope.sortReverse  = false;  // set the default sort order
	$scope.loading=true;
	Establecimientos.get(function(data){ 
		$scope.establecimientos = data.establecimiento;
		if(data.status){
			$scope.loading = false;
      		$scope.msg = data.status;
		}
		$scope.loading = false;
	},function () {
      toastr.error("ERROR INESPERADO, POR FAVOR ACTUALICE LA PÁGINA");
      $scope.loading = false;
      $scope.msg = false;
    });
}])


.controller('CercanosCtrl', ['$scope', 'Establecimientos_cercanos', function ($scope, Establecimientos_cercanos){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	//$scope.latitud_usuario = -16.495696170501414;
	//$scope.longitud_usuario = -68.13348331089787;	
	
	$scope.ajustes = {
	  menu:{
		  titulo: 'Gestion de Vacunas y Control de Crecimiento',
		  items:[{nombre:'Lista de Pacientes', enlace:'#/vacunas_crecimiento',estilo:'active'}]
	  },
	  pagina:{
		  titulo:'Encuentra Establecimientos de Salud Cercanos a tu Ubicación',
	  }
	}
	$scope.initMap = function(){
		var cercanos;
		var infowindow = new google.maps.InfoWindow();
		var marker, i;
		navigator.geolocation.getCurrentPosition(function(pos) {
		$scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
//              console.log(JSON.stringify($scope.position));
				
			/*  $scope.latitud_usuario = pos.coords.latitude;
			  $scope.longitud_usuario = pos.coords.longitude;
			  
			  Establecimientos_cercanos.get({latitud:pos.coords.latitude, longitud: pos.coords.longitude, cantidad:7},function(data){
				$scope.establecimientos = data.establecimientos;
				cercanos = JSON.parse(JSON.stringify($scope.establecimientos));
				var image = './images/marcador_mapa.png';
				for (i in $scope.establecimientos) {  
					marker = new google.maps.Marker({
					position: new google.maps.LatLng($scope.establecimientos[i].es_latitud, $scope.establecimientos[i].es_longitud),
					map: map,
					icon: image
					});
					google.maps.event.addListener(marker, 'click', (function(marker,i) {
					  return function() {
						infowindow.setContent('<h4 class="text-primary">'+$scope.establecimientos[i].es_nombre+'<br><small><span class="text-primary">Municipio: </span>'+$scope.establecimientos[i].mun_nombre+'<br><span class="text-primary">Dirección: </span>'+$scope.establecimientos[i].es_avenida_calle+' '+$scope.establecimientos[i].es_numero+'<br><span class="text-primary">Horario de atención: </span> De '+$scope.establecimientos[i].es_inicio_atencion.substring(0,5)+' a '+$scope.establecimientos[i].es_final_atencion.substring(0,5)+'<br><br><a class="btn btn-block btn-primary" href="https://190.181.60.19/app_front/#/servicios_informacion/establecimientos_salud/'+$scope.establecimientos[i].es_id+'">Ver mas información</small></a></h4>');
						infowindow.open(map, marker);
					  }
					})(marker,i));
				}			  
			  });
*/
			  // Creamos un objeto mapa y lo situamos en coordenadas actuales
			  var map = new google.maps.Map(document.getElementById('mapa'),{
				center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
				scrollwheel: false,
				zoom: 16
			  });
			  
			  //marcador solito
			  var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
			    map: map,
				animation: google.maps.Animation.BOUNCE,
				title: ''
			  });		
			  console.log("MARKER",marker);	
			  var markerLatLng = marker.getPosition();
			  console.log("POSITIONmmm",markerLatLng.lat());
			  console.log("POSITIONmmm",markerLatLng.lng());	
			  //console.log("POSITIONmmmmm",marker.position.lat.[[Scopes]].0.a);	
			  infowindow.setContent('<h4 class="text-primary">Tú estas aquí <br><small>Esta es tu ubicación aproximada</small></h4>');
			  infowindow.open(map, marker);
			  google.maps.event.addListener(marker, 'click', (function(marker) {
					  return function() {
						infowindow.setContent('<h4 class="text-primary">Tú estas aquí <br><small>Esta es tu ubicación aproximada</small></h4>');
						infowindow.open(map, marker);
					  }
			  })(marker));
		 })
	}
}])
.controller('MostrarEstablecimientosCtrl', ['$scope', 'Establecimientos', '$routeParams', function ($scope, Establecimientos, $routeParams){
	//$scope.ajustes es un objeto de configuracion de las paginas y menus
	$scope.ajustes = {
	  menu:{},
	  pagina:{
		  titulo:'Establecimientos de Salud en el Departamento de La Paz'
	  }
	}	
	var es_id = $routeParams.es_id;//obtiene el id del paciente
	Establecimientos.get({es_id:es_id}, function(data){
		$scope.establecimiento = data.establecimiento;
		$scope.establecimiento.establecimientos.es_fecha_creacion = moment($scope.establecimiento.establecimientos.es_fecha_creacion,"YYYY-MM-DD").format("DD-MM-YYYY");
		$scope.establecimiento.establecimientos.es_fecha_inicio_actividad = moment($scope.establecimiento.establecimientos.es_fecha_inicio_actividad,"YYYY-MM-DD").format("DD-MM-YYYY");
		$scope.establecimiento.establecimientos.es_inicio_atencion = toTime($scope.establecimiento.establecimientos.es_inicio_atencion);
		$scope.establecimiento.establecimientos.es_final_atencion = toTime($scope.establecimiento.establecimientos.es_final_atencion);
	});

	function toTime(timeString){
	    var timeTokens = timeString.split(':');
	    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
	}
}])


