'use strict';

const oracledb = require('oracledb');
const maxRows = 1000;
var initPoolFlag = false;

/** 
* @function obtenerPropiedadesPorNombre 
* @description busca todas las propiedades con el filtro solicitado, en un objeto.
* @param {string} filtro - palabra a buscar
* @param {object} objectoAFiltrar - objeto con las propiedades a filtrar
* @param {boolean} tipoComparacion - true: igual a, false: distinto a
*/
function obtenerPropiedadesPorNombre(filtro, objectoAFiltrar, tipoComparacion = true) {
    try {
        objectoAFiltrar = Object.getOwnPropertyNames(objectoAFiltrar)
        let query = filtro.toLowerCase();

        if (!tipoComparacion) {
            return objectoAFiltrar.filter(item => item.toLowerCase().indexOf(query) < 0);
        }

        return objectoAFiltrar.filter(item => item.toLowerCase().indexOf(query) >= 0);
    }
    catch (err) {
        throw err;
    }
}

/** 
*  @function initPool 
*  @description inicia el pool de conexiones.
*/
const initPool = async (env_custom = 'dev') => {
    try {
        if (!initPoolFlag) {

            let connection = '';

            if (env_custom == 'dev') {
                connection = process.env.DB_CONNECT;;
            }

            await oracledb.createPool({
                user: process.env.DB_USER_ESQUEMA,
                password: process.env.DB_PASS_ESQUEMA,
                connectString: connection,
                _enableStats: true,
                poolMin: 0,
                poolMax: 10,
                poolIncrement: 0,
                poolTimeout: 60,
                poolAlias: 'default'
            });

            initPoolFlag = true;
        }
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

/** 
*  @function connectionStatus 
*  @description Verifica si es factible conectarse a la base de datos.
*/
async function getConnectionStatus() {
    let connection;

    try {
        connection = await oracledb.getConnection();

        if (connection) {
            return { code: 200, status: 'connection OK', message: 'connection OK' };
        }
        else {
            return { code: -200, status: 'conecction Error', message: 'Ha ocurrido un error al intentar realizar la conexión' };
        }
    }
    catch (error) {
        return { code: -100, status: 'conecction Error', message: error };
    }
    finally {
        if (connection) {
            try {
                await connection.close();
            }
            catch (err) {
                throw err;
            }
        }
    }
}

/** 
* @function processResultSet 
* @description Procesa el resultado desde la base de datos
*/
async function processResultSet(result) {
    try {
        const response = {};

        let propiedades = obtenerPropiedadesPorNombre('cursor', result.outBinds, false);

        if (propiedades.length > 0) {

            propiedades.forEach(propiedad => {
                response[propiedad] = result.outBinds[propiedad];
            });
        }

        let cursores = obtenerPropiedadesPorNombre('cursor', result.outBinds);

        if (cursores.length > 0) {

            for (const cursor of cursores) {
                let rows = await result.outBinds[cursor].getRows(maxRows);

                response[cursor] = rows;
                result.outBinds[cursor].close();
            }
        }

        return response;
    }
    catch (err) {
        throw err;
    }
}

/** 
*  @function executeSql 
*  @description Ejecuta un procedimiento almacenado en la base de datos
*/
async function executeSql(sql, binds, autoCommit = true, isCLOB = false) {
    let connection;
    let response;

    try {
        if (isCLOB) {
            oracledb.fetchAsString = [oracledb.DB_TYPE_CLOB]
        }

        connection = await oracledb.getConnection();

        let result = await connection.execute(sql, binds, { autoCommit: autoCommit, resultSet: true, outFormat: oracledb.OBJECT });

        if (Object.entries(result).length !== 0) {
            response = await processResultSet(result, connection);
        }

        return response;
    }
    catch (err) {
        // if(err.errorNum === 12170){
        //     await oracledb.getPool().close();
        //     initPoolFlag = false;
        // }
        
        throw err;
    }
    finally {

        if (connection) {
            try {
                await connection.close();
            }
            catch (err) {
                throw err;
            }
        }
    }
}

async function closePoolAndExit() {
    try {
        // Get the pool from the pool cache and close it when no
        // connections are in use, or force it closed after 10 seconds.
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        // This setting should not be needed if both Oracle Client and Oracle
        // Database are 19c (or later).
        await oracledb.getPool().close(10);
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);

module.exports = {
    initPool,
    executeSql,
    getConnectionStatus
}
