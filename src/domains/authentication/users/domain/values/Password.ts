import { ValueObject, Result } from '@core';
import { validate } from '@core'
import { hashSync } from 'bcrypt';

interface IPasswordProps {
    value: string
}

export class Password extends ValueObject<IPasswordProps> {

    private constructor(public props: IPasswordProps) {
        super(props);
        Object.freeze(this);
    }

    get value (): string {
        return this.props.value;
    }
 
    public static create(password: string): Result<Password> {
        const validation = validate({ password: password })
                            .isNotUndefined()
                            .isNotNull()
                            .lengthGreaterThan(1)
                            .lengthSmallerThan(100);

        if (!validation.getResult()) {
            return Result.fail<Password>(validation.getErrorMessagesFormatted());
        } else {
            const hash = hashSync(password, 10);
            return Result.ok<Password>(new Password({ value: hash })); 
        }
    }
}