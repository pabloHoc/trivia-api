import { Controller, Result } from '@src/base';
import { User } from '@users/entities/User';
import { Username, Password } from '@users/values';
import { UserMapper } from '@users/mappers/UserMapper';
import { UserRepository } from '@users/repositories/UserRepository';

export class UserCreateController extends Controller {
    private userRepo: UserRepository;

    constructor (userRepo: UserRepository) {
        super();
        this.userRepo = userRepo;
    }

    public async executeImpl(): Promise<any> {
        try {
            const { req, userRepo: UserRepo } = this;
            const { username, password } : {username: string, password: string} = req.body;
            const usernameOrError: Result<Username> = Username.create(username);
            const passwordOrError: Result<Password> = Password.create(password);
        
            const userPropsResult: Result<any> = Result.combine(
                usernameOrError,
                passwordOrError
            )
        
            if (userPropsResult.isFailure) {
                return this.clientError(userPropsResult.error);
            }

            const exists = await UserRepo.getByUsername(usernameOrError.getValue());
            
            if (exists) {
                return this.fail('Username already exists');
            }

            const userOrError: Result<User> = User.create({
                username: usernameOrError.getValue(),
                password: passwordOrError.getValue(),
                following: []
            });

            if (userOrError.isFailure) {
                return this.clientError(userOrError.error)
            }

            const user: User = userOrError.getValue();

            await UserRepo.create(UserMapper.toPersistence(user));

            return this.created();
        } catch (err) {
            return this.fail(err)
        }    
    }   
}