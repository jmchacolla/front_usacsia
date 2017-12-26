'use strict';
angular.module("adminApp")
//30-11-2017   ***********************    WENDY   *****************************************
//*************************P E R S O N A S***************************
//crear persona
.factory('PersonasC', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/persona", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//ver,listar, editar
.factory('Personas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/persona/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])
//**************************************P A I S********************************

.factory('Paises', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pais", {}, {
    update: {method: "PUT", params: {}}
  })
}])

//============================Z O N A S==========================================//
.factory('Zonas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/zona/:mun_id", {mun_id:"@_mun_id"}, {
    update: {method: "PUT", params: {zon_id: "@zon_id"}}
  })
}])


// ==================== M U N I C I P I O S =========================================================================
.factory('Municipios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/municipio", {}, {
    update: {method: "PUT", params: {}}
  })
}])
// ==================== F U N C I O N A R I O S ==========================================
//Nuevo (para crear un funcionario cuando la persona ya esta registrada y las demas peticiones)
.factory('Funcionarios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionario/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id: "@fun_id"}}
  })
}])
//Nuevo(Para crear funcionario con persona)
.factory('FuncionarioPersona', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionario_persona/", {}, {
    update: {method: "PUT", params: {}}
  })
}])
.factory('Func', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcio/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id: "@fun_id"}}
  })
}])
// ==================== C O N S U L T O R I O S =====================================================
//listar, ver, editar consultorios
.factory('Consultorios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/consultorio/:amb_id", {amb_id:"@_amb_id"}, {
    update: {method: "PUT", params: {amb_id: "@amb_id"}}
  })
}])
//crear consultorio
.factory('Cons', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ambiente_consultorio", {}, {
    update: {method: "PUT", params: {}}
  })
}])
// ==================== L A B O R A T O R I O S ========================================================
//listar, ver, editar LABORATORIOS
.factory('Laboratorios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/laboratorio/:amb_id", {amb_id:"@_amb_id"}, {
    update: {method: "PUT", params: {amb_id: "@amb_id"}}
  })
}])
//crear LABORATORIO
.factory('Labs', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ambiente_laboratorio", {}, {
    update: {method: "PUT", params: {}}
  })
}])
// ==================== E S T A B L E C I M I E N T O S ============================================================
//Lista los establecimientos usacsia
.factory('Establecimientos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usacsia/:usa_id", {usa_id:"@_usa_id"}, {
    update: {method: "PUT", params: {usa_id: "@usa_id"}}
  })
}])

//Lista los establecimientos solicitantes
.factory('EstabSols', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimiento_solicitante/:ess_id", {ess_id:"@_ess_id"}, {
    update: {method: "PUT", params: {ess_id: "@ess_id"}}
  })
}])
//listar personas que concluyeron el tramite
.factory('Final', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/lista_final", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//ver completo
.factory('VerPT', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ver_c/:pt_id", {pt_id:"@_pt_id"}, {
    update: {method: "PUT", params: {pt_id:"@_pt_id"}}
  })
}])
//==================== U S U A R I O S =================================================================
//LISTAR, CREAR USUARIO CONTROL
.factory('Usuarios', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios/:usu_id", {usu_id:"@_usu_id"}, {
    update: {method: "PUT", params: {usu_id: "@usu_id"}}
  })
}])
//lista usuarios funcionarios --laboratorista 8976543 --medico 8976854 --caja 8765784 --admin 83062745
.factory('UsuariosF', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios_fun/:usu_id", {usu_id:"@_usu_id"}, {
    update: {method: "PUT", params: {usu_id: "@usu_id"}}
  })
}])
//*****************************TABLAS ADMINISTRATIVAS************************
//--------------------------DEPARTAMENTO----------------------------
.factory('Departamento', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/departamento/:dep_id", {dep_id:"@_dep_id"}, {
    update: {method: "PUT", params: {dep_id: "@dep_id"}}
  })
}])

//jhon----seguimiento
.factory('Seguimiento', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/seguimiento", {}, {
    update:{method: 'PUT', params: {}}
  })
}])
//--------------------------CREAR CARNET SANITARIO----------------------------
.factory('CarnetSanitario', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/carnet/:cas_id", {cas_id:"@_cas_id"}, {
    update: {method: "PUT", params: {cas_id: "@cas_id"}}
  })
}])

