import { IUser, User } from '@users/entities/User';
import { Username, Password } from '@users/values';

export class UserMapper {
    // public static toDTO (user: User): UserDTO {
    //   id: user.id.toString(),
    //   userName: user.name.value,
    //   userEmail: user.email.value
    // }

    public static toPersistence(user: User): any {
        return {
            username: user.props.username.getValue(),
            password: user.props.password.getValue(),
        }
    }

    public static toDomain(raw: any): User {
        return User.create({
            username: Username.create(raw.username).getValue(),
            password: Password.create(raw.password).getValue()
        }).getValue();
    }
}