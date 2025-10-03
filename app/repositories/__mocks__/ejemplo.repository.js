'use strict';

const mockCategorias = [
    { Id: 1, Nombre: "Categoría 1", GruposJerarquicos: []},
    { Id: 2, Nombre: "Categoría 2", GruposJerarquicos: []}
];

const mockGrupos = [
    { Id: 1, Nombre: "Grupo 1"},
    { Id: 2, Nombre: "Grupo 2"}
];

/**
 * @description Mock repositorio de parrafo
 * @module ParrafoRepository
 */

/** 
 * @function obtenerCategorias 
 * @description Obtiene todas las categorias
 */
async function obtenerCategorias(request) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(mockCategorias));
    });
}

/** 
 * @function obtenerCategoriaPorId 
 * @description Obtiene categoría por identificador de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerCategoriaPorId(request) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(mockCategorias[0]));
    });
}

/** 
 * @function obtenerGruposJerarquicosPorIdCategoria 
 * @description Obtiene todos los grupos jerárquicos por id de categoría
 * @param {number} request.categoriaId - Identificador de la categoría
 */
async function obtenerGruposJerarquicosPorIdCategoria(request) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(mockGrupos));
    });
}

/** 
 * @function obtenerGrupoJerarquicoPorId 
 * @description Obtiene grupo jerárquico por id de grupo jerárquico
 * @param {number} request.grupoJerarquicoId - Identificador del grupo jerárquico
 */
async function obtenerGrupoJerarquicoPorId(request) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(mockGrupos[0]));
    });
}

module.exports.obtenerCategorias = obtenerCategorias;
module.exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
module.exports.obtenerGruposJerarquicosPorIdCategoria = obtenerGruposJerarquicosPorIdCategoria;
module.exports.obtenerGrupoJerarquicoPorId = obtenerGrupoJerarquicoPorId;