//-------------------------CAMBIAR ESTADO DE TRAMITE----------------------------
.factory('TramiteEstado', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tramite_estado/:pt_id", {pt_id:"@_pt_id"}, {
    update: {method: "PUT", params: {pt_id: "@pt_id"}}
  })
}])

//-------------------------CREAR, VER, LISTAR FIRMA----------------------------
.factory('Firma', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/func_firma/:fir_id", {fir_id:"@_fir_id"}, {
    update: {method: "PUT", params: {fir_id: "@fir_id"}}
  })
}])
//------------------------VER FIRMA DE UN FUNCIONARIO----------------------------
.factory('FirmaFun', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/firma/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id: "@fun_id"}}
  })
}])










/*=========================================USACSIA====================================*/
/*VEROOOOOO*/

.factory('PruebaLaboratorioService', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/prueba_laboratorio/:pl_id", {pl_id:"@_pl_id"}, {
    update: {method: "PUT", params: {pl_id: "@pl_id"}}
  })
}])


.factory('ListarTramitesService', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tramites_x_tipo_tramite/:tra_id", {tra_id:"@_tra_id"}, {
    update: {method: "PUT", params: {tra_id: "@tra_id"}}
  })
}])


.factory('PaisService', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource("http://190.181.60.19/api_usacsia2/public/pais/:nac_id", {nac_id:"@_nac_id"}, {
    update: {method: "PUT", params: {nac_id: "@nac_id"}}
  })
}])


.factory('PersonaTramite', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pers_tra/:pt_id", {pt_id:"@_pt_id"}, {
    update: {method: "PUT", params: {pt_id: "@pt_id"}}
  })
}])



.factory('Tramite', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tramite/:tra_id", {pt_id:"@_tra_id"}, {
    update: {method: "PUT", params: {pt_id: "@tra_id"}}
  })
}])


.factory('Parasito', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/parasito/:par_id", {par_id:"@_par_id"}, {
    update: {method: "PUT", params: {par_id: "@par_id"}}
  })
}])


.factory('ParasitoTratamiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/parasito/:par_id", {par_id:"@_par_id"}, {
    update: {method: "PUT", params: {par_id: "@par_id"}}
  })
}])



.factory('ParasitoTratamiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/parasito_tratamiento/:pt_id", {pt_id:"@_par_id"})
}])

/*tratamientos no asignados por parasitos */
.factory('ParasitoTratamiento1', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tratamientos_x_parasito/:par_id", {pt_id:"@_pt_id"})
}])

.factory('Tratamiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tratamiento/:trat_id", {trat_id:"@_trat_id"}, {
    update: {method: "PUT", params: {trat_id: "@trat_id"}}
  })
}])

/*tratamientos que no estan asignados a un parasito*/

.factory('Tratamiento2', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tratamiento2/:par_id", {par_id:"@_par_id"})
}])

/*asignar numero de muestra*/
.factory('Muestra', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/muestra/:mue_id",  {par_id:"@_par_id"})
}])

/*listar parasitos que estan en la prueba*/

.factory('ParasitosPrueba', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/parasitosprueba/:pl_id",  {pl_id:"@_pl_id"})
}])
/*listar parasitos que no estan en la prueba*/
.factory('ParasitosNoPrueba', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/parasitos_no_prueba/:pl_id",  {pl_id:"@_pl_id"})
}])

.factory('PruebaPar', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/prueba_par/:pp_id",  {pp_id:"@_pp_id"})
}])
/*prueba e*/


.factory('DocumentoTramite', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/documento_tramite/:dt_id", {dt_id:"@_dt_id"}, {
    update: {method: "PUT", params: {dt_id: "@dt_id"}}
  })
}])


/*=========================================USACSIA====================================*/


















































//yosi +++++++++++++++++++++++++ S E S A R ++++++++++++++++++++++++++++++++++++++++++++++++++

// ==================== E S T A B L E C I M I E N T O S ============================================================
//Lista los establecimientos de salud
/*.factory('Establecimientos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimiento_salud/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])*/
//Listar establecimientos de salud por red
.factory('Establecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){//Establecimientos por Red
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimiento_salud_red/:red_id",  {red_id:"@_red_id"}, {
    update: {method: "PUT", params: {red_id: "@red_id"}}
  })}])
