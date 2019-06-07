const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections')
    messages = require('./messages');

class Controller {
    static async addNotification(event, data) {
        const { username } = data;
        const message = messages.getMessage(event, data);
        
        try {
            const collection = await db.getCollection(COLLECTIONS.NOTIFICATIONS);
            collection.updateOne(
                { username: username }, 
                { $push: {  
                    notifications: {
                        message: message,
                        date: new Date(Date.now()).toISOString(),
                        read: false
                    }
                }
            }, { upsert: true });
        } catch (error) {
            console.log(`Error sending notification ${error}`);
        }
    }
    /**
    * @api {get} /v1/notificationes/:quantity?/:page? Obtener notificaciones
    * @apiName getNotifications
    * @apiGroup Notificaciones
    * @apiVersion  1.0.0
    * @apiHeader {String} Authorization Token de autorización.
    * @apiDescription Obtiene todas las notificaciones de más nuevas a más viejas. Cuando se las obtiene, aquellas que estén sin leer
    * se actualizan como leídas.
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
    * @apiParam {Number} [quantity=5] Cantidad de notificaciones que se desea obtener
    * @apiParam {Number} [page=0] Número de página de las notificaciones
    * @apiSuccess (200 (OK)) {Boolean} success Resultado de la operación
    * @apiSuccess (200 (OK)) {String} message Mensaje resultado de la operación
    * 
    * @apiSuccessExample {type} Success-Response:
    * {
    *   "success": true,
    *   "notifications": [
    *       {
    *           "message": "random_citizen te ha vencido 7-9",
    *           "read": false
    *       },
    *       {
    *        "message": "random_citizen ha comenzado a seguirte!",
    *        "read": false
    *    },
    *    {
    *        "message": "Has empatado contra random_citizen 5-5!",
    *        "read": true
    *    }
    */ 
    static async get(req, res) {
        const { username } = req.body;
        let { limit = 5, page = 0} = req.params;

        limit = parseInt(limit);
        page = parseInt(page);
        
        try {
            const collection = await db.getCollection(COLLECTIONS.NOTIFICATIONS);
            const result = await collection.aggregate([
                    { $match: { username: username }},
                    { $unwind: '$notifications'}, 
                    { $sort: { 'notifications.date': -1 }}, 
                    { $group: {_id:"$_id", notifications: { $push: '$notifications' }}},
                    { $project: { _id: 1, notifications: { $slice: ['$notifications', limit * page, limit]}}}
            ]).toArray();
            
            const notifications = result[0] ? result[0].notifications : [];

            const updatedNotif = await collection.findOne({ username: username });
            
            for(let i = updatedNotif.notifications.length - limit - limit * page; i < updatedNotif.notifications.length - limit * page; i++) {
                if (updatedNotif.notifications[i])
                    updatedNotif.notifications[i].read = true;
            }
            
            collection.updateOne({ username: username }, { $set: { notifications: updatedNotif.notifications }});

            res.status(200).send({
                success: true,
                notifications: notifications
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: 'Error al obtener notificaciones',
                error: error.message,
                trace: error.stack
            });
        }
    }
}

module.exports = Controller;