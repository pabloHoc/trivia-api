import { User } from '@users/entities/User';
import { Username, Password } from '@users/values';
import { UserDTO, RankedUserDTO } from '@users/dtos';
import { UniqueEntityID } from '@src/base/UniqueEntityId';

export class UserMapper {
    public static toUserDTO (user: User): UserDTO {
      return new UserDTO({
          id: user.id.toString(),
          username: user.props.username.getValue(),
          following: user.props.following.map(f => UserMapper.toUserDTO(f))
      });
    }

    public static toRankedUserDTO(raw: any): RankedUserDTO {
        return new RankedUserDTO({
            username: raw.username,
            answered: raw.answered
        });
    }

    public static toPersistence(user: User): any {
        return {
            username: user.props.username.getValue(),
            password: user.props.password.getValue(),
        }
    }

    public static toDomain(raw: any): User {
        const userResult = User.create({
            username: Username.create(raw.username).getValue(),
            password: Password.create(raw.password).getValue(),
            following: raw.following
        }, new UniqueEntityID(raw._id));
        return userResult.isSuccess ? userResult.getValue() : null;
    }
}