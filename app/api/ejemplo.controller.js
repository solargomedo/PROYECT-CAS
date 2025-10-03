'use strict';

const parrafoService = require('../services/ejemplo.service');
const log = require('../../libs/@cas/cas-lib-ms-core').logger;
const util = require('../util/utils');

/**
* @description Controller de parrafo
* @module ParrafoController
*/

/** 
 * @function obtenerCategorias 
 * @description Obtiene todas las categorias 
 * @param {Request} req - request del endpoint
 * @param {Response} res - response del endpoint
 * @param {next} next - función next del endpoint
 */
async function obtenerCategorias(req, res, next) {
console.log('entro a controller');
    try {
        let resultado = await parrafoService.obtenerCategorias();

        const response = {
            code: 200,
            message: "Operación exitosa.",
            data: resultado
        }

        log.info({ "endpoint": "/v1/categorias", "response": response });
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}

/**
 * @function obtenerCategoriaPorId 
 * @description Obtiene el detalle de una categoría por Id
 * @param {Request} req - request del endpoint
 * @param {Response} res - response del endpoint
 * @param {next} next - función next del endpoint
 */
async function obtenerCategoriaPorId(req, res, next) {
    try {
        let request = {};

        request.categoriaId = req.params.categoriaId;

        if (util.validarNumerico(request.categoriaId)) {

            const reponse = {
                code: 400,
                error: "Bad Request",
                message: 'Error en la solicitud.'
            };

            log.error({ "endpoint": "/v1/categorias/{categoriaId}", "request": request, "error": reponse });
            res.status(400).json(reponse);
        }
        else {

            let resultado = await parrafoService.obtenerCategoriaPorId(request);

            const response = {
                code: 200,
                message: "Operación exitosa.",
                data: resultado
            }

            log.info({ "endpoint": "/v1/categorias/:categoriaId", "request": request, "response": response });
            res.status(200).json(response);
        }
    }
    catch (error) {
        next(error);
    }
}

/** 
 * @function obtenerGruposJerarquicosPorIdCategoria 
 * @description Obtiene todos los grupos jerárquicos de una categoría
 * @param {Request} req - request del endpoint
 * @param {Response} res - response del endpoint
 * @param {next} next - función next del endpoint
 */
async function obtenerGruposJerarquicosPorIdCategoria(req, res, next) {

    try {
        let request = {};

        request.categoriaId = req.params.categoriaId;

        if (util.validarNumerico(request.categoriaId)) {

            const reponse = {
                code: 400,
                error: "Bad Request",
                message: 'Error en la solicitud.'
            };

            log.error({ "endpoint": "/v1/categorias/:categoriaId/gruposjerarquicos", "request": request, "error": reponse });
            res.status(400).json(reponse);
        }
        else {

            let resultado = await parrafoService.obtenerGruposJerarquicosPorIdCategoria(request);

            const response = {
                code: 200,
                message: "Operación exitosa.",
                data: resultado
            }

            log.info({ "endpoint": "/v1/categorias/:categoriaId/gruposjerarquicos", "request": request, "response": response });
            res.status(200).json(response);
        }
    }
    catch (error) {
        next(error);
    }
}

/** 
 * @function obtenerGrupoJerarquicoPorId 
 * @description Obtiene grupo jerarquía por Id
 * @param {Request} req - request del endpoint
 * @param {Response} res - response del endpoint
 * @param {next} next - función next del endpoint
 */
async function obtenerGrupoJerarquicoPorId(req, res, next) {

    try {
        let request = {};

        request.grupoJerarquicoId = req.params.grupoJerarquicoId;

        if (util.validarNumerico(request.grupoJerarquicoId)) {

            const reponse = {
                code: 400,
                error: "Bad Request",
                message: 'Error en la solicitud.'
            };

            log.error({ "endpoint": "/v1/categorias/:categoriaId/gruposjerarquicos/:grupoJerarquicoId", "request": request, "error": reponse });
            res.status(400).json(reponse);
        }
        else {

            let resultado = await parrafoService.obtenerGrupoJerarquicoPorId(request);

            const response = {
                code: 200,
                message: "Operación exitosa.",
                data: resultado
            }

            log.info({ "endpoint": "/v1/categorias/:categoriaId/gruposjerarquicos/:grupoJerarquicoId", "request": request, "response": response });
            res.status(200).json(response);
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.obtenerCategorias = obtenerCategorias;
module.exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
module.exports.obtenerGruposJerarquicosPorIdCategoria = obtenerGruposJerarquicosPorIdCategoria;
module.exports.obtenerGrupoJerarquicoPorId = obtenerGrupoJerarquicoPorId;