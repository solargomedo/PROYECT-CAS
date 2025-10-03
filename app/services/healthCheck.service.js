'use strict';

const HealthCheckRepository = require('../repositories/healthCheck.repository');

/**
 * @description Servicios de HealthCheck
 * @module HealthCheckService
 */
class HealthCheckService {
    
    constructor() {
        this.healthCheckRepository = new HealthCheckRepository();
    }

    /** 
     * @function getHealthCheck 
     * @description Obtiene el status de conexión de la base de datos.
     */
    getHealthCheck() {

        return new Promise((resolve, reject) => {

            this.healthCheckRepository.getHealthCheck()
                .then(status => {
                    resolve(status);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = HealthCheckService;