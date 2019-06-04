/**
 * TODO: 
 *  * Agregar validacion JWT
 *  * Si esta expirado pero es valido, devolver uno nuevo
 *  * En el token tiene que estar el username
 *  * Middleware que chequee que haya token
 *  * Middleware que ponga el username en el body de la request
 * 
 *  * Evitar preguntas repetidas respondidas correctamente
 *  * Impedir votos dobles
 *  
 */

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    server = express(),
    cors = require('cors'),
    dotenv = require('dotenv')
    routes = require('./routes');

dotenv.config();

const { port } = require('./configs/config');

server.use(cors());
server.options('*', cors());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1);
})

routes.init(server);