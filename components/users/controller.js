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
                message: 'Usuarix creado exitosamente'
            });
        } catch(error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

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
                message: error.message
            });
        }
    }

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
                message: error.message
            });
        }
    }

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
                result: user
            });

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

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
                message: 'Operación exitosa'
            });

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

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
                message: 'Operación exitosa'
            });

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = Controller;