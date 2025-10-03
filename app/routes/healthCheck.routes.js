'use strict';

module.exports = (app) => {
    const healthCheckController = require('../api/healthCheck.controller');

    // Obtiene un status de conexion a la base de datos.
    app.get('/v1/healthCheck', healthCheckController.getHealthCheck);
};