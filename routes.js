const 
    questionsRoutes = require('./components/questions/routes'),
    challengesRoutes = require('./components/challenges/routes'),
    competitionsRoutes = require('./components/competitions/routes'),
    categoriesRoutes = require('./components/categories/routes'),
    usersRoutes = require('./components/users/routes');

const init = server => {
    server.use('/categories', categoriesRoutes);
    server.use('/challenges', challengesRoutes);
    server.use('/questions', questionsRoutes);
    server.use('/competitions', competitionsRoutes);
    server.use('/users', usersRoutes);
}

module.exports = {
    init: init
}