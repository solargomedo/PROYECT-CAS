'use strict';

const oracledb = require('oracledb');
const database = require('../../libs/@cas/cas-lib-ms-core').database;
const Categoria = require('../entities/categoria.model');
const GrupoJerarquico = require('../entities/grupoJerarquico.model');



/**
 * @description Repositorio de ejemplos
 * @module EjemploRepository
 */

/** 
 * @function obtenerCategorias 
 * @description Obtiene todas las categorias
 */
async function obtenerCategorias() {
    let categorias = [];

    let params = {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };

    let sql = `BEGIN 
                    NUCLEO.CAPSPG_NUCLEO_CAPACITACIONES.CAPSSP_GET_NEGOCIOS(:cursor); 
                END;`;

    try {
        let resultado = await database.executeSql(sql, params)
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        throw error;        
    }


    if (!resultado) {
        throw new Error('No se pudo obtener el listado de categorías');
    }

    for (let fila of resultado.cursor) {
        categorias.push(new Categoria(fila));
    }

    return categorias;
}

/** 
 * @function obtenerCategoriaPorId 
 * @description Obtiene categoría por identificador de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerCategoriaPorId(request) {

    let categoria;

    let params = {
        idCategoria: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: Number(request.categoriaId) },
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };

    let sql = `BEGIN 
                    NUCLEO.CAPSPG_NUCLEO_CAPACITACIONES.CAPSSP_GET_NEGOCIO_BY_ID(:idCategoria, :cursor);
                END;`

    let resultado = await database.executeSql(sql, params)

    if (!resultado) {
        throw new Error('No se pudo obtener el listado de categorías');
    }

    for (let fila of resultado.cursor) {
        categoria = new Categoria(fila);
    }

    return categoria;
}

/** 
 * @function obtenerGruposJerarquicosPorIdCategoria 
 * @description Obtiene todos los grupos jerárquicos por id de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerGruposJerarquicosPorIdCategoria(request) {

    let params = {
        categoriaId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: Number(request.categoriaId) },
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };

    let sql = `BEGIN 
                    NUCLEO.CAPSPG_NUCLEO_CAPACITACIONES.CAPSSP_GET_GRPJRC_BY_IDNEG_2(
                    :categoriaId,
                    :cursor); 
                END;`;

    let resultado = await database.executeSql(sql, params)

    if (!resultado) {
        throw new Error('No se pudo obtener el listado de grupos jerarquicos');
    }

    let gruposJerarquicos = [];

    for (let fila of resultado.cursor) {
        gruposJerarquicos.push(new GrupoJerarquico(fila));
    }

    return gruposJerarquicos;
}

/** 
 * @function obtenerGrupoJerarquicoPorId 
 * @description Obtiene grupo jerárquico por id de grupo jerárquico
 * @param {number} request.grupoJerarquicoId - Identificador del grupo jerárquico
 */
async function obtenerGrupoJerarquicoPorId(request) {

    let params = {
        grupoJerarquicoId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: Number(request.grupoJerarquicoId) },
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };

    let sql = `BEGIN 
                NUCLEO.CAPSPG_NUCLEO_CAPACITACIONES.CAPSSP_GET_GRPJRC_BY_ID(
                :grupoJerarquicoId,
                :cursor); 
                END;`;

    let resultado = await database.executeSql(sql, params)

    if (!resultado) {
        throw new Error('No se pudo obtener el grupo jerarquico');
    }

    let grupoJerarquico;

    for (let fila of resultado.cursor) {
        grupoJerarquico = new GrupoJerarquico(fila);
    }

    return grupoJerarquico;
}

module.exports.obtenerCategorias = obtenerCategorias;
module.exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
module.exports.obtenerGruposJerarquicosPorIdCategoria = obtenerGruposJerarquicosPorIdCategoria;
module.exports.obtenerGrupoJerarquicoPorId = obtenerGrupoJerarquicoPorId;