import { Controller, Result } from '@src/base';
import { User, IUser } from '@users/entities/User';
import { Username, Password } from '@users/values';
import { UserMapper } from '@users/mappers/UserMapper';
import { IUserRepository } from '@users/repositories/IUserRepository';

export class CreateUserController extends Controller {
    private userRepo: IUserRepository;

    constructor (userRepo: IUserRepository) {
        super();
        this.userRepo = userRepo;
    }

    public async executeImpl(): Promise<any> {
        try {
            const { req } = this;
            const { username, password } = req.body;
            const usernameOrError: Result<Username> = Username.create(username);
            const passwordOrError: Result<Password> = Password.create(password);

            const userPropsResult: Result<any> = Result.combine(
                usernameOrError,
                passwordOrError
            )

            if (userPropsResult.isFailure) {
                return this.clientError(userPropsResult.error)
            }

            const exists = await this.userRepo.findByUsername(usernameOrError.getValue().getValue());
            
            if (exists) {
                return this.fail('Username already exists');
            }

            const userOrError: Result<User> = User.create({
                username: usernameOrError.getValue(),
                password: passwordOrError.getValue()
            });

            if (userOrError.isFailure) {
                return this.clientError(userOrError.error)
            }

            const user: User = userOrError.getValue();

            await this.userRepo.create(UserMapper.toPersistence(user));

            return this.created();
        } catch (err) {
            return this.fail(err)
        }    
    }   
}