'use strict';

const mockHealthCheck = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

/**
 * @description Mock repositorio de HealthCheck
 * @module HealthCheckRepository
 */
class HealthCheckRepository {
    
    constructor() {
    }

    /** 
     * @function getHealthCheck 
     * @description Obtiene el status de conexion de la base de datos.
     */
    getHealthCheck() {

        return new Promise((resolve, reject) => {
            process.nextTick(() =>resolve(mockHealthCheck));
        });
    };
}

module.exports = HealthCheckRepository;