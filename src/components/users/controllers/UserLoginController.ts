import { Controller, Result } from '@src/base';
import { Username, Password } from '@users/values';
import { UserRepository } from '@users/repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secret } from '@src/configs/config';

export class UserLoginController extends Controller {
    private userRepo: UserRepository;

    constructor (userRepo: UserRepository) {
        super();
        this.userRepo = userRepo;
    }

    public async executeImpl(): Promise<any> {
        try {
            const { req, userRepo: UserRepo } = this;
            const { username, password } : {username: string, password: string} = req.body;
            const usernameResult: Result<Username> = Username.create(username);
            const passwordResult: Result<Password> = Password.create(password);

            const userPropsResult: Result<any> = Result.combine(
                usernameResult,
                passwordResult
            )

            if (userPropsResult.isFailure) {
                return this.clientError(userPropsResult.error)
            }

            const user = await UserRepo.getByUsername(usernameResult.getValue());
            
            if (!user) {
                return this.fail("Username doesn't exists");
            }

            const match = await bcrypt.compare(password, user.props.password.getValue());

            if (match) {
                const token = jwt.sign({ username: username }, secret)
                return this.ok<string>(token);
            } else {
                return this.fail('User or password incorrect');
            }
        } catch (err) {
            return this.fail(err)
        }    
    }   
}