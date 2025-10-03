/**
 * Modelo de clase  GrupoJerarquico 
 * @class
 * @param {number} id - id del Grupo Jerarquico
 * @param {string} nombre - Nombre del GrupoJerarquico
 * @since 1.0.0
 */
function GrupoJerarquico(objetoEntrada) {
    this.Id = objetoEntrada.CAPSNU_ID_GRP_JRC;
    this.Nombre = objetoEntrada.CAPSVA_DESCRIPCION_GRP_JRC;
}

module.exports = GrupoJerarquico;