import { AggregateRoot, Result } from '@core';
import { Username, Password } from '@users/domain/values';
import { UniqueEntityID } from '@core';
import { Guard } from '@core';
import { UserRegisteredEvent } from '@users/domain/events/UserRegisteredEvent';
import { UserId } from '@users/domain/entities/UserId';

type UserProps = {
    readonly username: Username;
    readonly password: Password;
}

export type UserCollection = User[];

export class User extends AggregateRoot<UserProps> {

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get userId(): UserId {
        return UserId.create(this.id)
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        const propsResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.username, argumentName: 'username' },
            { argument: props.password, argumentName: 'password' },
        ]);
    
        if (!propsResult.succeeded) {
            return Result.fail<User>(propsResult.message)
        } 

        const user = new User({
            ...props
        }, id);

        const isNewlyCreated = !!id === false;
    
        if (isNewlyCreated) {
            user.addDomainEvent(new UserRegisteredEvent(user.userId))
        }
    
        return Result.ok<User>(user);
    }

    // // ? Esto no deberia ir en servicio? Hay que chequear si el usuario existe
    // // ? Esto no deberia ir en otro dominio
    // // ? No deberia ser un agregado? Refiere a otra clase
    // public follow(user: User): Result<any> {
    //     if (this.equals(user)) {
    //         Result.fail(`You can't follow yourself}`);
    //     }

    //     // ? Deberia trabajar con strings aca?
    //     this.props.following.push(user);
        
    //     // ? Evento ?
        
    //     return Result.ok(`You have started to follow ${user.props.username.getValue()}`);
    // }
}