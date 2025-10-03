'use strict';

var database = require("./lib/database.core");
var logger = require("./lib/logger");
var sesion = require("./lib/sesion");
var validators = require("./lib/utils");
var trazabilidad = require("./lib/trazabilidad");
//var cache = require("./lib/cache");

module.exports = {
    logger: logger,
    database: database,
    sesion: sesion,
    validators: validators,
    trazabilidad: trazabilidad,
    //cache: cache //habilitación local
}
