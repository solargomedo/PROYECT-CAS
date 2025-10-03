class NegocioExcepcion extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "NegocioExcepcion"; // (2)
    }
  }
  
// Hacer que la excepción se convierta en una bonita cadena cuando se usa como cadena
// (por ejemplo, por la consola de errores)
NegocioExcepcion.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
}

module.exports = NegocioExcepcion;