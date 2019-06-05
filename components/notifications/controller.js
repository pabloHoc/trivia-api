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

    static async get(req, res) {
        const { username } = req.body;
        const { limit = 5, skip = 0} = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.NOTIFICATIONS);
            const result = await collection.aggregate([
                    { $match: { username: username }},
                    { $unwind: '$notifications'}, 
                    { $sort: { 'notifications.date': -1 }}, 
                    { $group: {_id:"$_id", notifications: { $push: '$notifications' }}},
                    { $skip: skip * limit }, 
                    { $limit: limit }
            ]).toArray();

            res.status(200).send({
                success: true,
                notifications: result[0].notifications
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