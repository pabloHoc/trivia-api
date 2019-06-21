import { Entity, Result } from '@src/base';
import { Username, Password } from '@users/values';

export interface IUser {
    readonly username: Username;
    readonly password: Password;
}

export class User extends Entity<IUser> {

    private constructor(props: IUser) {
        super(props);
    }

    public static create(props: IUser): Result<User> {
        for (const prop in props) {
            if (props[prop] === null || props[prop] === undefined)
                return Result.fail<User>(`Must provide ${prop} for the user`);
        }

        return Result.ok<User>(new User(props));
    }
}