import { IUseCase, Result } from "@core";
import { User } from "@users/domain/entities/User";
import { Username, Password } from "@users/domain/values";
import { IUserRepository } from "@users/infra/repositories/IUserRepository";

interface UserRegisterUseCaseRequestDTO {
    username: string,
    password: string
}

export class UserRegisterUseCase implements IUseCase<UserRegisterUseCaseRequestDTO, Result<User>> {
    
    public constructor(private userRepo: IUserRepository) {}

    public async execute(request: UserRegisterUseCaseRequestDTO): Promise<Result<User>> {
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
            
            if (exists)
                return Result.fail('Username already exists');

            const user: User = userResult.getValue();
            await UserRepo.save(user);

            return Result.ok<User>(user);
        } catch (error) {
            return Result.fail(error);
        }
    }
}