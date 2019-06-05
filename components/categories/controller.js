const 
    db = require('./../../db/db'),
    COLLECTIONS = require('./../../db/collections');

class Controller {
    static async add(req, res) {
        try {
            const {name, color} = req.body;
            const collection = await db.getCollection(COLLECTIONS.CATEGORIES);

            await collection.insertOne({
                name: name,
                color: color
            });

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
    static async getAll(req, res) {
        let { sort = 'questions' } = req.params;

        switch (sort) {
            case 'questions':
                sort = { questions: -1 }
                break;
            case 'likes':
                sort = { questions: -1 }
                break;
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
