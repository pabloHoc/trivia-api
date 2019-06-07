const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections'),
    ObjectId = require('mongodb').ObjectId,
    eventEmitter = require('./../emitter'),
    EVENTS = require('../events');

/**
* @apiDefine ChallengeResult
* @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
* @apiSuccess (200 (OK)) {Object} challenge Información sobre el desafío
* @apiSuccess (200 (OK)) {String} challenge._id Id del desafío
* @apiSuccess (200 (OK)) {String} challenge.title Título del desafío
* @apiSuccess (200 (OK)) {String} challenge.description Descripción del desafío
* @apiSuccess (200 (OK)) {String} challenge.username Usuarix creadorx del desafío
* @apiSuccess (200 (OK)) {Object[10]} challenge.questions Preguntas del desafío
* @apiSuccess (200 (OK)) {Object} challenge.questions.question Datos de la pregunta
* @apiSuccess (200 (OK)) {String} challenge.questions.question._id Id de la preguntada agregada
* @apiSuccess (200 (OK)) {String} challenge.questions.question.title Enunciado de la pregunta
* @apiSuccess (200 (OK)) {String} challenge.questions.question.answer Respuesta correcta
* @apiSuccess (200 (OK)) {String[4]} challenge.questions.question.answers Lista de las cuatro respuestas posibles
* @apiSuccess (200 (OK)) {Object} challenge.questions.question.category Categoría a la que pertenece la pregunta
* @apiSuccess (200 (OK)) {String} challenge.questions.question.category.name Nombre de la categoría
* @apiSuccess (200 (OK)) {String} challenge.questions.question.category.color Color opcional asignado a la categoría
* @apiSuccessExample {type} Success-Response:
* {
*    "success": true,
*    "challenge": {
*       "_id": "5cef1a27a9139458f02b1cbd",
*       "title": "Por qué razón se conoce a...?",
*       "description": "Adiviná por qué son famosas históricamente estas personas",
*       "username": "pablo",
*       "questions": [{
*           "_id": "5cef1a27asdfsdf8f02b1cbd",
*           "title": "Por qué razón es conocida Ada Lovelace?",
*           "answer": "Ser la primera programadora",
*           "answers": [
*               "Descubrir un dinosaurio",
*               "Ser la primera programadora",
*               "Jugar muy bien al tenis"
*               "Construir la muralla china"
*           ],
*           "category": {
*             "name": "historia",
*              "color": "#F8F8F8"
*           }		
*       }
*        // +9 questions
*    ]     
* }
*/
/**
* @apiDefine ChallengesResults
* @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
* @apiSuccess (200 (OK)) {Object[]} challenges Listado de desafíps
* @apiSuccess (200 (OK)) {String} challenges._id Id del desafío
* @apiSuccess (200 (OK)) {String} challenges.title Título del desafío
* @apiSuccess (200 (OK)) {String} challenges.description Descripción del desafío
* @apiSuccess (200 (OK)) {String} challenges.likes Likes del desafío
* @apiSuccessExample {type} Success-Response:
* {
*    "success": true,
*    "challenges": [
*        {
*            "_id": "5cef1a27a9139458f02b1cbd",
*            "title": "Nombre del desafío 1",
*            "description": "Descripción del desafío 1",
*            "likes": 45
*        },
*        {
*            "_id": "5cef1a83a9139458f02b1cbe",
*            "title": "Nombre del desafío 2",
*            "description": "Descripción del desafío 2",
*            "likes": 21
*        },
*        {
*            "_id": "5cf0373f16f8a9544c8ad7a1",
*            "title": "Nombre del desafío 3",
*            "description": "Descripción del desafío 3",
*            "likes": 23
*        }
*    ]
*}
*/

class Controller {
    /**
    * @api {post} /v1/challenges/ Agregar desafio
    * @apiName addChallenge
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Agrega un desafío
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges", {
    *          headers: {
    *              "Accept": "application/json",
    *              "Content-Type": "application/json; charset=UTF-8"
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "post",
    *          body: JSON.stringify({
    *                title: "De curiosidades y anécdotas",
    *                description: "Poné a prueba tu conocimiento inútil o aprendé algo inservible!",
    *                questions: [
    *                        "5cef009125363837987fd841",
    *                        "5cef00912asfas3837987841",
    *                        "5cef00912523423837987f41",
    *                        "5cef00912242343837987d41",
    *                        "5cef009234234g34597fd841",
    *                        "5cef234fddsfsfs383797841",
    *                        "5cef0032423dfs2383787f41",
    *                        "5cef00912124124ffsd87d41",
    *                        "546dfgdf2124124ffsd87d41",
    *                        "5cef00912124124ffsd87d41",
    *                    ],
    *            })
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String} title Enunciado del desafío
    * @apiParam  {String} description Descripción del desafío
    * @apiParam  {String[10]} questions Lista de los ids de las diez preguntas
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "message": "Desafío añadido con éxito"
    * }
    */
    static async add(req, res) {
        try {
            let { username, title, description, questions } = req.body;

            let collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.findOne({ username: username });
            
            if (!user) 
                throw new Error('Usuarix no encontradx');

            questions = questions.map(id => { return ObjectId(id) })

            collection = await db.getCollection(COLLECTIONS.CHALLENGES);
            await collection.insertOne({
                user: user,
                title: title,
                description: description,
                questions: questions,
                likes: 0,
                plays: 0, // Ver esto aca
                date: new Date(Date.now()).toISOString()
            });

            collection = await db.getCollection(COLLECTIONS.USERS);
            const followers = await collection.find({ following: user.username }).toArray();

            followers.map(x => eventEmitter.emit(EVENTS.NEW_CHALLENGE, {
                username: x.username,
                payload: user.username,
                extra: title
            }));

            res.status(200).send({
                success: true,
                message: 'Desafío agregado con éxito'
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al agregar desafío',
                error: error.message,
                trace: error.stack
            });
        }
    }
    /**
    * @api {get} /v1/challenges/:id/ Obtener desafio por id
    * @apiName getChallengeById
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene la información de un desafío dado un id
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/5ceefe4439bc8a4438d37426", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "get",
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String} id Id del desafío
    * @apiUse ChallengeResult
    */    
   static async get(req, res) {
        const { id } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);

