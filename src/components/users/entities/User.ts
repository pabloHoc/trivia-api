import { Entity, Result } from '@src/base';
import { Username, Password } from '@users/values';
import { UniqueEntityID } from '@src/base/UniqueEntityId';

type UserProps = {
    readonly username: Username;
    readonly password: Password;
    readonly following: User[]
}

export class User extends Entity<UserProps> {

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        for (const prop in props) {
            if (props[prop] === null || props[prop] === undefined)
                return Result.fail<User>(`Must provide ${prop} for the user`);
        }

        return Result.ok<User>(new User(props, id));
    }

    public follow(user: User): Result<any> {
        if (this.equals(user)) {
            Result.fail(`You can't follow yourself}`);
        }

        // ? Deberia trabajar con strings aca?
        this.props.following.push(user);
        
        // ? Evento ?
        
        return Result.ok(`You have started to follow ${user.props.username.getValue()}`);
    }
}