'use strict';

const database = require('../../libs/@cas/cas-lib-ms-core').database;
const log = require('../../libs/@cas/cas-lib-ms-core').logger

/**
 * @description Repositorio de HealthCheck
 * @module HealthCheckRepository
 */
class HealthCheckRepository {
    
    constructor() {
    }

    /** 
     * @function getHealthCheck 
     * @description Obtiene el status de conexión de la base de datos.
     */
    getHealthCheck() {

        return new Promise((resolve, reject) => {

            database.getConnectionStatus()
                .then(status => {
                    resolve(status);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
}

module.exports = HealthCheckRepository;