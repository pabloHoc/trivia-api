import { UserRouter } from '@users/application/routers/UserRouter';
import path from 'path';

const tokenCheker = require('./middlewares/tokenChecker');

const init = server => {
    server.get('/apidocs', (req, res) => {
        return res.sendFile(path.join(__dirname + '/apidocs/index.html'));
    });
    server.use('/v1/users', new UserRouter().getRouter());

    server.use(tokenCheker);
}

export const routes = {
    init: init
}