            const aggregation = Controller.getLookup();
            aggregation.unshift({ $match: { _id: ObjectId(id) } })

            const result = await collection.aggregate(aggregation).toArray();

            if (!result.length) 
                throw new Error('Desafío no existente');

            res.status(200).send({
                success: true,
                challenge: result[0]
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener desafíos',
                error: error,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/challenges/random Obtener desafio random
    * @apiName getRandomChallenge
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene un desafío aleatorio
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/random", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "get",
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiUse ChallengeResult
    */  
    static async getRandom(req, res) {
        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);

            const aggregation = Controller.getLookup();
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
                    message: 'Desafío no existente'
                });
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
                error: error,
                trace: error.stack
            });
        }
    }
    /**
    * @api {get} /v1/challenges/all/:sort?/:page? Obtener todos los desafios
    * @apiName getAllChallenges
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene un listado de todos los desafíos
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/all/top", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "get",
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam {string="top","new"} [sort="top"] Orden en el que vienen los desafíos (por puntos o novedad)
    * @apiParam {Number} [page=0] Número de página del listado (10 desafíos por página)
    * @apiUse ChallengeResult
    */  
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
                message: 'Error al obtener preguntas',
                error: error,
                trace: error.stack
            });
        }
    }
    /**
    * @api {get} /v1/challenges/byusername/:username/:sort?/:page? Obtener desafios por usuarix
    * @apiName getChallengesByUser
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene un listado de todos los desafíos de unx usuarix
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/all/top", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "get",
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam {String} username Nombre de usuarix
    * @apiParam {string="top","new"} [sort="top"] Orden en el que vienen los desafíos (por puntos o novedad)
    * @apiParam {Number} [page=0] Número de página del listado (10 desafíos por página)
    * @apiUse ChallengeResult
    * 
    */      
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
            const user = await collection.findOne({ username: username });

            if (!user) 
                throw new Error('Usuarix no encontradx');

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
                message: 'Error al obtener desafíos',
                error: error.message,
                trace: error.stack
            });
        }
    }
    /**
    * @api {get} /v1/challenges/search/:query/:page? Buscar desafios
    * @apiName searchChallenges
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Busca desafíos que tengan un texto en su título
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/search/ciencia", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "get",
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam {String} query El texto que se desea buscar
    * @apiParam {Number} [page=0] Número de página del listado (10 desafíos por página)
    * @apiUse ChallengeResult
    * 
    */      
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
                challenges: result
            });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener desafíos',
                message: error.message,
                trace: error.stack
            });
        }
    }
    /**
    * @api {post} /v1/challenges/upvote/:id? Dar like a desafío
    * @apiName upvoteChallenge
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Le suma un like al desafío
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/like/5cf2ffc54005a8207052616b/", {
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
    * @apiParam  {String} id Id del desafío que se quiere likear
    * @apiSuccess (200 (OK)) {Boolean} result Resultado de la operación
    * @apiSuccessExample {type} Success-Response:
    * {
    *     "success": "true",
    * }
    */
    static upvote(req, res) {
        Controller.vote(req, res, true);
    }

    /**
    * @api {post} /v1/challenges/downvote/:id? Dar dislike a desafío
    * @apiName downvoteChallenge
    * @apiGroup Desafios
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Le suma un dislike al desafío
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/challenges/downvote/5cf2ffc54005a8207052616b/", {
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
    * @apiParam  {String} id Id del desafío que se quiere likear
    * @apiSuccess (200 (OK)) {Boolean} result Resultado de la operación
    * @apiSuccessExample {type} Success-Response:
    * {
    *     "success": "true",
    * }
    */
    static downvote(req, res) {
        Controller.vote(req, res, false);
    }

    static async vote(req, res, liked) {
        const { id } = req.params;
        const inc = liked ? { likes: 1 } : { dislikes: 1 }

        try {
            const collection = await db.getCollection(COLLECTIONS.CHALLENGES);
            
            await collection.updateOne({ _id: ObjectId(id) }, { $inc: inc });

            res.status(200).send({
                success: true
            });

        } catch(error) {
            res.status(400).send({
                success: false,
                message: 'Error al votar pregunta',
                message: error.message,
                trace: error.stack
            });
        }
    }
    
    static getLookup() {
        return [
            { $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            }},  
            { $lookup: {
                from: 'questions',
                localField: 'questions',
                foreignField: '_id',
                as: 'questions',
            }}, 
            { $unwind: '$user' }, 
            { $unwind: '$questions' }, 
            { $lookup: {
                from: 'categories',
                localField: 'questions.category',
                foreignField: '_id',
                as: 'questions.category',
            }}, 
            { $group: {
                _id: '$_id',
                title: { $first :'$title' },
                description: { $first :'$description' },
                username: { $first :'$user.username' },
                questions: { $push: {
                        _id: '$questions._id',
                        title: '$questions.title',
                        answer: '$questions.answer',
                        answers: '$questions.answers',
                        category: {
                            name: { $arrayElemAt: ['$questions.category.name', 0] },
                            color: { $arrayElemAt: ['$questions.category.color', 0] }
                        }                            
                }},
                likes: {$first: '$likes'}
            }}
        ];
    }
}

module.exports = Controller;


