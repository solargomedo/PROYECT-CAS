/**
 * Modelo de clase  Categoria 
 * @class
 * @param {number} id - id de la categoria o Negocio
 * @param {string} nombre - Nombre del Negocio o Categoria
 * @since 1.0.0
 */
function Categoria(objetoEntrada) {
    this.Id = objetoEntrada.CAPSNU_ID_CAT;
    this.Nombre = objetoEntrada.CAPSVA_DESCRIPCION_CAT;
}

module.exports = Categoria;