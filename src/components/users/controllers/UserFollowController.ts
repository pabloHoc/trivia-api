import { Controller, Result } from '@src/base';
import { User } from '@users/entities/User';
import { Username, Password } from '@users/values';
import { UserRepository } from '@users/repositories/UserRepository';

export class UserFollowController extends Controller {
    private userRepo: UserRepository;

    constructor (userRepo: UserRepository) {
        super();
        this.userRepo = userRepo;
    }

    public async executeImpl(): Promise<any> {
        try {
            const { req, userRepo: UserRepo } = this;
            const { username } : { username: string } = req.body;
            const { following: followingUsername } : { following: string } = req.params;
            const usernameResult: Result<Username> = Username.create(username);
            const followingResult: Result<Username> = Username.create(followingUsername);
            
            const usernamesResult: Result<any> = Result.combine(
                usernameResult,
                followingResult
            )
        
            if (usernamesResult.isFailure) {
                return this.clientError(usernamesResult.error)
            }

            const [user, following] : [User, User] = await Promise.all([
                UserRepo.getByUsername(usernameResult.getValue()),
                UserRepo.getByUsername(followingResult.getValue())
            ]);

            if (!user || !following) {
                return this.notFound();
            }

            user.follow(following);

            // ? Llamar a repositorio???

            return this.ok<string>(`You started following ${followingResult.getValue().getValue()}`);
        } catch (err) {
            return this.fail(err)
        }    
    }   
}