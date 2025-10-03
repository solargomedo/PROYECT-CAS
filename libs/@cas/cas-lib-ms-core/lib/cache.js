'use strict';

const ExpressRedisCache = require('express-redis-cache');

/** 
* @description Servidor de caché del sistema
*/
const cache = ExpressRedisCache({
    expire: 86400,
    host: process.env.CACHE_SERVER
});

module.exports = cache;