//Lista los tipos de establecimientos
.factory('Tipos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/tipos/:tip_id", {tip_id:"@_tip_id"}, {
    update: {method: "PUT", params: {tip_id: "@tip_id"}}
  })
}])
//Establecimientos por nivel
/*.factory('EstporNiv', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimiento_salud_nivel", {}, {})}])*/
.factory('EstNiv', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimientos_referencia/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//lista los establecimientos cercanos de una ubicación
.factory('Establecimientos_cercanos', ['$resource', function ($resource) {
  return $resource("http://190.181.60.19/alertas/establecimientos_cercanos.php", {}, {})
}])
// ==================== R E D E S =============================================================================
.factory('Redes', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reds/:red_id", {red_id:"@_red_id"}, {
    update: {method: "PUT", params: {red_id: "@red_id"}}
  })
}])
// ==================== P E R S O N A S ====================================================================
/*.factory('Personas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])*/
.factory('Direccion', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/direcciones/:dir_id", {dir_id:"@_dir_id"}, {
    update: {method: "PUT", params: {dir_id: "@dir_id"}}
  })
}])
.factory('PersonasFamiliar', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas_familiar", {}, {
    update: {method: "PUT", params: {}}
  })
}])
.factory('Familiar', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/familiar/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {}}
  })
}])
//============================P R E R E G I S T R O==========================================//
//Nuevo
.factory('PersonasTemporal', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas_temporales/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])
//Nuevo (Este servicio se encarga de pasar las personas de la tabla temporal a la tabla personas)
.factory('Temporales', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/temporales/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])

// ==================== P A C I E N T E S ================================================
.factory('Pacientes', ['$resource', 'CONFIG', function ($resource, CONFIG){//con este servicio tambien guarda solo los datos del paciente
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pacientes/:pac_id", {pac_id:"@_pac_id"}, {
    update: {method: "PUT", params: {pac_id: "@pac_id"}}
  })
}])
.factory('PacientesEst', ['$resource', 'CONFIG', function ($resource, CONFIG){////comprobar
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pacientes_es/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
.factory('Pacientes_adm', ['$resource', 'CONFIG', function ($resource, CONFIG){////comprobar
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/paciente_establecimiento", {}, {})}])
//Nuevo(Obtiene paciente por per_id)
.factory('PacientePersona', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pacientes_personas/:per_id", {per_id:"@per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])
// ==================== F U N C I O N A R I O S ==========================================
//Nuevo (para crear un funcionario cuando la persona ya esta registrada y las demas peticiones)
/*.factory('Funcionarios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarios/:fe_id", {fe_id:"@_fe_id"}, {
    update: {method: "PUT", params: {fe_id: "@fe_id"}}
  })
}])*/
//Nuevo(Para crear funcionario con persona)
/*.factory('FuncionarioPersona', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarios_personas/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])*/
//Funcionarios por establecimiento
.factory('Funcionario', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarioes/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo(Obtiene funcionario por per_id)
.factory('FuncionarioPer', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarios_per/:per_id", {per_id:"@per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])

// ==================== M E D I C O S =========================================================================
.factory('MedicosEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/medicos/:es_id", {es_id:"@es_id"}, {})
}])

// ==================== M U N I C I P I O S =========================================================================
/*.factory('Municipios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/municipios/:mun_id", {mun_id:"@_mun_id"}, {
    update: {method: "PUT", params: {mun_id: "@mun_id"}}
  })
}])
*/
// ==================== S E R V I C I O S =========================================================================
//Obtiene a todos los servicios
.factory('Servicios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/servicios", {}, {})}])
//Servicios de un establecimiento
.factory('EstablecimientoPresta', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/establecimiento_presta/:es_id", {es_id:"@_es_id"},
    {update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Para ver el presta, crear, editar y eliminar presta
.factory('ServiciosEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/servicios_establecimientos/:se_id",{se_id:"@se_id"}, 
    {update:{method:"PUT", params:{se_id:"@se_id"}}})
}])
//Nuevo(Para listar los servicios que no presta un establecimiento de salud)
.factory('ServiciosNoEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/servicios_no_establecimientos/:es_id", {es_id:"@_es_id"}, 
  {})
}])

// ==================== C O N S U L T O R I O S =================================================================
//Nuevo (Listar los consultorios de un establecimiento)
/*.factory('ConsultoriosEstablecimientos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/consultorios_establecimientos/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])*/
//Nuevo(Lista los consultorios dado un servicio, tambien crea un  nuevo servicio_consultorio)
.factory('ServicioConsultorios', ['$resource', 'CONFIG', function ($resource, CONFIG){//Ver si este servicio se utiliza en algun lado
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/servicios_consultorios/:sc_id", {sc_id:"@_sc_id"}, {
    update: {method: "PUT", params: {sc_id: "@sc_id"}}
  })
}])
//crear, editar, ver y eliminar consultorio
/*.factory('Cons', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/consultorios/:con_id",{con_id:"@_con_id"}, {
    update: {method: "PUT", params: {con_id: "@con_id"}}
  })
}])*/

