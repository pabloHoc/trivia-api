/**
 * TODO: 
 *  ! NOTIFICACIONES SIGUIENDO Y SIGUIENDO EN PERFIL Y NUEVO DESAFIO
 *  ! COMPETICIONES GANADAS
 *  ! NIVELES
 * 
 *  * Evitar preguntas repetidas respondidas correctamente
 *  * Evitar desafíos random ya completados
 *  * Agregar cantidad de veces jugadas a desafíos
 *  * Impedir votos dobles
 *  * Categorias por puntaje de preguntas
 *  ! Sanear queries
 *  * Revisar validaciones faltantes
 *  ? Optimizar posibles queries en asíncrono
 *  ? Chequear discrepancias uso id, ObjectId y username
 * 
 *  * Hacer modulo router de versiones
 */

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    server = express(),
    cors = require('cors'),
    routes = require('./routes');

const { port } = require('./configs/config');

server.use(express.static('apidocs'));
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