import { Controller, Result } from '@src/base';
import { User } from '@users/entities/User';
import { UserRepository } from '@users/repositories/UserRepository';

export class UserGetRankedController extends Controller {
    private userRepo: UserRepository;

    constructor (userRepo: UserRepository) {
        super();
        this.userRepo = userRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            
        } catch (error) {
            this.fail(error);
        }
    }
}