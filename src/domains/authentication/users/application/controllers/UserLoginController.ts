import { Controller } from '@core';
import { UserLoginUseCase } from '@users/application/useCases';

export class UserLoginController extends Controller {

    constructor (private userCase: UserLoginUseCase) {
        super();
    }

    public async executeImpl(): Promise<any> {
        try {             
            const { req } = this;
            const { username, password } : {username: string, password: string} = req.body;
            
            const result = await this.userCase.execute({
                username: username, 
                password: password
            });

            return result.isSuccess ? this.ok(result.getValue()) : this.fail(result.error);
        } catch (err) {
            return this.fail(err)
        }    
    }   
}