//==================== R E F E R E N C I A S ==================================================================
//Nuevo (listar referencias realizadas por el establecimiento)
.factory('ReferenciasEstablecimientoOrigen', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/referencias_establecimientos_origen/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo(listar referencias recibidas para llevar a la contrareferencia)
.factory('ReferenciasEstablecimientoDestino', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/referencias_establecimientos_destino/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
.factory('Referencia', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/referencia/:br_id", {br_id:"@_br_id"}, {
    update: {method: "PUT", params: {br_id: "@br_id"}}
  })
}])
//listar red por estas referencia
.factory('RedEs', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/red_referencias/:es_id", {es_id:"@es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo (editar 2 edita la referencia cuando se recepciona)
.factory('ReferenciaEstados', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/referencias_estados/:br_id", {br_id:"@_br_id"}, {
    update: {method: "PUT", params: {br_id: "@br_id"}}
  })
}])
//listar referencias true
.factory('ReferTrue', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/estado_referencia_destino/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo (VERIFICAR EXISTENCIA PACIENTE)
.factory('PacienteEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pacientes_establecimientos/:pac_id/:es_id", {pac_id:"@_pac_id",es_id:"@_es_id"}, {update: {method: "PUT", params: {pac_id: "@pac_id",es_id:"@_es_id"}}
  })
}])
//Para ver la contrareferencia de una referencia
.factory('VerContraDeReferencia', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/referencia_contra/:br_id", {}, {})
}])
//Nuevo(/Edad de un paciente)
.factory('PacienteEdad', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pacientes_edades/:pac_id", {pac_id:"@_pac_id"}, {
    update: {method: "PUT", params: {pac_id: "@pac_id"}}
  })
}])

//==================== C O N T R A R E F E R E N C I A S =====================================================
//Nuevo(listar contrareferencias realizadas)
.factory('ContrareferenciasEstablecimientoDestino', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/contrareferencias_establecimientos_destino/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo(listar contrareferencias recibidas)
.factory('ContrareferenciasEstablecimientoOrigen', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/contrareferencias_establecimientos_origen/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
.factory('Contrareferencias', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/contrareferencia/:bc_id", {bc_id:"@_bc_id"}, {
    update: {method: "PUT", params: {bc_id: "@bc_id"}}
  })
}])
//Nuevo para editar los estados de la contrareferencia
.factory('ContrareferenciaEstados', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/contrareferencias_estados/:bc_id", {bc_id:"@_bc_id"}, {
    update: {method: "PUT", params: {bc_id: "@bc_id"}}
  })
}])

//==================== R O L E S =============================================================================
.factory('RolResource', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/roles/:rol_id", {rol_id:"@_rol_id"}, {
    update: {method: "PUT", params: {rol_id: "@rol_id"}}
  })
}])

//==================== I N S T I T U C I O N =================================================================
.factory('Institucion', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/institucion/:ins_id", {ins_id:"@_ins_id"},{
    update: {method: "PUT", params: {ins_id: "@ins_id"}}
  })
}])

//==================== C A R G O ===========================================================================
.factory('Cargo', ['$resource', 'CONFIG', function ($resource, CONFIG){ 
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/cargo", {}, {})
}])

//==================== U S U A R I O S ===========================================================================
/*.factory('Usuarios', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios/:usu_id", {usu_id:"@_usu_id"}, {
    update: {method: "PUT", params: {usu_id: "@usu_id"}}
  })
}])*/
//Lista los usuarios de un establecimiento
.factory('UsuariosEstab', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios_establecimiento/:es_id", {es_id:"@_es_id"},
    {update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Lista los funcionarios que no son usuarios de un establecimiento
//Nuevo 
.factory('FuncionariosEstablecimiento', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarios_establecimientos/:es_id", {}, {})
}])
//Verifica si un usuario tiene rol en un establecimiento
.factory('UsuarioEstado', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios_estados/:usu_id/:es_id", {}, {})
}])
//Para editar y dar de baja a un usuario
.factory('RolesUsuarios', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/roles_usuarios/:ru_id", {ru_id:"@_ru_id"},
    {update: {method: "PUT", params: {ru_id: "@ru_id"}}
  })
}])

