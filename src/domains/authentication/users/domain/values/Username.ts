import { ValueObject, Result, validate } from '@core';

interface IUsernameProps {
    value: string
}

export class Username extends ValueObject<IUsernameProps> {

    private constructor(public props: IUsernameProps) {
        super(props);
        Object.freeze(this);
    }

    get value (): string {
        return this.props.value;
    }

    public static create(username: string): Result<Username> {
        const validation = validate({ username: username })
                            .isNotUndefined()
                            .isNotNull()
                            .lengthGreaterThan(1)
                            .lengthSmallerThan(100);
                             
        if (!validation.getResult()) {
            return Result.fail<Username>(validation.getErrorMessagesFormatted());
        } else {
            return Result.ok<Username>(new Username({ value: username })); 
        }
    }
}