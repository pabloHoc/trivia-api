const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections'),
    ObjectId = require('mongodb').ObjectId;

/**
* @apiDefine QuestionsResponse
* @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
* @apiSuccess (200 (OK)) {Object[]} questions Listado de preguntas aleatorias
* @apiSuccess (200 (OK)) {Object} questions.question Datos de la pregunta
* @apiSuccess (200 (OK)) {String} questions.question._id Id de la preguntada agregada
* @apiSuccess (200 (OK)) {String} questions.question.title Enunciado de la pregunta
* @apiSuccess (200 (OK)) {String} questions.question.answer Respuesta correcta
* @apiSuccess (200 (OK)) {String[4]} questions.question.answers Lista de las cuatro respuestas posibles
* @apiSuccess (200 (OK)) {Object} questions.question.category Categoría a la que pertenece la pregunta
* @apiSuccess (200 (OK)) {String} questions.question.category.name Nombre de la categoría
* @apiSuccess (200 (OK)) {String} questions.question.category.color Color opcional asignado a la categoría
* @apiSuccessExample {type} Success-Response:
* {
*    "success": true,
*    "questions": [{
*       "title": "Por qué razón es conocida Ada Lovelace?",
*       "answer": "Ser la primera programadora",
*       "answers": [
*           "Descubrir un dinosaurio",
*           "Ser la primera programadora",
*           "Jugar muy bien al tenis"
*           "Construir la muralla china"
*       ],
*       "category": {
*           "name": "historia",
*           "color": "#F8F8F8"
*       }		
*    }
*    // +9 questions
*    ]     
* }
*/

