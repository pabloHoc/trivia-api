const 
    questionsRoutes = require('./components/questions/routes'),
    challengesRoutes = require('./components/challenges/routes'),
    competitionsRoutes = require('./components/competitions/routes'),
    categoriesRoutes = require('./components/categories/routes'),
    usersRoutes = require('./components/users/routes'),
    notificationRoutes = require('./components/notifications/routes'),
    
    tokenCheker = require('./middlewares/tokenChecker');

const init = server => {
    server.use('/v1/users', usersRoutes);

    server.use(tokenCheker);

    server.use('/v1/categories', categoriesRoutes);
    server.use('/v1/challenges', challengesRoutes);
    server.use('/v1/questions', questionsRoutes);
    server.use('/v1/competitions', competitionsRoutes);
    server.use('/v1/notifications', notificationRoutes);
}

module.exports = {
    init: init
}