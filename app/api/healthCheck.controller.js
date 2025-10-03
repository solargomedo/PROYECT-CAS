'use strict';

const HealthCheckService = require('../services/healthCheck.service');
const NegocioExcepcion = require('../util/exceptions/negocioExcepcion');
const log = require('../../libs/@cas/cas-lib-ms-core').logger;

/**
 * @description Controller de HealthCheck
 * @module healthCheckController
 */

 /** @function getHealthCheck 
 *  @description Obtiene el status de conexión a la base de datos.
 *  @param {Request} req - request del endpoint
 *  @param {Response} res - response del endpoint
 *  @param {next} next - next del endpoint
 */
exports.getHealthCheck = async (req, res, next) => {

    try
    {
        let healthCheckService = new HealthCheckService();
        
        await healthCheckService.getHealthCheck()
                .then(status => {

                    log.info({ "endpoint": "/v1/getHealthCheck", "request": "", "response": status });
                    res.json(status);
                })
                .catch(statusError => {

                    log.error(statusError);
                    res.json(statusError.message);
                });
    }
    catch(error){
        next(error);
    }
};