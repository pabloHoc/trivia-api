const 
    jwt = require('jsonwebtoken'),
    { secret } = require('./../../configs/config'),
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections'),
    bcrypt = require('bcrypt'),
    eventEmitter = require('./../notifications/emitter'),
    EVENTS = require('./../notifications/events');

class Controller {
    
    static async getUser(username) {
        try {
            const collection = await db.getCollection(COLLECTIONS.USERS)
            const userFound = await collection.findOne({ username: username });
            return userFound;
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * @api {post} /v1/users/signin Registrar usuarix
     * @apiName signinuser
     * @apiGroup Usuarixs
     * @apiVersion  1.0.0
     * @apiDescription Registra unx usuarix que no se encuentre registradx ya en la base
     * de datos
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/users/signin", {
     *          headers: {
     *              "Accept": "application/json",
     *              "Content-Type": "application/json;  charset=UTF-8"
     *          },
     *          method: "post",
     *          body: JSON.stringify({
     *              username: "ada",
     *              password: "adaitw"
     *          })  
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {String} username Nombre de usuarix
     * @apiParam  {String} password Contraseña
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     "username": "ada",
     *     "password": "adaitw"
     * }
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     "success": "true",
     *     "message": "Usuarix creadx exitosamente" 
     * }
     */
    static async signIn(req, res) {
        const { username, password } = req.body;

        try {
            const user = await Controller.getUser(username);

            if (user) 
                throw new Error('Nombre de usuarix ya se encuentra en uso');

            const collection = await db.getCollection(COLLECTIONS.USERS);
            const hash = await bcrypt.hash(password, 10);

            collection.insertOne({
                username: username,
                password: hash
            });

            return res.status(200).send({
                success: true,
                message: 'Usuarix creadx exitosamente'
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
     * @api {post} /v1/users/login Loguear usuarix
     * @apiName loginuser
     * @apiGroup Usuarixs
     * @apiVersion  1.0.0
     * @apiDescription Loguea unx usuarix registradx y devuelve el token de autenticación
     * si los datos ingresados son correctos
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/users/login", {
     *          headers: {
     *              "Accept": "application/json",
     *              "Content-Type": "application/json;  charset=UTF-8"
     *          },
     *          method: "post",
     *          body: JSON.stringify({
     *              username: "ada",
     *              password: "adaitw"
     *          })  
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {String} username Nombre de usuarix
     * @apiParam  {String} password Contraseña
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     "username": "ada",
     *     "password": "adaitw"
     * }
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
     * @apiSuccess (200 (OK)) {String} token Token de autenticación
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     "success": "true",
     *     "message": "Login exitoso",
     *     "token": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
     * }
     */
    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await Controller.getUser(username);

            if (!user) 
                throw new Error('Usuarix o contraseña incorrectos');
    
            const match = await bcrypt.compare(password, user.password);
    
            if (match) {
                const token = jwt.sign(
                    { username: username },
                    secret
                )
        
                return res.status(200).send({
                    success: true,
                    message: 'Login exitoso',
                    token: token
                });
            } else {
                throw new Error('Usuarix o contraseña incorrectos');
            }
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }

    /**
    * @api {get} /v1/users/:username Obtener perfil
    * @apiName getByUsername
    * @apiGroup Usuarixs
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene la información del perfil de usuarix que se le pasa por parámetro
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/users/ada", {
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
    * @apiParam  {String} username Nombre de usuarix del perfil que se desea obtener
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {Object} user Info de perfil de usuarix
    * @apiSuccess (200 (OK)) {String} user._id Id de usuarix
    * @apiSuccess (200 (OK)) {String} user.username Nombre de usuarix
    * @apiSuccess (200 (OK)) {Number} user.answered Puntaje de usuarix (cantidad de preguntas respondidas)
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "user": {
    *        "_id": "5ceefe4439bc8a4438d37426",
    *        "username": "ada",
    *        "answered": 234
    *    }     
    * }
    */
    static async getByUsername(req, res) {
        const { username } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const [ user ] = await collection.aggregate([
                    { $match: { username: username }},
                    { $project: { 
                        username: 1,
                        answered: { $cond: { if: { $isArray: '$answered' }, then: { $size: '$answered' }, else: 0} }
                    }}]).toArray()

            if (!user) 
                throw new Error('Usuarix inexistente');
    
            return res.status(200).send({
                success: true,
                user: user
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
    * @api {get} /v1/users/all/:filter?/:page? Obtener rankings de usuarixs
    * @apiName getAll
    * @apiGroup Usuarixs
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene una lista con todxs lxs usuarixs, ya sea por puntaje total
    * o por puntaje por categorías
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/users/all/historia", {
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
    * @apiParam  {String} [filter="answers"] Filtro con el que se desea realizar la búsqueda, puede
    * ser "answers" para puntaje total, o cualquier nombre de una categoría existente
    * @apiParam  {Number} [page=0] Número de la página de búsqueda, trae 10 resultados por página
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {Object[]} users Listado de usuarixs
    * @apiSuccess (200 (OK)) {String} user._id Id de usuarix
    * @apiSuccess (200 (OK)) {String} user.username Nombre de usuarix
    * @apiSuccess (200 (OK)) {Number} user.answered Puntaje de usuarix (cantidad de preguntas respondidas)
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "users": [{
    *        "_id": "5ceefe4439bc8a4438d37426",
    *        "username": "ada",
    *        "answered": 234
    *    }, {
    *        "_id": "5ceefg3455538a4438d37426",
    *        "username": "random_citizen",
    *        "answered": 122
    *    }]     
    * }
    */
    static async getAll(req, res) {
        const { sort = 'answers', page = 0 } = req.params;
        const aggregation = []
        
        switch (sort) {
            case 'answers':
                aggregation.push({ 
                    $project: { 
                        username: 1,
                        answered: { $cond: { if: { $isArray: '$answered' }, then: { $size: '$answered' }, else: 0} }
                    } 
                });
                break;
            default:
                aggregation.push(
                    { $unwind: '$answered' }, 
                    { $lookup: {
                        from: 'questions',
                        localField: 'answered',
                        foreignField: '_id',
                        as: 'answered',
                    }}, 
                    { $unwind: '$answered' }, 
                    { $lookup: {
                        from: 'categories',
                        localField: 'answered.category',
                        foreignField: '_id',
                        as: 'category',
                    }}, 
                    { $match: { 'category.name': sort }}, 
                    { $unwind: '$category' }, 
                    { $group: {
                        _id: '$_id',
                        username: {$first: '$username'},
                        answered: { $sum : 1 },
                    }                        
                });
                break;
        }

        aggregation.push({ $sort: { answered: -1 } });
        aggregation.push({ $skip: page * 10 }, { $limit: 10 });

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.aggregate(aggregation).toArray();
    
            return res.status(200).send({
                success: true,
                users: user
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
    * @api {post} /v1/users/follow/:username Seguir a usuarixs
    * @apiName follow
    * @apiGroup Usuarixs
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Comenzar a seguir a unx usuarix para que nos lleguen notificaciones cuando suba un nuevo
    * desafío
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/users/follow/ada", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "post"
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String} username Usuarix que vamos a seguir
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "message": "Has comenzado a seguir a ada"
    *    }     
    * }
    */
    static async follow(req, res) {
        const { username } = req.body;
        const { following } = req.params;

        try {
            if (username === following) 
                throw new Error('No puedes seguirte a ti mismo!')

            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.updateOne(
                { username: username }, 
                { $addToSet: { following: following }
            });

            if (!user) 
                throw new Error('Usuarix inexistente');

            eventEmitter.emit(EVENTS.NEW_FOLLOWER, { username: following, payload: username });    
    
            return res.status(200).send({
                success: true,
                message: `Has comenzado a seguir a ${following}`
            });

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

    /**
    * @api {post} /v1/users/unfollow/:username Dejar de seguir a usuarixs
    * @apiName unfollow
    * @apiGroup Usuarixs
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Deja de seguir a unx usuarix
    * @apiExample {js} Ejemplo de uso:
    *     fetch("https://preguntadas.herokuapp.com/v1/users/unfollow/ada", {
    *          headers: {
    *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
    *          },
    *          method: "post"
    *     }).then(function(result) {
    *          return result.json();
    *     }).then(function(result) {
    *     
    *     }).catch(function(error) {
    *     
    *     });
    * @apiParam  {String} username Usuarix que vamos a dejar de seguir
    * 
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    *   
    * @apiSuccessExample {type} Success-Response:
    * {
    *    "success": true,
    *    "message": "Has dejado de seguir a ada"
    * }
    */
    static async unfollow(req, res) {
        const { username } = req.body;
        const { following } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.updateOne(
                { username: username }, 
                { $pull: { following: following } });

            if (!user) {
                throw new Error('Usuarix inexistente');
            }
    
            return res.status(200).send({
                success: true,
                message: `Has dejado de seguir a ${following}`
            });

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
                trace: error.stack
            });
        }
    }
}

module.exports = Controller;