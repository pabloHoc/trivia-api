import { ValueObject, Result, validate } from '@src/base';

export class Username extends ValueObject<Username> {
    private value: string;

    private constructor(username: string) {
        super();
        this.value = username;
        this.setPropsInEqualityCheck("value");
        Object.freeze(this);
    }

    public getValue(): string {
        return this.value;
    }

    public static create(username: string): Result<Username> {
        const validation = validate({ username: username }).isNotUndefined().isNotNull().lengthGreaterThan(1).lengthSmallerThan(100); 
        if (!validation.getResult()) {
            return Result.fail<Username>(validation.getErrorMessagesFormatted());
        } else {
            return Result.ok<Username>(new Username(username)); 
        }
    }
}