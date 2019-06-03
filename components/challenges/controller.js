const db = require('./../../db/db');
const COLLECTIONS = require('./../../db/collections');
const ObjectId = require('mongodb').ObjectId;

class Controller {
    static async add(req, res) {
        try {
            let { title, description, questions } = req.body;

            // !!! Sacar esta mierda de aca
            let user = ObjectId("5ceefe4439bc8a4438d37426")

            questions = questions.map(id => { return ObjectId(id) })

            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);
            await collection.insertOne({
                user: user,
                title: title,
                description: description,
                questions: questions,
                likes: 0,
                plays: 0, // Ver esto aca
                date: new Date(Date.now()).toISOString()
            });

            res.status(200).send({
                success: true,
                message: "Desafío agregado con éxito"
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al agregar desafío",
                error: error.message,
                stack: error.stack
            });
        }
    }
    // /challenges/:id
    static async get(req, res) {
        const { id } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);

            let aggregation = Controller.getLookup();
            aggregation.unshift({
                $match: {
                    _id: ObjectId(id)
                }
            })


            const result = await collection.aggregate(aggregation).toArray();

            if (result.length) {
                res.status(200).send({
                    success: true,
                    challenge: result[0]
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Desafío no existente"
                });

            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                error: error
            });
        }
    }

    /**
     * TODO: Chequear que no sea del mismo usuario y que ya no haya sido jugado
     */

    static async getRandom(req, res) {
        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);

            let aggregation = Controller.getLookup();
            aggregation.unshift({ $sample: { size: 1 } });

            const result = await collection.aggregate(aggregation).toArray();

            if (result.length) {
                res.status(200).send({
                    success: true,
                    challenge: result[0]
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Desafío no existente"
                });

            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                error: error
            });
        }
    }
    // /challenges/:sort/:page
    // /challenges/top/3
    static async getAll(req, res) {
        let { sort, page = 0 } = req.params;

        switch (sort) {
            case 'top':
                sort = { likes: 1 }
                break;
            case 'new':
                sort = { date: 1 }
                break;
            case 'plays':
                sort = { plays: 1 }
                break;
            default:
                sort = { likes: 1 }
        }

        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);
            const result = await collection
                .find()
                .project({
                    title: 1,
                    description: 1,
                    likes: 1                    
                })
                .sort(sort)
                .limit(10)
                .skip(page * 10)
                .toArray();

            res.status(200).send({
                success: true,
                challenges: result
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                error: error
            });
        }
    }
    // /challenges/byuser/:username/:sort/:page
    // /challenges/byuser/pabloH/top/1
    static async getByUsername(req, res) {
        let { username, sort, page = 0 } = req.params;

        switch (sort) {
            case 'top':
                sort = { likes: 1 }
                break;
            case 'new':
                sort = { date: 1 }
                break;
            case 'plays':
                sort = { plays: 1 }
                break;
            default:
                sort = { likes: 1 }
        }

        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            let user = await collection.findOne({ username: username });

            if (!user) 
                throw new Error('Usuario no encontrado');

            collection = await db.getCollection(COLLECTIONS.CHALLENGES);

            const result = await collection
                .find({ user: user._id })
                .project({
                    title: 1,
                    description: 1,
                    likes: 1                    
                })
                .sort(sort)
                .limit(10)
                .skip(page * 10)
                .toArray();

            res.status(200).send({
                success: true,
                challenges: result
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener desafíos",
                error: error.message,
                trace: error.trace
            });
        }
    }

    
    static async search(req, res) {
        const { query, page = 0 } = req.params;
        
        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);
            const result = await collection
                                .find({
                                $or: [
                                    { title: {'$regex' : query, $options: 'i' }},
                                    { description: {'$regex' : query, $options: 'i' }},
                                ]})
                                .project({
                                    title: 1,
                                    description: 1,
                                    likes: 1                    
                                })
                                .limit(10)
                                .skip(page * 10)
                                .toArray();

            res.status(200).send({
                success: true,
                questions: result
            });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener desafíos",
                message: error.message,
                trace: error.stack
            });
        }
    }
    
    static getLookup() {
        return [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                }
            },  {
                $lookup: {
                    from: 'questions',
                    localField: 'questions',
                    foreignField: '_id',
                    as: 'questions',
                }
            }, {
                $unwind: '$user'
            }, {
                $unwind: '$questions'
            }, {
                $lookup: {
                    from: 'categories',
                    localField: 'questions.category',
                    foreignField: '_id',
                    as: 'questions.category',
                }
            }, {
                $group: {
                    _id: '$_id',
                    title: { $first :'$title' },
                    description: { $first :'$description' },
                    username: { $first :'$user.username' },
                    questions: { $push: '$questions'},
                    likes: {$first: '$likes'}
                }
            },
        ];
    }
}

module.exports = Controller;


