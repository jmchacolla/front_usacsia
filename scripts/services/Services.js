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
//Nuevo (para crear un funcionario cuando la persona ya esta registrada y las demas peticiones)
.factory('Inspectores', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/inspectores", {}, {
    update: {method: "PUT", params: {}}
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
//------------------------CREAR FICHA DE INSPECCION----------------------------
.factory('FichaIn', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ficha_inspeccion", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------CREAR FICHA_CATEGORIA----------------------------
.factory('FichaCat', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ficha_categoria", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------CREAR FICHA 1----------------------------
.factory('Ficha1', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ficha1", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------CREAR FICHA 2----------------------------
.factory('Ficha2', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ficha2", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------VER EMPRESA TRAMITE----------------------------
.factory('EmpTra', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/empresa_tramite/:et_id", {et_id:"@_et_id"}, {
    update: {method: "PUT", params: {et_id:"@et_id"}}
  })
}])
//------------------------            ASIGNACION DE ZONAS             ----------------------------
.factory('ZonIn', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/zon_ins/:zi_id", {zi_id:"@_zi_id"}, {
    update: {method: "PUT", params: {zi_id:"@zi_id"}}
  })
}])
//------------------------             LISTA DISTRITO                ----------------------------
.factory('ListZon', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/zonas", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------           ZONAS POR DISTRITO               ----------------------------
.factory('Distritos', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/distritos", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//------------------------           EMPRESA TRAMITE               ----------------------------
.factory('ListN', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/list_cert_nat", {}, {
    update: {method: "PUT", params: {}}
  })
}])
.factory('ListJ', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/list_cert_ju", {}, {
    update: {method: "PUT", params: {}}
  })
}])
//listar empresa tramite segun inspector
.factory('NatI', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/list_insN/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id:"@fun_id"}}
  })
}])
//listar empresa tramite segun inspector
.factory('JurI', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/list_insJ/:fun_id", {fun_id:"@_fun_id"}, {
    update: {method: "PUT", params: {fun_id:"@fun_id"}}
  })
}])
//-------------------------CAMBIAR ESTADO DE EMPRESA TRAMITE 1----------------------------
.factory('Aprob1', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/aprobacion1/:et_id", {pt_id:"@_et_id"}, {
    update: {method: "PUT", params: {pt_id: "@et_id"}}
  })
}])
.factory('Aprob2', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/aprobacion2/:et_id", {pt_id:"@_et_id"}, {
    update: {method: "PUT", params: {pt_id: "@et_id"}}
  })
}])
.factory('Aprob3', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/aprobacion3/:et_id", {pt_id:"@_et_id"}, {
    update: {method: "PUT", params: {pt_id: "@et_id"}}
  })
}])
//--------------------------CREAR CERTIFICADO SANITARIO----------------------------
.factory('CertificadoSanitario', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/certificado_sanitario/:ces_id", {ces_id:"@_ces_id"}, {
    update: {method: "PUT", params: {ces_id: "@ces_id"}}
  })
}])
.factory('Firm2', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/aprob2/:ces_id", {ces_id:"@_ces_id"}, {
    update: {method: "PUT", params: {ces_id: "@ces_id"}}
  })
}])
.factory('Firm3', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/aprob3/:ces_id", {ces_id:"@_ces_id"}, {
    update: {method: "PUT", params: {ces_id: "@ces_id"}}
  })
}])
//buscar certificado sanitario segun et_id
.factory('BusCert', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/busca_cert/:et_id", {et_id:"@_et_id"}, {
    update: {method: "PUT", params: {et_id: "@et_id"}}
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
/*lista los documentos ue registro un tramite en certificado sanitario*/
.factory('DocumentoTramite2', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/lista_documentos_x_tramite/:et_id", {et_id:"@_et_id"})
}])


.factory('Documento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/documento/:doc_id", {doc_id:"@_doc_id"}, {
    update: {method: "PUT", params: {doc_id: "@doc_id"}}
  })
}])

.factory('Subclacificacion', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/subclasificacion/:sub_id", {sub_id:"@_sub_id"}, {
    update: {method: "PUT", params: {sub_id: "@sub_id"}}
  })
}])

.factory('PJuridica', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pjuridica/:pjur_nit", {pjur_nit:"@_pjur_nit"}, {
    update: {method: "PUT", params: {pjur_nit: "@pjur_nit"}}
  })
}])

.factory('PNatural', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pnatural/:per_id", {per_id:"@_per_id"})
}])

.factory('PNaturalPJuridicaPro_id', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pro_id_pjuridica_pnatural/:pro_id", {pro_id:"@_pro_id"})
}])

.factory('ConsultoriosLista', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/update_lista_consultorios")

}])

.factory('PersonasEstablecimiento', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/personas_x_establecimiento/:ess_id",{ess_id:'@_ess_id'})
}])

/* /VEROOOO*/


/*=========================================USACSIA====================================*/
//Nuevo(Obtiene funcionario por per_id)
.factory('FuncionarioPer', ['$resource', 'CONFIG', function ($resource, CONFIG){
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/funcionarios_per/:per_id", {per_id:"@per_id"}, {
    update: {method: "PUT", params: {per_id: "@per_id"}}
  })
}])
























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
/*##################################EMPRESA############################################*/

.factory('Categoria', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/categoria/:cat_id", {cat_id:"@_cat_id"},{ update:{method:"PUT", params:{cat_id:"@cat_id"}}})
}])
/*busacr essolicitante desde el ci de person o razon social*/
.factory('BuscarPropietario', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/buscarpropietario/:parametro",{parametro:"@_parametro"},{ update:{method:"PUT", params:{parametro:"@parametro"}}})
}])
.factory('PagoPendiente', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/pago_pendiente/:pp_id", {pp_id:"@_pp_id"},{ update:{method:"PUT", params:{pp_id:"@pp_id"}}})
}])
/*jhon-----retorna la lista de pagos pendientes por trámite*/
.factory('PagoPendienteTramite', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/ppportramite/:et_id", {et_id:"@_et_id"},{ update:{method:"PUT", params:{et_id:"@et_id"}}})
}])

.factory('EmpresaTramite', ['$resource', 'CONFIG', function ($resource, CONFIG) {
  return $resource(CONFIG.DOMINIO_SERVICIOS+"/empresa_tramite/:et_id", {et_id:"@_et_id"},{ update:{method:"PUT", params:{et_id:"@et_id"}}})
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










