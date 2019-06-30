
// router.get('/all/:sort/:page?', controller.getAll);
// router.get('/:username', controller.getByUsername);

// router.post('/signin', validator('login'), checkValidationResult, controller.signIn);
// router.post('/login', validator('login'), checkValidationResult, controller.login);
// router.post('/follow/:following', validator('follow'), controller.follow);
// router.post('/unfollow/:following', validator('follow'), controller.unfollow);


import { Router } from 'express';
import { Collections } from '@src/db';
import { IUserRepository } from '@src/domains/authentication/users/infra/repositories/IUserRepository';
import { UserRepository } from '@users/infra/repositories/UserRepository';
import { UserRegisterController } from '@users/application/controllers';
import { UserRegisterUseCase } from '@src/domains/authentication/users/application/useCases/UserRegisterUseCase';

export class UserRouter {
    private userRouter: Router;
    private userRepo: IUserRepository;

    private userRegisterController: UserRegisterController;
    // private userLoginController: UserLoginController;
    // private userFollowController: UserFollowController;

    public constructor() {
        this.userRouter = Router();
        this.userRepo = new UserRepository(Collections.Users);
        this.setControllers();
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.userRouter;        
    }

    private setControllers(): void {
        this.userRegisterController = new UserRegisterController(new UserRegisterUseCase(this.userRepo));
        // this.userLoginController = new UserLoginController(new UserLoginService(this.userRepo));
        // this.userFollowController = new UserFollowController(new UserFollowService(this.userRepo));
    }

    private setRoutes(): void {
        const { userRouter: router } = this;
        
        router.post('/signin', (req, res) => this.userRegisterController.execute(req, res));
        // router.post('/login', (req, res) => this.userLoginController.execute(req, res));
        // router.post('/follow/:following', (req, res) => this.userFollowController.execute(req, res));
    }
}
