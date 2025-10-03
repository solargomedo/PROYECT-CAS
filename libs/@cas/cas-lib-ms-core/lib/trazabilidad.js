const log = require('./logger');
const CryptoJS = require("crypto-js");

function generarTrazabilidad(request, response, objetoRequest, objetoRetorno) {

    if (request && request.headers && request.headers.trazabilidad) {

        let objetoDeTraza = JSON.parse(request.headers.trazabilidad);

        if (objetoDeTraza) {

            let poseeTrazabilidadActiva = desencriptar(objetoDeTraza.trazabilidad);

            if (poseeTrazabilidadActiva) {

                let usuarioId = desencriptar(objetoDeTraza.usuarioId);
                let sesionId = desencriptar(objetoDeTraza.sesionId);
                let scope = desencriptar(objetoDeTraza.scope);
                let funcionalidad = desencriptar(objetoDeTraza.funcionalidad);

                let spsEjecutados = response.locals.spsEjecutados;

                log.info({
                    "url": request.url,
                    "tiempoDeEjecucion": response.getHeaders()['x-response-time'],
                    "scope": scope,
                    "funcionalidad": funcionalidad,
                    "usuarioId": usuarioId,
                    "sesionId": sesionId,
                    "nombresSpsEjecutados": spsEjecutados,
                    "request": objetoRequest,
                    "response": objetoRetorno
                });
            }
        }
    }

    response.locals.spsEjecutados = [];
}

function generarTrazabilidadError(request, response, objetoRequest, objetoRetorno) {

    if (request && request.headers && request.headers.trazabilidad) {

        let objetoDeTraza = JSON.parse(request.headers.trazabilidad);

        if (objetoDeTraza) {

            let usuarioId = desencriptar(objetoDeTraza.usuarioId);
            let sesionId = desencriptar(objetoDeTraza.sesionId);
            let scope = desencriptar(objetoDeTraza.scope);
            let funcionalidad = desencriptar(objetoDeTraza.funcionalidad);

            let spsEjecutados = response.locals.spsEjecutados;

            log.error({
                "url": request.url,
                "tiempoDeEjecucion": response.getHeaders()['x-response-time'],
                "scope": scope,
                "funcionalidad": funcionalidad,
                "usuarioId": usuarioId,
                "sesionId": sesionId,
                "nombresSpsEjecutados": spsEjecutados,
                "request": objetoRequest,
                "response": objetoRetorno
            });
        }
    }

    response.locals.spsEjecutados = [];
}

function generarTrazabilidadServicioExterno(request, url, objetoRequest, objetoRetorno) {

    if (request && request.headers && request.headers.trazabilidad) {

        let objetoDeTraza = JSON.parse(request.headers.trazabilidad);

        if (objetoDeTraza) {

            let poseeTrazabilidadActiva = desencriptar(objetoDeTraza.usuarioId);

            if (poseeTrazabilidadActiva) {

                let usuarioId = desencriptar(objetoDeTraza.usuarioId);
                let sesionId = desencriptar(objetoDeTraza.sesionId);
                let scope = desencriptar(objetoDeTraza.scope);
                let funcionalidad = desencriptar(objetoDeTraza.funcionalidad);

                log.info({
                    "url": url,
                    "scope": scope,
                    "funcionalidad": funcionalidad,
                    "usuarioId": usuarioId,
                    "sesionId": sesionId,
                    "request": objetoRequest,
                    "response": objetoRetorno
                });
            }
        }
    }
}

function desencriptar(stringAEncriptar) {
    let claveDeEncriptacion = 'myPassword';

    let bytes = CryptoJS.AES.decrypt(stringAEncriptar, claveDeEncriptacion);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports.generarTrazabilidad = generarTrazabilidad;
module.exports.generarTrazabilidadError = generarTrazabilidadError;
module.exports.generarTrazabilidadServicioExterno = generarTrazabilidadServicioExterno;