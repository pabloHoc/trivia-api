import { Controller } from '@core';
import { UserRegisterUseCase } from '@users/application/useCases/UserRegisterUseCase';

export class UserRegisterController extends Controller {

    constructor (private userCase: UserRegisterUseCase) {
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

            return result.isSuccess ? this.created() : this.fail(result.error);
        } catch (err) {
            return this.fail(err)
        }    
    }   
}