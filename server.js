require('dotenv').config();
const express = require('express');
const compression = require('compression');
const log = require('./libs/@cas/cas-lib-ms-core').logger;
const database = require('./libs/@cas/cas-lib-ms-core').database;
const app = express();
const port = process.env.PORT;
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./app/util/api-doc');
const cors = require('cors');
const bodyParser = require('body-parser');
const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = 10 + defaultThreadPoolSize;

const startup = async () => {
    console.log('Starting application');
  
    try {
        console.log('Initializing database Pool');
    
        await database.initPool(process.env.NODE_ENV_CUSTOM);
    } 
    catch (err) {
        console.error(err);
    
        process.exit(1); // Non-zero failure code
    }
}
  
startup();

//Habilita la lectura de variables en métodos que reciban los parametros via BODY
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Habilita todos los CORS Requestsapp.use(cors())
app.use(cors());

//Documentación Swagger y OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation, true, { displayRequestDuration: true }));

//Carga endpoints de ejemplo
require('./app/routes/ejemplo.routes')(app);
require('./app/routes/healthCheck.routes')(app);

//Control de errores
app.use(function (err, req, res, next) {
    log.error(err);
    if (process.env.NODE_ENV_CUSTOM == 'dev') {
        res.status(500)
        return res.json({ "error": err.message })
    }
    else {
        res.status(500)
        return res.json({ "error": "Ha ocurrido un error inesperado, por favor comuníquese con el administrador del sistema." })
    }
});

//Compresión de los endpoints
app.use(compression);

app.listen(port, () => { log.info(process.env.PROJECT_NAME + " en puerto " + port) });