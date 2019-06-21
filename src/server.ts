/**
 * TODO: 
 *  ! NIVELES
 *  
 *  * Evitar preguntas repetidas respondidas correctamente
 *  * Evitar desafíos random ya completados
 *  * Agregar cantidad de veces jugadas a desafíos
 *  * Impedir votos dobles
 *  ! Sanear queries
 *  * Revisar validaciones faltantes
 *  ? Optimizar posibles queries en asíncrono
 *  ? Chequear discrepancias uso id, ObjectId y username
 *  * Pasar validators customs a express-validator
 *  ! TESTS
 *  * Hacer modulo router de versiones
 *  * Devolver codigos como la gente
 */
require('module-alias/register')

import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import cors from 'cors';
import { port } from './configs/config';
import { Database } from './db/db';

class Server {

    private static server: express.Application;
    
    private static config(): void{
        this.server.use(express.static('apidocs'));
        this.server.use(cors());
        this.server.options('*', cors());
        
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
    }

    public static async init() {
        if (this.server === undefined) {
            this.server = express();
        }
        
        this.config();
        await Database.init();        
        routes.init(this.server);

        this.server.listen(port, () => {
            console.log(`Listening to port: ${port}`);
        }); 

        process.on('uncaughtException', (err) => {
            console.error('There was an uncaught error', err);
            process.exit(1);
        });
    }
}

Server.init();





