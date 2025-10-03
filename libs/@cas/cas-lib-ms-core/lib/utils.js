'use strict';

function validarNumerico(numberoAValidar) {

    if ((!numberoAValidar && numberoAValidar !== 0) || isNaN(numberoAValidar)) {
        return true;
    }
    else {
        return false;
    }
}

function validarString(stringAValidar, permiteVacio = false, permiteNulos = false) {

    if (permiteVacio) {
        if (permiteNulos) {
            if (stringAValidar === undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (stringAValidar === null || stringAValidar === undefined) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else if (permiteNulos) {
        if (stringAValidar.trim() === '' || stringAValidar === undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (!stringAValidar) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports.validarNumerico = validarNumerico;
module.exports.validarString = validarString;