'use strict';

let session = {};

function generarSesion(objetoSesion) {

    if (session.nombresSps) {

        let filtroSp = session.nombresSps.filter(str => str.toUpperCase() === objetoSesion.nombresSps[0].toUpperCase());
        
        if(!filtroSp.length){
            session.nombresSps = session.nombresSps.concat(objetoSesion.nombresSps[0]);
        }
    }
    else if (objetoSesion.nombresSps) {
        session = objetoSesion;
    }
}

function obtenerSesion(){
    return session;
}

function destruirSesion(){
    session = {};
}

module.exports.generarSesion = generarSesion;
module.exports.obtenerSesion = obtenerSesion;
module.exports.destruirSesion = destruirSesion;