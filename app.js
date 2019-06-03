/**
 * TODO: 
 *  * Agregar validacion JWT
 *  * Si esta expirado pero es valido, devolver uno nuevo
 *  * En el token tiene que estar el username
 *  * Middleware que chequee que haya token
 *  * Middleware que ponga el username en el body de la request
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

// Absolute module paths
const dotenv = require('dotenv');
dotenv.config();

const { port } = require('./configs/config');

// Routes

const questionsRoutes = require('./components/questions/routes');
const challengesRoutes = require('./components/challenges/routes');
const competitionsRoutes = require('./components/competitions/routes');
const categoriesRoutes = require('./components/categories/routes');
const usersRoutes = require('./components/users/routes');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1);
})

app.use('/categories', categoriesRoutes);
app.use('/challenges', challengesRoutes);
app.use('/questions', questionsRoutes);
app.use('/competitions', competitionsRoutes);
app.use('/users', usersRoutes);
