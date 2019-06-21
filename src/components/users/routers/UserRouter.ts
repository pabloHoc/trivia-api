
// router.get('/all/:sort/:page?', controller.getAll);
// router.get('/:username', controller.getByUsername);

// router.post('/signin', validator('login'), checkValidationResult, controller.signIn);
// router.post('/login', validator('login'), checkValidationResult, controller.login);
// router.post('/follow/:following', validator('follow'), controller.follow);
// router.post('/unfollow/:following', validator('follow'), controller.unfollow);


import { Router } from 'express';
import { Collections } from '@src/db';
import { CreateUserController } from '@users/controllers/CreateUserController';
import { UserRepository } from '@users/repositories/UserRepository';
import { IUserRepository } from '@users/repositories/IUserRepository';

export class UserRouter {
    private userRouter: Router;
    private userRepo: IUserRepository;

    public constructor() {
        this.userRouter = Router();
        this.userRepo = new UserRepository(Collections.Users);
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.userRouter;        
    }

    private setRoutes(): void {
        this.userRouter.post('/signin', (req, res) => new CreateUserController(this.userRepo).execute(req, res));
    }
}