//==================== C O N F I G U R A C I O N E S   A L E R T A S ===========================================================================
.factory('Alertas', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/configuracion_alerta/:ca_id", {ca_id:"@_ca_id"}, {
    update: {method: "PUT", params: {ca_id:"@ca_id"}}
  })
}])
//para alertas de vacunas
.factory('AlertasVacunas', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/vacuna_alerta/:atv_id", {atv_id:"@_atv_id"}, {
    update: {method: "PUT", params: {atv_id:"@atv_id"}}
  })
}])

//==================== E N F E R M E D A D E S ===========================================================================
.factory('Enfermedades',['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/enfermedad/:enfe_id",{id:"@_enfe_id"},
    {update: {method:"PUT", params:{enfe_id:"@enfe_id"}}
  })
}])

//==================== V A C U N A S ===========================================================================
.factory('Vacunas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/vacunas/:vac_id", {vac_id:"@_vac_id"}, {
    update: {method: "PUT", params: {vac_id: "@vac_id"}}
  })
}])

//==================== D O S I S    V A C U N A ===========================================================================
.factory('DosisVacuna', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/dosis_vacuna/:dov_id", {dov_id:"@_dov_id"}, {
    update: {method: "PUT", params: {dov_id: "@dov_id"}}
  })
}])
//Nuevo
.factory('VacunaDosis', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/vacunas_dosis/:vac_id", {vac_id:"@_vac_id"}, {
    update: {method: "PUT", params: {vac_id: "@vac_id"}}
  })
}])

//==================== S E G U R O S ===========================================================================
.factory('Seguros', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/seguro/:seg_id", {seg_id:"@_seg_id"}, {
  update: {method: "PUT", params: {seg_id: "@seg_id"}}
  })
}])

//==================== P A I S E S ===========================================================================
/*.factory('Paises', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/paises/:nac_id", {nac_id:"@_nac_id"}, {
    update: {method: "PUT", params: {nac_id:"@_nac_id"}}
  })
}])*/

//==================== R E S E R V A S ===========================================================================
//Nuevo(Lista los horarios disponibles)
.factory('ReservasAtiende', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reservas_atiende/:pre_id", {pre_id:"@_pre_id"}, {
    })
}])
//Para crear, editar, ver citas
.factory('Citas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/citas/:cit_id", {cit_id:"@_cit_id"}, {
    update: {method: "PUT", params: {cit_id: "@cit_id"}}
  })
}])
//Nuevo(Listar citas por paciente)
.factory('ReservasPaciente', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reservas_pacientes/:pac_id", {pac_id:"@_pac_id"}, {})}])
//Nuevo (Listar reservas y citas programadas por establecimiento)
.factory('ReservasEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reservas_establecimientos/:es_id", {es_id:"@_es_id"}, {
    })
}])
//Nuevo(Listar reservas por médico)
.factory('ReservasMedico', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reservas_medicos/:fe_id", {fe_id:"@_fe_id"}, {
    })
}])
//Nuevo(Listar las reservas del día de un establecimiento)
.factory('ReservasDia', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/reservas_dias/:es_id", {fun_id:"@_es_id"}, {
    })
}])
//para el historial de citas
.factory('CitasMedicos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/citas_medicos/:fe_id", {fe_id:"@_fe_id"}, {
    update: {method: "PUT", params: {fe_id: "@fe_id"}}
  })
}])

//==================== A S I G N A C I O N    D E   H O R A R I O S =====================================================
//Nuevo muestra los horarios por consultorios
.factory('HorariosConsultorio', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/horarios_consultorios/:con_id", {con_id:"@_con_id"}, {
    update: {method: "PUT", params: {con_id: "@con_id"}}
  })
}])

//==================== A S I G N A C I O N  DE  T U R N O S =====================================================
.factory('ConfigTurnos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/configuracion_turnos/:ct_id", {ct_id:"@_ct_id"}, {update: {method: "PUT", params: {ct_id: "@ct_id"}}
  })
}])
//Nuevo (Ver configuración de horario, y configuraciones de horario vigentes)
.factory('ConfiguracionHorario', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/configuracion_horarios/:ch_id", {ch_id:"@_ch_id"}, {
    update: {method: "PUT", params: {ch_id: "@ch_id"}}
  })
}])
//Nuevo (Lista configuración horarios por establecimientos de salud)
.factory('HorariosEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/horarios_establecimientos/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Nuevo (Generar atiende diariamente dado una configuración de horario)
.factory('HorariosAtiendeDiariamente', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/horarios_atiende_diariamente/:ch_id", {ch_id:"@_ch_id"}, {update: {method: "PUT", params: {ch_id: "@ch_id"}}
  })
}])


