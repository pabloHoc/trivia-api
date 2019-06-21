const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections');

class Controller {
    /**
     * @api {post} /v1/categories Agregar categoria
     * @apiName addcategory
     * @apiGroup Categorias
     * @apiVersion  1.0.0
     * @apiDescription Agrega una categoria
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/categories", {
     *          headers: {
     *              "Accept": "application/json",
     *              "Content-Type": "application/json;  charset=UTF-8",
     *              "Authorization": "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"
     *          },
     *          method: "post",
     *          body: JSON.stringify({
     *              name: "Series",
     *              color: "#F8F8F8"
     *          })  
     *     }).then(function(result) {
     *          return result.json();
     *     }).then(function(result) {
     *     
     *     }).catch(function(error) {
     *     
     *     });
     * 
     * @apiParam  {String} name Nombre de la categoría
     * @apiParam  {String} [color] Código hexadecimal que sirve como etiqueta
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     "name": "Series",
     *     "color": "#F8F8F8"
     * }
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     "success": "true",
     *     "message": "Categoría añadida con éxito" 
     * }
     */
    static async add(req, res) {
        try {
            let {category, color = "#FFFFFF"} = req.body;
            const collection = await db.getCollection(COLLECTIONS.CATEGORIES);

            category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

            await collection.updateOne(
                { name: category }, 
                { $setOnInsert: { color: color }},
                { upsert: true });

            res.status(200).send({
                success: true,
                message: 'Categoría añadida con éxito'
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                msg: error.message,
                trace: error.stack
            });
        }
    }

    /**
     * @api {get} /v1/categories/all Obtener todas las categorias
     * @apiName getallcategories
     * @apiGroup Categorias
     * @apiVersion  1.0.0
     * @apiDescription Obtiene un listado de todas las categorias
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/categories/all", {
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
     * @apiParam  {string="questions","likes"} sort Orden de las categorías, por número de preguntas o por likes
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {Object[]} categories Listado de categorías
     * @apiSuccess (200 (OK)) {String} categories.name Nombre de la categoría
     * @apiSuccess (200 (OK)) {String} categories.color Color de la categoría
     * 
     * @apiSuccessExample {type} Success-Response:
     *   {
     *       "success": true,
     *       "categories": [
     *           {
     *               "name": "Historia",
     *               "color": "#F8F8F8",
     *           },
     *           {
     *               "name": "Peliculas",
     *               "color": "#F8F8F8",
     *           }
     *       ]
     *   }
     */
    static async getAll(req, res) {
        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            const categories = await collection
                .aggregate([{
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                    }}, 
                { $unwind: '$category'}, 
                { $group: {
                    _id: { name: '$category.name' },
                    name: { $first: '$category.name'}, 
                    color: { $first: '$category.color'}, 
                }}, 
                { $project: { _id: 0 } }, 
                { $sort: { name: 1 }}
            ]).toArray();

            res.status(200).send({
                success: true,
                categories: categories
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                msg: error.message,
                trace: error.stack
            });
        }
    }

    /**
     * @api {get} /v1/categories/ranking/:sort? Obtener rankings de categorias
     * @apiName getcategories
     * @apiGroup Rankings
     * @apiVersion  1.0.0
     * @apiDescription Obtiene el ranking de todas las categorias
     * @apiExample {js} Ejemplo de uso:
     *     fetch("https://preguntadas.herokuapp.com/v1/categories/ranking/likes", {
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
     * @apiParam  {string="questions","likes"} sort Orden de las categorías, por número de preguntas o por likes
     * 
     * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
     * @apiSuccess (200 (OK)) {Object[]} categories Listado de categorías
     * @apiSuccess (200 (OK)) {String} categories.name Nombre de la categoría
     * @apiSuccess (200 (OK)) {String} categories.color Color de la categoría
     * @apiSuccess (200 (OK)) {Number} categories.questions Cantidad de preguntas en la categoría
     * @apiSuccess (200 (OK)) {Number} categories.likes Total de likes de preguntas en la categoría
     * 
     * @apiSuccessExample {type} Success-Response:
     *   {
     *       "success": true,
     *       "categories": [
     *           {
     *               "name": "Historia",
     *               "color": "#F8F8F8",
     *               "questions": 544,
     *               "likes": 350
     *           },
     *           {
     *               "name": "Peliculas",
     *               "color": "#F8F8F8",
     *               "questions": 52,
     *               "likes": 170
     *           }
     *       ]
     *   }
     */
    static async getRanking(req, res) {
        let { sort = 'questions' } = req.params;

        switch (sort) {
            case 'likes':
                sort = { likes: -1 }
                break;
            case 'questions':
            default:
                sort = { questions: -1 }
                break;
        }

        try {
            const collection = await db.getCollection(COLLECTIONS.QUESTIONS);
            const categories = await collection
                .aggregate([{
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                    }}, 
                { $unwind: '$category'}, 
                { $group: {
                    _id: { name: '$category.name' },
                    name: { $first: '$category.name'}, 
                    color: { $first: '$category.color'}, 
                    questions: { $sum: 1 },
                    likes: { $sum: '$likes' }
                }}, 
                { $project: { _id: 0 } }, 
                { $sort: sort}
            ]).toArray();

            res.status(200).send({
                success: true,
                categories: categories
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                msg: error.message,
                trace: error.stack
            });
        }
    }

}

module.exports = Controller;
