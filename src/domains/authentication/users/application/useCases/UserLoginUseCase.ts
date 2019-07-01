import { IUseCase, Result } from "@core";
import { User } from "@users/domain/entities/User";
import { Username, Password } from "@users/domain/values";
import { IUserRepository } from "@users/infra/repositories/IUserRepository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secret } from "@src/configs/config";

interface UserLoginUseCaseRequestDTO {
    username: string,
    password: string
}

interface UserLoginUseCaseResponseDTO {
    token: string
}

export class UserLoginUseCase implements IUseCase<UserLoginUseCaseRequestDTO, Result<UserLoginUseCaseResponseDTO>> {
    
    public constructor(private userRepo: IUserRepository) {}

    public async execute(request: UserLoginUseCaseRequestDTO): Promise<Result<UserLoginUseCaseResponseDTO>> {
        try {
            const { username, password } = request;
            const UserRepo = this.userRepo;

            const usernameResult: Result<Username> = Username.create(username);
            const passwordResult: Result<Password> = Password.create(password);
            const userPropsResult: Result<any> = Result.combine(
                usernameResult,
                passwordResult
            )

            if (userPropsResult.isFailure) {
                return Result.fail(userPropsResult.error);
            }

            const userResult: Result<User> = User.create({
                username: usernameResult.getValue(),
                password: passwordResult.getValue()
            });
    
            if (userResult.isFailure)
                return Result.fail(userResult.error)
    
            const exists = await UserRepo.exists(userResult.getValue());
            
            if (!exists)
                return Result.fail('Username or password incorrect');

            const user = await UserRepo.getByUsername(usernameResult.getValue());
                
            const match = await bcrypt.compare(password, user.props.password.value);

            if (match) {
                const token = jwt.sign({ username: username }, secret);
                return Result.ok<UserLoginUseCaseResponseDTO>({ token: token });
            } else {
                return Result.fail('Username or password incorrect');
            }
        } catch (error) {
            return Result.fail(error);
        }
    }
}