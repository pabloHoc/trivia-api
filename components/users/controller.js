const jwt = require('jsonwebtoken');
const { SECRET } = require('./../../configs/config');
const db = require('./../../db/db');
const COLLECTIONS = require('./../../db/collections');
const bcrypt = require('bcrypt');

class Controller {
    static async getUser(username) {
        try {
            let userFound;
            let collection = await db.getCollection(COLLECTIONS.USERS)
            userFound = await collection.findOne({ username: username });
            return userFound;
        } catch(error) {
            console.log(error);
        }
    }

    static async signIn(req, res) {
        const { username, password } = req.body;

        let user = await Controller.getUser(username);

        if (user) {
            throw new Error('Nombre de usuario ya se encuentra en uso');
        }

        try {
            let collection = await db.getCollection(COLLECTIONS.USERS);
            
            let hash = await bcrypt.hash(password, 10);

            collection.insertOne({
                username: username,
                password: hash
            });

            return res.status(200).send({
                success: true,
                message: 'Usuario creado exitosamente'
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
            let user = await Controller.getUser(username);

            if (!user) {
                throw new Error('Usuario o contraseña incorrectos');
            }
    
            let match = await bcrypt.compare(password, user.password);
    
            if (match) {
                let token = jwt.sign(
                    { username: username },
                    SECRET,
                    { expiresIn: '24h' }
                )
        
                return res.status(200).send({
                    success: true,
                    message: 'Login exitoso',
                    token: token
                });
            } else {
                throw new Error('Usuario o contraseña incorrectos');
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
            const user = await collection
                                .findOne(
                                    { username: username }, 
                                    { 
                                        fields: { 
                                            username: 1,
                                            following: 1 
                                        } 
                                    });

            if (!user) {
                throw new Error('Usuario inexistente');
            }
    
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

    static async follow(req, res) {
        const { username } = req.body;
        const { following } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.updateOne({ username: username }, {
                $push: {
                    following: following
                }
            });

            if (!user) {
                throw new Error('Usuario inexistente');
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

    static async unfollow(req, res) {
        const { username } = req.body;
        const { following } = req.params;

        try {
            const collection = await db.getCollection(COLLECTIONS.USERS);
            const user = await collection.updateOne({ username: username }, {
                $pull: {
                    following: following
                }
            });

            if (!user) {
                throw new Error('Usuario inexistente');
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