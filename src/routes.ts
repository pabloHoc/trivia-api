import questionsRoutes from './components/questions/routes';
import challengesRoutes from './components/challenges/routes';
import competitionsRoutes from './components/competitions/routes';
import categoriesRoutes from './components/categories/routes';
import { UserRouter } from '@users/routers/UserRouter';
import notificationRoutes from './components/notifications/routes';

import path from 'path';

const 
    tokenCheker = require('./middlewares/tokenChecker');

const init = server => {
    
    server.get('/apidocs', (req, res) => {
        return res.sendFile(path.join(__dirname + '/apidocs/index.html'));
    });
    server.use('/v1/users', new UserRouter().getRouter());

    server.use(tokenCheker);

    server.use('/v1/categories', categoriesRoutes);
    server.use('/v1/challenges', challengesRoutes);
    server.use('/v1/questions', questionsRoutes);
    server.use('/v1/competitions', competitionsRoutes);
    server.use('/v1/notifications', notificationRoutes);
}

export const routes = {
    init: init
}