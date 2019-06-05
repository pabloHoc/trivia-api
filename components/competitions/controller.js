const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections'),
    ObjectId = require('mongodb').ObjectId,
    eventEmitter = require('./../notifications/emitter'),
    EVENTS = require('./../notifications/events');

class Controller {
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