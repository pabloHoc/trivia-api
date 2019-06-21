import { IEntity } from "./Entity";

export interface ISpecification<T extends IEntity> {
    isSatisfiedBy(entity: T): boolean
    isNotSatisfiedBy(entity: T): boolean
}

export class OrSpecification<T extends IEntity> implements ISpecification<T>
{
    private specifications: ISpecification<T>[];
    
    public constructor(...specifications: ISpecification<T>[]) {
        this.specifications = specifications;
    }
    
    public isSatisfiedBy(entity: T) : boolean {
        for(const specification of this.specifications) {
            if (specification.isSatisfiedBy(entity))
                return true;
        }
        return false;
    }

    public isNotSatisfiedBy(entity: T): boolean {
        return !this.isSatisfiedBy(entity);
    }
}

export class AndSpecification<T extends IEntity> implements ISpecification<T>
{
    private specifications: ISpecification<T>[];
    
    public constructor(...specifications: ISpecification<T>[]) {
        this.specifications = specifications;
    }
    
    public isSatisfiedBy(entity: T) : boolean {
        for(const specification of this.specifications) {
            if (specification.isNotSatisfiedBy(entity))
                return false;
        }
        return true;
    }

    public isNotSatisfiedBy(entity: T): boolean {
        return !this.isSatisfiedBy(entity);
    }
}