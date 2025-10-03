'use strict';

const parrafoRepository = require('../repositories/ejemplo.repository');

/**
 * @description Servicios parrafos
 * @module ParrafoService
 */

/** 
 * @function obtenerCategorias 
 * @description Obtiene todas las categorias
 */
async function obtenerCategorias() {
    console.log('entro a service');
    return await parrafoRepository.obtenerCategorias();
}

/** 
 * @function obtenerCategoriaPorId 
 * @description Obtiene categoría por identificador de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerCategoriaPorId(request) {
    return await parrafoRepository.obtenerCategoriaPorId(request);
}

/** 
 * @function obtenerGruposJerarquicosPorIdCategoria 
 * @description Obtiene todos los grupos jerárquicos por id de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerGruposJerarquicosPorIdCategoria(request) {
    return await parrafoRepository.obtenerGruposJerarquicosPorIdCategoria(request);
}

/** 
 * @function obtenerGruposJerarquicosPorIdCategoria 
 * @description Obtiene grupo jerárquico por id de grupo jerárquico
 * @param {number} request.grupoJerarquicoId - Identificador del grupo jerárquico
 */
async function obtenerGrupoJerarquicoPorId(request) {
    return await parrafoRepository.obtenerGrupoJerarquicoPorId(request);
}

module.exports.obtenerCategorias = obtenerCategorias;
module.exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
module.exports.obtenerGruposJerarquicosPorIdCategoria = obtenerGruposJerarquicosPorIdCategoria;
module.exports.obtenerGrupoJerarquicoPorId = obtenerGrupoJerarquicoPorId;