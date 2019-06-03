const db = require('./../../db/db');
const COLLECTIONS = require('./../../db/collections');
const ObjectId = require('mongodb').ObjectId;

/**
 * TODO:
 *  * agregar metodo votacion
 *  * chequear los sort
 *  * agregar metodo busqueda
 */

class Controller {
    static async add(req, res) {
        try {
            let user;
            let { username, question, answer, answers, category } = req.body;
            
            /** 
             *  TODO: esto se podría mejorar buscando categoria
             *  y usuario en simultaneo, ya que no necesita hacerse uno tras otro
             */

            const findCategory = (category) => { return new Promise(async (resolve, reject) => {
                let collection = await db.getCollection(COLLECTIONS.CATEGORIES);
                category = await collection.findOne({ name: category });

                if (category)
                    resolve(category);
                else
                    reject(new Error('Categoría no encontrada'));                    
                })
            };    

            const findUser = (username) => { return new Promise(async (resolve, reject) => {
                let collection = await db.getCollection(COLLECTIONS.USERS);
                let user = await collection.findOne({ username: username });
                
                if (user)
                    resolve(user);
                else
                    reject(new Error('Usuarix no encontradx'));                    
                })
            };                

            [user, category] = await Promise.all([findUser(username), findCategory(category)]);

            if (!user)
                throw new Error("Usuarix inexistente");    
                
            if (!category)
                throw new Error("Categoria inexistente");                

            let collection = await db.getCollection(COLLECTIONS.QUESTIONS);

            let result = await collection.insertOne({
                user: user._id,
                question: question,
                answer: answer,
                answers: answers,
                category: category._id,
                likes: 0,
                date: new Date(Date.now()).toISOString()
            });

            res.status(200).send({
                success: true,
                message: "Pregunta añadida con éxito",
                question_id: result.insertedId
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }
    // /questions/find/:id
    static async get(req, res) {
        const { id } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            
            let aggregation = Controller.getLookup();
            aggregation.unshift({
                $match: {
                    _id: ObjectId(id)
                }
            }) 
            
            const result = await collection
                                    .aggregate(aggregation)
                                    .limit(1)
                                    .toArray();

            if (result) {
                res.status(200).send({
                    success: true,
                    question: result
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Pregunta no existente"
                });

            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static async getRandom(req, res) {
        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            
            let aggregation = Controller.getLookup();
            aggregation.unshift({
                $sample: {
                    size: 10
                }
            }) 

            let results = await collection
                                .aggregate(aggregation)
                                .toArray();
            console.log(results);

            results = await Controller.normalizeRandom(results, collection, aggregation);

            res.status(200).send({
                success: true,
                questions: results
            });

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static async getRandomByCategory(req, res) {
        let { category } = req.params;

        try {
            let collection = await db.getCollection(COLLECTIONS.CATEGORIES);
            category = await collection.findOne({ name: category });

            if (!category)
                throw new Error('Categoría no encontrada');

            collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            
            let questions = await collection.find({ category: category._id }).toArray();
            
            if (questions.length < 10)
                throw new Error('No hay suficientes preguntas en dicha categoría');

            let aggregation = Controller.getLookup();
            aggregation.unshift({
                    $sample: {
                        size: 10
                    }
                }, {
                $match: {
                    category: category._id
                }
            }); 

            let results = await collection
                                .aggregate(aggregation)
                                .toArray();
            console.log(results);

            results = await Controller.normalizeRandom(results, collection, aggregation);

            res.status(200).send({
                success: true,
                questions: results
            });

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static async normalizeRandom(results, collection, aggregation) {
        if (!results)
            return;
        
        let ids = results.map(r => { return r._id.toString() });            

        while(results.length !== 10) {
            if (results.length < 10) {
                aggregation.push({
                    $limit: 1
                });
                const result = await collection
                                        .aggregate(aggregation)
                                        .toArray();
                console.log(ids, result[0]._id.toString(), ids.includes(result[0]._id.toString()));                                        
                if (!ids.includes(result[0]._id.toString())) {
                    results.push(result[0]);
                    ids.push(result[0]._id.toString());
                }                                      
            } else if (results.length > 10) {
                results.pop();
            }
        }
        return results;
    }

    // /questions/:sort/:page
    // /questions/top/3
    static async getAll(req, res) {
        let { sort, page = 0 } = req.params;

        switch (sort) {
            case 'top':
                sort = { likes: 1 }
                break;
            case 'new':
                sort = { date: -1 }
                break;               
            default:
                sort = { likes: 1 }
        }

        let aggregation = Controller.getLookup();
        aggregation.push({$sort: sort}, { $skip: page * 10 }, { $limit: 10 });

        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            const result = await collection
                                    .aggregate(aggregation)
                                    .toArray();

            res.status(200).send({
                success: true,
                questions: result
            });

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static async search(req, res) {
        const { query, page = 0 } = req.params;
        
        let aggregation = Controller.getLookup();
        aggregation.unshift({ $match: { question: {'$regex' : query, $options: 'i' }}});
        aggregation.push({ $skip: page * 10 }, { $limit: 10 });

        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            const result = await collection
                                    .aggregate(aggregation)
                                    .toArray();

            res.status(200).send({
                success: true,
                questions: result
            });

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static async getAllByCategory(req, res) {
        let { category, sort, page = 0 } = req.params;

        switch (sort) {
            case 'top':
                sort = { likes: 1 }
                break;
            case 'new':
                sort = { date: 1 }
                break;
            default:
                sort = { likes: 1 }
        }

        try {
            let collection = await db.getCollection(COLLECTIONS.CATEGORIES);
            category = await collection.findOne({ name: category });

            if (!category)
                throw new Error("Categoria inexistente");

            collection = await db.getCollection(COLLECTIONS.QUESTIONS);

            const aggregation = Controller.getLookup();
            aggregation.unshift({ 
                $match: {
                    category: category._id
                }
            });
            aggregation.push({$sort: sort}, { $skip: page * 10 }, { $limit: 10 });

            let result = await collection
                                .aggregate(aggregation)
                                .toArray();

            res.status(200).send({
                success: true,
                questions: result
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }
    // /questions/byuser/:username/:sort/:page
    // /questions/byuser/pabloH/top/1
    static async getByUsername(req, res) {
        let { username, sort, page = 0 } = req.params;

        switch (sort) {
            case 'top':
                sort = { likes: 1 }
                break;
            case 'new':
                sort = { date: 1 }
                break;
            default:
                sort = { likes: 1 }
        }

        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            let user = await collection.findOne({ username: username });

            if (!user)
                throw new Error("Usuarix inexistente");

            const aggregation = Controller.getLookup();
            aggregation.unshift({
                $match: {
                    user: user._id
                }
            });
            aggregation.push({$sort: sort}, { $skip: page * 10 }, { $limit: 10 });

            collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            let result = await collection
                                .aggregate(
                                    aggregation
                                )                
                                .sort(sort)
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
                message: "Error al obtener preguntas",
                message: error.message,
                trace: error.stack
            });
        }
    }

    static getLookup() {
        return [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                }
            }, 
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                }
            }, 
            {
                $unwind: '$category'
            },
            {
                $unwind: '$user'
            },
            { 
                $group: {
                    _id: '$_id',
                    username: {$first: '$user.username'},
                    question: {$first: '$question'},
                    date: {$first: '$date'},
                    answer: {$first: '$answer'},
                    answers: {$first: '$answers'},
                    category: { 
                        $first: {
                            name: '$category.name',
                            color: '$category.color'  
                        } 
                    }
                }                        
            }
        ];
    }
}

module.exports = Controller;
