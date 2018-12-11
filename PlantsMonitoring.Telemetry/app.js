const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

module.exports = {
    init: (data) => {
        const app = express();
        var server = require('http').createServer(app);  
        var io = require('socket.io')(server);
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
        const telemetryController = require('./controllers/telemetry.controller')(data, io);

        app.use(logger('dev'));
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.post('/api/telemetry', telemetryController.post);

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404));
        });

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        
        return server;
    }
}
