'use strict';

const bunyan = require('bunyan');

/** 
* @description Creación del log del sistema configurado de manera centralizada
*/
const log = bunyan.createLogger({
    name: process.env.PROJECT_NAME,
    streams: [{
        level: 'debug',
        stream: process.stdout
    },
    {
        level: 'info',
        path: './logs/trace.log'
    },
    {
        level: 'error',
        path: './logs/error.log'
    }]
});

module.exports = log;