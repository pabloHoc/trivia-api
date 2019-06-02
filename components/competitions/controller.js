const db = require('./../../db/db');
const COLLECTIONS = require('./../../db/collections');
const ObjectId = require('mongodb').ObjectId;

class Controller {
    static async add(req, res) {
        let { challenged, category = 'random' } = req.params;
        let { username } = req.body;
        let challenger;
        
        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            
            [challenged, challenger] = await Promise.all([
                await collection.findOne({ username: challenged}),
                await collection.findOne({ username: username})
            ])

            if (!challenged || !challenger)
                throw new Error("Usuario no encontrado");
            
            if (category !== 'random') {
                collection = await db.getCollection(COLLECTIONS.CATEGORIES);
                category = await collection.findOne({ name: category});
            }

            if (!category)
                throw new Error("Categoría no encontrada");

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
        let { username, status = 'all', page = 0 } = req.params;
        
        let query = {}

        switch (status) {
            case 'pending':
                query = {
                    $or: [
                        { 
                            challenged: username,
                            challenged_finished: false
                        }, { 
                            challenger: username,
                            challenger_finished: false 
                        }
                    ]
                }                                
                break;
            case 'played':
                query = {
                    $or: [
                        { 
                            challenged: username,
                            challenged_finished: true,
                            challenger_finished: false,
                        }, { 
                            challenger: username,
                            challenged_finished: false,
                            challenger_finished: true, 
                        }
                    ]
                }                
                break                
            case 'finished':
                query = {
                    challenged_finished: true,
                    challenger_finished: true,                    
                    $or: [
                        { 
                            challenged: username,
                        }, { 
                            challenger: username,
                        }
                    ]
                }                
                break;
            case 'won':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,                        
                        $or: [
                            { 
                                challenged: username,
                                $where : 'this.challenged_points > this.challenger_points',
                            }, { 
                                challenger: username,
                                $where : 'this.challenged_points < this.challenger_points',
                            }
                        ]
                    }                
                    break;  
            case 'lost':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,
                        $or: [
                            { 
                                challenged: username,
                                $where : 'this.challenged_points < this.challenger_points',
                            }, { 
                                challenger: username,
                                $where : 'this.challenged_points > this.challenger_points',
                            }
                        ]
                    }                
                    break;
            case 'draw':
                    query = {
                        challenged_finished: true,
                        challenger_finished: true,
                        $where : 'this.challenged_points == this.challenger_points',
                        $or: [
                            { 
                                challenged: username
                            }, { 
                                challenger: username,
                            }
                        ]
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
            let collection = await db.getCollection(COLLECTIONS.COMPETITIONS);
            let result = await collection
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
        let { id, username, points } = req.params;

        try {
            if (points > 10)
                throw new Error('No pueden sumarse más de 10 puntos');

            let collection = await db.getCollection(COLLECTIONS.COMPETITIONS);
            let result = await collection.findOne({ _id: ObjectId(id) });

            if (!result)
                throw new Error('Competición no encontrada');

            if (result.challenger !== username && result.challenged !== username)
                throw new Error('Usuario no pertenece a competición');
                
            if ((result.challenger === username && result.challenger_finished) ||
                (result.challeged === username && result.challenged_finished))
                throw new Error('Usuario ya ha jugado');            

            let update = {};
            
            if (result.challenger === username)
                update = {
                    $set: {
                        challenger_finished: true,
                        challenger_points: points    
                    }
                }

            if (result.challenged === username)
                update = {
                    $set: {
                        challenged_finished: true,
                        challenged_points: points
                    }                        
                }

            await collection.updateOne({ _id: ObjectId(id) }, update);                

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