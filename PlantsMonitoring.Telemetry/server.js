#!/usr/bin/env node

var debug = require('debug')('plantsmonitoring.telemetry:server');
const CosmosClient = require("@azure/cosmos").CosmosClient;
require('dotenv').config();

const cosmosDbClient = new CosmosClient({
    endpoint: process.env.DB_ENDPOINT,
    auth: {
        masterKey: process.env.DB_KEY
    }
});
const db = require('./data/index')(cosmosDbClient);
db.initDbCollections()
    .then(dbCollections => {
        return {
            telemetryData: require('./data/telemetry.data')(dbCollections.telemetryCollection),
            alarmsData: require('./data/alarms.data')(dbCollections.alarmsCollection),
            devicesData: require('./data/devices.data')(dbCollections.devicesCollection),
            rulesData: require('./data/rules.data')(dbCollections.rulesCollection)
        };
    })
    .then((data) => {
        return require('./app').init(data);
    })
    .then((server) => {
        var port = normalizePort(process.env.PORT || '5000');
        server.listen(port, () => {
            console.log(`Server listening at: ${port}`);
        });
    });

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
