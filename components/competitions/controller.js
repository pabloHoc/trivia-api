const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections'),
    ObjectId = require('mongodb').ObjectId,
    eventEmitter = require('./../notifications/emitter'),
    EVENTS = require('./../notifications/events');

class Controller {
    /**
     * @api {post} /v1/competitions/invite/:username/:category? Desafiar a competencia
     * @apiName addcompetition
     * @apiGroup Competiciones
     * @apiVersion  1.0.0
     * @apiDescription Desafía a unx usuarix a una competición 
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/competitions/invite/ada", {
     *          headers: {
     *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
     *          },
     *          method: "post",
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {String} username Nombre de usuarix que se quiere desafiar 
     * @apiParam  {String} [category="random"] Categoría del desafío
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     "success": "true",
     *     "message": "Competición creada exitosamente" 
     * }
     */
    static async add(req, res) {
        let { challenged, category = 'random' } = req.params;
        let { username } = req.body;
        let challenger;

        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            
            [challenged, challenger] = await Promise.all([
                collection.findOne({ username: challenged}),
                collection.findOne({ username: username})
            ])

            if (!challenged || !challenger)
                throw new Error('Usuarix no encontradx');
            
            if (category !== 'random') {
                collection = await db.getCollection(COLLECTIONS.CATEGORIES);
                category = await collection.findOne({ name: category});
            }

            if (!category)
                throw new Error('Categoría no encontrada');

            collection = await db.getCollection(COLLECTIONS.COMPETITIONS);
            await collection.insertOne({
                challenger: challenger.username,
                challenged: challenged.username,
                challenger_points: 0,
                challenged_points: 0,
                challenger_finished: false,
                challenged_finished: false,
                category: category,
                date: new Date(Date.now()).toISOString()
            })                

            eventEmitter.emit(EVENTS.NEW_COMPETITION, { username: challenged.username, payload: challenger.username});

            return res.status(200).send({
                success: true,
                message: 'Competición creada exitosamente'
            });

        } catch(error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
     * @api {get} /v1/:status?/:page? Obtener competencias
     * @apiName getcompetitions
     * @apiGroup Competiciones
     * @apiVersion  1.0.0
     * @apiDescription Obtiene un listado de las competencias 
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/competitions/won", {
     *          headers: {
     *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
     *          },
     *          method: "get"
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {string="all","pending","played","finished","won","draw","lost"} [filter="all"] Filtro de las competencias por estado 
     * @apiParam  {Number} [page=0] Número de página de las competencias (10 por página)
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {Object[]} competitions Listado de competiciones
     * @apiSuccess (200 (OK)) {String} competitions._id Id de la competición
     * @apiSuccess (200 (OK)) {String} competitions.challenger Creadorx de la competición
     * @apiSuccess (200 (OK)) {String} competitions.challenged Invitadx de la competición
     * @apiSuccess (200 (OK)) {Number} competitions.challenger_points Preguntas bien respondidas por lx creadorx de la competición
     * @apiSuccess (200 (OK)) {Number} competitions.challenged_points Preguntas bien respondidas por lx invitadx de la competición
     * @apiSuccess (200 (OK)) {Boolean} competitions.challenger_finished Creadorx de la competición terminó de jugar
     * @apiSuccess (200 (OK)) {Boolean} competitions.challenged_finished Invitadx de la competición terminó de jugar
     * @apiSuccess (200 (OK)) {String} competitions.category Categoría de la competición
     * 
     * @apiSuccessExample {type} Success-Response:
     *   {
     *   "success": true,
     *   "competitions": [
     *           {
     *               "_id": "5cf412f474f3091a907f9658",
     *               "challenger": "pablo",
     *               "challenged": "user",
     *               "challenger_points": 7,
     *               "challenged_points": 7,
     *               "challenger_finished": true,
     *               "challenged_finished": true,
     *               "category": "random"
     *           }
     *       ]
     *   }            
     */
    static async getByUser(req, res) {
        const { username } = req.body;
        let { status = 'all', page = 0 } = req.params;
        
        let query = {}

        switch (status) {
            case 'pending':
                query = {
                    $or: [{ 
                        challenged: username,
                        challenged_finished: false 
                    }, { 
                        challenger: username,
                        challenger_finished: false 
                    }]
                }                                
                break;
            case 'played':
                query = {
                    $or: [{ 
                            challenged: username,
                            challenged_finished: true,
                            challenger_finished: false,
                        }, { 
                            challenger: username,
                            challenged_finished: false,
                            challenger_finished: true, 
                        }]
                }                
                break                
            case 'finished':
                query = {
                    challenged_finished: true,
                    challenger_finished: true,                    
                    $or: [{ 
                        challenged: username,
                    }, { 
                        challenger: username,
                    }]
                }                
                break;
            case 'won':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,                        
                        $or: [{ 
                            challenged: username,
                            $where : 'this.challenged_points > this.challenger_points',
                        }, { 
                            challenger: username,
                            $where : 'this.challenged_points < this.challenger_points',
                        }]
                    }                
                    break;  
            case 'lost':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,
                        $or: [{ 
                            challenged: username,
                            $where : 'this.challenged_points < this.challenger_points',
                        }, { 
                            challenger: username,
                            $where : 'this.challenged_points > this.challenger_points',
                        }]
                    }                
                    break;
            case 'draw':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,
                        $where : 'this.challenged_points == this.challenger_points',
                        $or: [{ 
                            challenged: username
                        }, { 
                            challenger: username,
                        }]
                    }                
                    break;                                                             
            default:
                query = {
                    $or: [
                        { challenged: username },
                        { challenger: username }
                    ]
                }
                break;
        }

        try {
            const collection = await db.getCollection(COLLECTIONS.COMPETITIONS);
            const result = await collection
                                .find(query)
                                .skip(page * 10)
                                .limit(10)
                                .toArray();

            return res.status(200).send({
                success: true,
                competitions: result
            });

        } catch(error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }

        /**
     * @api {post} /v1/competitions/play/:id/:points Jugar competencia
     * @apiName playcompetition
     * @apiGroup Competiciones
     * @apiVersion  1.0.0
     * @apiDescription Juega el turno de un jugador actualizando la competencia con la cantidad de preguntas
     * bien respondidas. Una vez que se juega no puede volverse a jugar la misma competencia. 
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/competitions/play/5cf412f474f3091a907f9658/8", {
     *          headers: {
     *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
     *          },
     *          method: "post",
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {String} id Id de la competición que se quiere jugar 
     * @apiParam  {Number} points Cantidad de preguntas bien respondidas
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     "success": "true",
     *     "message": "Competición actualizada exitosamente" 
     * }
     */
    static async play(req, res) {
        const { username } = req.body;
        const { id, points } = req.params;

        try {
            if (points > 10)
                throw new Error('No pueden sumarse más de 10 puntos');

            const collection = await db.getCollection(COLLECTIONS.COMPETITIONS);
            const competition = await collection.findOne({ _id: ObjectId(id) });

            if (!competition)
                throw new Error('Competición no encontrada');

            if (competition.challenger !== username && competition.challenged !== username)
                throw new Error('Usuarix no pertenece a competición');
                
            if ((competition.challenger === username && competition.challenger_finished) ||
                (competition.challeged === username && competition.challenged_finished))
                throw new Error('Usuarix ya ha jugado');            

            let update = {};
            points = parseInt(points);

            if (competition.challenger === username) {
                competition.challenger_finished = true;
                competition.challenger_points = points;

                update = {
                    $set: {
                        challenger_finished: true,
                        challenger_points: points    
                    }
                }
            } else if (competition.challenged === username) {
                competition.challenged_finished = true;
                competition.challenged_points = points;

                update = {
                    $set: {
                        challenged_finished: true,
                        challenged_points: points
                    }                        
                }
            }
                
            await collection.updateOne({ _id: ObjectId(id) }, update);                

            if (competition.challenger_finished && competition.challenged_finished) {
                if (competition.challenger_points > competition.challenged_points) {
                    eventEmitter.emit(EVENTS.COMPETITION_WON, { 
                            username: competition.challenger, 
                            payload:  competition.challenged,
                            extra: `${competition.challenger_points}-${competition.challenged_points}`
                        });
                    eventEmitter.emit(EVENTS.COMPETITION_LOST, {   
                            username: competition.challenged, 
                            payload:  competition.challenger,
                            extra: `${competition.challenged_points}-${competition.challenger_points}`
                        })                          
                } else if (competition.challenger_points === competition.challenged_points) {
                    eventEmitter.emit(EVENTS.COMPETITION_DRAW,{ 
                        username: competition.challenged, 
                        payload:  competition.challenger,
                        extra: `${competition.challenged_points}-${competition.challenger_points}`
                    });
                    eventEmitter.emit(EVENTS.COMPETITION_DRAW, { 
                        username: competition.challenger, 
                        payload:  competition.challenged,
                        extra: `${competition.challenger_points}-${competition.challenged_points}`
                    });
                } else {
                    eventEmitter.emit(EVENTS.COMPETITION_WON,{ 
                            username: competition.challenged, 
                            payload:  competition.challenger,
                            extra: `${competition.challenged_points}-${competition.challenger_points}`
                        });
                    eventEmitter.emit(EVENTS.COMPETITION_LOST, { 
                            username: competition.challenger, 
                            payload:  competition.challenged,
                            extra: `${competition.challenger_points}-${competition.challenged_points}`
                        });
                }
            }    

            return res.status(200).send({
                success: true,
                message: 'Competición actualizada exitosamente',
            });

        } catch(error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }
}

module.exports = Controller;