'use strict';

const mockHealthCheck = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

/**
 * @description Mock servicio de HealthCheck
 * @module HealthCheckService
 */
class HealthCheckService {
    
    constructor() {
    }
    
    /** 
     * @function getHealthCheck 
     * @description Obtiene el status de conexión de la base de datos.
     */
    getHealthCheck() {
        
        return new Promise((resolve, reject) => {
            process.nextTick(() =>resolve(mockHealthCheck));
        });
    };
}

module.exports = HealthCheckService;