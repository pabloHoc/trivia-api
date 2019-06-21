import { ValueObject, Result } from '@src/base';
import { validate } from '@src/base'
import { hashSync } from 'bcrypt';

export class Password extends ValueObject<Password> {
    private value: string;
    
    private constructor(password: string) {
        super();
        this.value = password;
        this.setPropsInEqualityCheck("value");
        Object.freeze(this);
    }

    public getValue(): string {
        return this.value;
    }

    public static create(password: string): Result<Password> {
        const validation = validate({ password: password }).isNotUndefined().isNotNull().lengthGreaterThan(1).lengthSmallerThan(100); 
        if (!validation.getResult()) {
            return Result.fail<Password>(validation.getErrorMessagesFormatted());
        } else {
            const hash = hashSync(password, 10);
            return Result.ok<Password>(new Password(hash)); 
        }
    }
}