class Controller {
    /**
    * @api {post} /v1/questions/ Agregar pregunta
    * @apiName addQuestion
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Agrega una pregunta
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions", {
    *          headers: {
    *              "Accept": "application/json",
    *              "Content-Type": "application/json;  charset=UTF-8"
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "post",
    *          body: JSON.stringify({
    *                title: "Por qué razón es conocida Ada Lovelace?",
    *                answer: "Ser la primera programadora",
    *                answers: [
    *                        "Descubrir un dinosaurio",
    *                        "Ser la primera programadora",
    *                        "Jugar muy bien al tenis"
    *                        "Construir la muralla china"
    *                    ],
    *                "category": "historia"		
    *            })
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String} title Enunciado de la pregunta
    * @apiParam  {String} answer Respuesta correcta
    * @apiParam  {String[4]} answers Lista de las cuatro respuestas posibles
    * @apiParam  {String} category Nombre de la categoría a la que pertenece la pregunta
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    * @apiSuccess (200 (OK)) {String} question_id Id de la preguntada agregada
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "users": {
    *        "success": "true",
    *        "message": "Pregunta añadida con éxito",
    *        "question_id": "5ceefe4439bc8a4438d37426"
    *    }     
    * }
    */
    static async add(req, res) {
        try {
            let user;
            let { username, title, answer, answers, category } = req.body;
            
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
                throw new Error('Usuarix inexistente');    
                
            if (!category)
                throw new Error('Categoría inexistente');                

            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);

            const result = await collection.insertOne({
                user: user._id,
                title: title,
                answer: answer,
                answers: answers,
                category: category._id,
                likes: 0,
                dislikes: 0,
                date: new Date(Date.now()).toISOString()
            });

            res.status(200).send({
                success: true,
                message: 'Pregunta añadida con éxito',
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

    /**
    * @api {get} /v1/questions/:id/ Obtener pregunta por id
    * @apiName getQuestionById
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene la información de una pregunta dado un id
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/5ceefe4439bc8a4438d37426", {
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
    * @apiParam  {String} id Id de la pregunta
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    * @apiSuccess (200 (OK)) {Object} question Pregunta correspondiente al id buscado
    * @apiSuccess (200 (OK)) {String} question._id Id de la preguntada
    * @apiSuccess (200 (OK)) {String} question.title Enunciado de la pregunta
    * @apiSuccess (200 (OK)) {String} question.answer Respuesta correcta
    * @apiSuccess (200 (OK)) {String[4]} question.answers Lista de las cuatro respuestas posibles
    * @apiSuccess (200 (OK)) {Object} question.category Categoría a la que pertenece la pregunta
    * @apiSuccess (200 (OK)) {String} question.category.name Nombre de la categoría
    * @apiSuccess (200 (OK)) {String} question.category.color Color opcional asignado a la categoría
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "question": {
    *       "_id": "5cf2ffc24005a8207052616a",
    *       "title": "Por qué razón es conocida Ada Lovelace?",
    *       "answer": "Ser la primera programadora",
    *       "answers": [
    *           "Descubrir un dinosaurio",
    *           "Ser la primera programadora",
    *           "Jugar muy bien al tenis",
    *           "Construir la muralla china"
    *       ],
    *      "category": {
    *           "name": "historia",
    *           "color": "#F8F8F8"
    *       }		
    *    }     
    * }
    */
    static async get(req, res) {
        const { id } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            
            const aggregation = Controller.getLookup();
            aggregation.unshift({ $match: { _id: ObjectId(id) } }) 
            
            const result = await collection
                                    .aggregate(aggregation)
                                    .limit(1)
                                    .toArray();

            if (!result.length) 
                throw new Error("Pregunta no existente");

            res.status(200).send({
                success: true,
                question: result[0]
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener pregunta',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/random/ Obtener preguntas aleatorias
    * @apiName getRandom
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene 10 preguntas aleatorias
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/random", {
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
    * 
    * @apiUse QuestionsResponse
    *
    */
    static async getRandom(req, res) {
        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            
            const aggregation = Controller.getLookup();
            aggregation.unshift({ $sample: {size: 10} }) 

            let results = await collection
                                .aggregate(aggregation)
                                .toArray();

            results = await Controller.normalizeRandom(results, collection, aggregation);

            res.status(200).send({
                success: true,
                questions: results
            });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/random/:category Obtener preguntas aleatorias por categoría
    * @apiName getRandomByCategory
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene 10 preguntas aleatorias de una categoría
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/random/historia", {
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
    * @apiParam  {String} category Nombre de la categoría
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiUse QuestionsResponse
    * 
    */
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
            aggregation.unshift({ $sample: { size: 10 } }, { $match: { category: category._id } }); 

            let results = await collection
                                .aggregate(aggregation)
                                .toArray();

            results = await Controller.normalizeRandom(results, collection, aggregation);

            res.status(200).send({
                success: true,
                questions: results
            });

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
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
                aggregation.push({ $limit: 1 });
                const result = await collection
                                        .aggregate(aggregation)
                                        .toArray();

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

    /**
    * @api {post} /v1/questions/answer Responder preguntas
    * @apiName answer
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Suma las preguntas respondidas al puntaje total de lx usuarix
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/answer", {
    *          headers: {
    *              "Accept": "application/json",
    *              "Content-Type": "application/json;  charset=UTF-8"
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "post",
    *          body: JSON.stringify({
    *               questions: [
    *                   "5cf2ffc04005a82070526169",
    *                   "5cf2ffc54005a8207052616b",
    *                   "5cf2ffd34005a8207052616f"
    *                   "5cf2ffd74005a82070526170"
    *               ],
    *            })
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String[]} questions Ids de preguntas respondidas
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    *
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "message": "Preguntas respondidas"
    * }
    */

    // ! NO TIENE VALIDACION POR SERVIDOR

   static async answerMany(req, res) {
        const { username, questions } = req.body;

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.findOne({ username: username });
            
            if (!user)
                throw new Error('Usuarix inexistente');    
                
            const mapedIds = questions.map(x => { return ObjectId(x) });    

            await collection.update({ username: username }, {
                $addToSet: { answered: { $each: mapedIds }}
            });

            res.status(200).send({
                success: true,
                message: 'Respuestas respondidas'
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al responder preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }


    static async answer(req, res) {
        const { username, answer } = req.body;

        try {
            const findQuestion = (id) => { return new Promise(async (resolve, reject) => {
                const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
                const question = await collection.findOne({ _id: ObjectId(id) });

                if (question)
                    resolve(question);
                else
                    reject(new Error('Pregunta no encontrada'));                    
                })
            };    

            const findUser = (username) => { return new Promise(async (resolve, reject) => {
                const collection = await db.getCollection(COLLECTIONS.USERS);
                const user = await collection.findOne({ username: username });
              
                if (user)
                    resolve(user);
                else
                    reject(new Error('Usuarix no encontradx'));                    
                })
            };                

            const [user, question] = await Promise.all([findUser(username), findQuestion(id)]);

            if (!user)
                throw new Error('Usuarix inexistente');    
                
            if (!question)
                throw new Error('Pregunta inexistente');   

            if (question.answer !== answer) {
                res.status(200).send({
                    success: true,
                    answered: false,
                    message: 'Respuesta incorrecta'
                });
            } else {
                const collection = await db.getCollection(COLLECTIONS.USERS);
                await collection.update({ username: username }, {
                    $addToSet: { answered: question._id }
                });

                res.status(200).send({
                    success: true,
                    answered: true,
                    message: 'Respuesta correcta'
                });
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/search/:query Buscar preguntas
    * @apiName search
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Busca preguntas por texto en título
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/search/ada", {
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
    * @apiParam  {String} category Nombre de la categoría
    * @apiParam  {Number} [page=0] Número de página (10 preguntas por página)
    * @apiUse QuestionsResponse
    * 
    */
    static async search(req, res) {
        const { query, page = 0 } = req.params;
        
        const aggregation = Controller.getLookup();
        aggregation.unshift({ $match: { title: {'$regex' : query, $options: 'i' }}});
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
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/bycategory/:category/:sort?/:page? Obtener preguntas por categoría
    * @apiName getAllByCategory
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene el listado de preguntas de cierta categoría
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/bycategory/historia/new", {
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
    * @apiParam  {String} category Nombre de la categoría
    * @apiParam  {string="top","new"} [sort="top"]  Orden de las preguntas (por puntaje o novedad)
    * @apiParam  {Number} [page=0] Número de página (10 preguntas por página)
    * @apiUse QuestionsResponse
    * 
    */
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
                throw new Error('Categoria inexistente');

            collection = await db.getCollection(COLLECTIONS.QUESTIONS);

            const aggregation = Controller.getLookup();
            aggregation.unshift({ $match: { category: category._id } });
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
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/all Obtener preguntas
    * @apiName getAll
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene el listado de todas las preguntas
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/all", {
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
    * @apiParam  {string="top","new"} [sort="top"] Orden de las preguntas (por puntaje o novedad)
    * @apiParam  {Number} [page=0] Número de página (10 preguntas por página)
    * @apiUse QuestionsResponse
    */
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

        const aggregation = Controller.getLookup();
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
            res.status(400).send({
                success: false,
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/questions/byuser/:username/:sort?/:page? Obtener preguntas por usuarix
    * @apiName getAll
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene el listado de todas las preguntas de unx usuarix
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/byuser/ada/top/", {
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
    * @apiParam  {String} username Nombre de usuarix
    * @apiParam  {string="top","new"} [sort="top"] Orden de las preguntas (por puntaje o novedad)
    * @apiParam  {Number} [page=0] Número de página (10 preguntas por página)
    * @apiUse QuestionsResponse
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
            default:
                sort = { likes: 1 }
        }

        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            let user = await collection.findOne({ username: username });

            if (!user)
                throw new Error('Usuarix inexistente');

            const aggregation = Controller.getLookup();
            aggregation.unshift({ $match: { user: user._id } });
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
                message: 'Error al obtener preguntas',
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {post} /v1/questions/upvote/:id? Dar like a pregunta
    * @apiName upvote
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Le suma un like a la pregunta
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/upvote/5cf2ffc54005a8207052616b", {
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
    * @apiParam  {String} id Id de la pregunta que se quiere likear
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
    * @api {post} /v1/questions/downvote/:id? Dar dislike a pregunta
    * @apiName downvote
    * @apiGroup Preguntas
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Le suma un dislike a la pregunta
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/questions/downvote/5cf2ffc54005a8207052616b/", {
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
    * @apiParam  {String} id Id de la pregunta que se quiere dislikear
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
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
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
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            }}, 
            { $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            }}, 
            { $unwind: '$category' },
            { $unwind: '$user' },
            { $group: {
                _id: {
                    id: '$_id',
                    username: '$user.username',
                    title: '$title',
                    date: '$date',
                    answer: '$answer',
                    answers: '$answers',
                    category: { 
                            name: '$category.name',
                            color: '$category.color'  
                        } 
                    }
                }
            },
            { $project: {
                _id: '$_id.id',
                title: '$_id.title',
                answer: '$_id.answer',
                answers: '$_id.answers',
                category: '$_id.category'
            }}
        ];
    }
}

module.exports = Controller;
