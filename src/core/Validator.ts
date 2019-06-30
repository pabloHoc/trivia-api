interface IValidationObject {
    [property: string]: any
}

class Validator {
    private propertyName: string;
    private value: any;
    private result: boolean = true;
    private validationStarted: boolean = false;
    private validations: [string, Function][] = [];
    private errors: string[] = [];

    public constructor(vo: IValidationObject) {
        this.propertyName = Object.keys(vo)[0];
        this.value = vo[this.propertyName];
        this.validationStarted = true;
    }

    public getResult(): boolean {
        if (!this.validationStarted)
            throw new Error('Cannot validate without a value set');
        
        this.validationStarted = false;
        
        for (const validation of this.validations) {
            if (!validation[1](this.value)) {
                this.errors.push(validation[0]);
                return false;
            }
        }
        
        return this.result;
    }

    public getErrorMessages(): string[] {
        return this.errors;
    }

    public getErrorMessagesFormatted(): string {
        return this.errors.join(', ');
    }

    public isNotUndefined(): Validator {
        this.validations.push([
            `${this.propertyName} must not be undefined`,
            value => ValidationRules.isNotUndefined(value)
        ]);
        return this;
    }

    public isNotNull(): Validator{
        this.validations.push([
            `${this.propertyName} must not be null`,
            value => ValidationRules.isNotNull(value)
        ]);
        return this;
    }

    public lengthGreaterThan(size: number): Validator{
        this.validations.push([
            `${this.propertyName} length must be greater than ${size}`,
            value => ValidationRules.lengthGreaterThan(value, size)
        ]);
        return this;
    }

    public lengthSmallerThan(size: number): Validator{
        this.validations.push([
            `${this.propertyName} length must be smaller than ${size}`,
            value => ValidationRules.lengthSmallerThan(value, size)
        ]);        
        return this;
    }
}

class ValidationRules {
    public static isNotUndefined(value: any): boolean {
        return value !== undefined;
    }
    public static isNotNull(value): boolean {
        return value !== null;
    }
    public static lengthGreaterThan(value: any, size: number): boolean {
        return value && value.length !== undefined && value.length > size;
    }
    public static lengthSmallerThan(value: any, size: number): boolean {
        return value && value.length !== undefined && value.length < size;
    }
}

export const validate = (vo: IValidationObject): Validator => {
    return new Validator(vo);
};