import { User } from '@users/domain/entities/User';
import { Username, Password } from '@users/domain/values';
import { UserDTO } from '@users/domain/dtos/UserDTO';
import { UniqueEntityID } from '@core';

export class UserMapper {
    public static toUserDTO (user: User): UserDTO {
      return new UserDTO({
          id: user.id.toString(),
          username: user.props.username.value
        //   following: user.props.following.map(f => UserMapper.toUserDTO(f))
      });
    }

    public static toPersistence(user: User): any {
        return {
            username: user.props.username.value,
            password: user.props.password.value
        }
    }

    public static toDomain(raw: any): User {
        const userResult = User.create({
            username: Username.create(raw.username).getValue(),
            password: Password.create(raw.password).getValue()
        }, new UniqueEntityID(raw._id));
        return userResult.isSuccess ? userResult.getValue() : null;
    }
}