//============================C I T A S - P R O G R A M A D A S==========================================//
.factory('AtiendeDiariamente', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/atiende_diariamente/:fe_id", {fe_id:"@_fe_id"}, {
    update: {method: "PUT", params: {fe_id: "@fe_id"}}
  })
}])
.factory('CitasProgramadas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/citas_programadas/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//lista de citas previas y programadas
.factory('CitasEstablecimientos', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/citas_establecimientos/:es_id", {es_id:"@_es_id"}, {
    update: {method: "PUT", params: {es_id: "@es_id"}}
  })
}])
//Para cancelar cita programada
.factory('CitaConfirmacion', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/citas_confirmacion/:cit_id", {cit_id:"@_cit_id"}, {
    update: {method: "PUT", params: {cit_id: "@cit_id"}}
  })
}])
//para activar la cuenta de un paciente
.factory('PersonasUsuarios', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas_usuarios/:ci", {ci:"@_ci"}, {
    update: {method: "PUT", params: {ci: "@ci"}}
  })
}])
.factory('UsuariosCuentas', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/usuarios_cuentas/:per_id", {per_id:"@_per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])


/*=========================================USACSIA====================================*/

// ===============================FUNCIONARIOS  jhon
.factory('Funcionario', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionario/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id: "@fun_id"}}
  })
}])

.factory('FichasfechaService', ['$resource', 'CONFIG', function ($resource,CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/fichasfecha", {}, {
    update: {method: "PUT", params: {}}
  })
}])
.factory('Ficha', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ficha/:fic_id",{fic_id:"@_fic_id"},{
    update:{method:"PUT",params:{fic_id: "@fic_id"}}
  })
}])
//ultima ficha que recepciona un medico para atender----jhon
.factory('UltimaFichaAtendida', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ultimafichaatendida/:pt_id",{pt_id:"@_pt_id"},{
    update:{method:"PUT",params:{pt_id: "@pt_id"}}
  })
}])
// index,store,update,listar prueba_medica
.factory('PruebaMedica', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/prueba_medica/:pm_id",{pm_id:"@pm_id"},{
    update:{method:"PUT",params:{pm_id: "@pm_id"}}
  })
}])
.factory('FichaClinica', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pruebamedicapersona/:per_ci",{per_ci:"@per_ci"},{
    update:{method:"PUT",params:{per_ci: "@per_ci"}}
  })
}])

//--prueba enfermedad opearaciones
.factory('PruebaEnfermedad', ['$resource', 'CONFIG', function ($resource,CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/prueba_enfermedad/:pre_id",{pre_id:"@pre_id"},{
    update:{method:"PUT",params:{pre_id: "@pre_id"}}
  })
}])
.factory('PersonaporCI', ['$resource','CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas_ci/:per_ci", {per_ci:"@_per_ci"},{ update:{method:"PUT", params:{per_ci:"@per_ci"}}})
}])
// ---ultima prueba de laboratorio del tramite
.factory('UltimaPL', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ultima_prueba_laboratorio/:pt_id", {pt_id:"@_pt_id"},{update:{method:"PUT",params:{pt_id:"@pt_id"}}})
}])
.factory('Receta', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/receta", {},{ update:{method:"PUT", params:{}}})
}])

.factory('Categoria', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/categoria/:cat_id", {cat_id:"@_cat_id"},{ update:{method:"PUT", params:{cat_id:"@cat_id"}}})
}])
/*busacr essolicitante desde el ci de person o razon social*/
.factory('BuscarPropietario', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/buscarpropietario/:parametro",{parametro:"@_parametro"},{ update:{method:"PUT", params:{parametro:"@parametro"}}})
}])


// ===============================/jhon















// P A R A   E L   T O K E N
/*.factory('authInterceptor', function ($rootScope, $q, $window, ) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      console.log('lalajflakjfla');
      console.log(config.headers);
      console.log($window.localStorage);
      if ($window.localStorage.satellizer_token) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.satellizer_token;
        //$http.defaults.headers.common.Authorization = 'Bearer' + $window.localStorage.satellizer_token;
        console.log("headerssss");
        console.log(config.headers);
      }
      console.log('conffffisdof');
      console.log(config);
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})*/