'use strict';

module.exports = (app) => {
    const controller = require('../api/ejemplo.controller');

    // Crea un párrafo asociado a un usuario
    app.get('/v1/categorias', controller.obtenerCategorias);

    // Modifica un párrafo con un ID asociado
    app.get('/v1/categorias/:categoriaId', controller.obtenerCategoriaPorId);
    
    // Elimina un párrafo con un ID asociado
    app.get('/v1/categorias/:categoriaId/gruposjerarquicos', controller.obtenerGruposJerarquicosPorIdCategoria);

    // Obtiene las llaves asociadas a los párrafos
    app.get('/v1/categorias/gruposjerarquicos/:grupoJerarquicoId', controller.obtenerGrupoJerarquicoPorId);
};