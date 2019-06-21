import { MongoRepo } from "@src/base/MongoRepo";
import { User } from "@users/entities/User";
import { IUserRepository } from "./IUserRepository";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepository extends MongoRepo<User> implements IUserRepository {
    async findByUsername(username: string): Promise<User> {
        try {
            const result = await this.collection.findOne({ username: username });
            return UserMapper.toDomain(result);  
        } catch(error) {
            throw error;
        }
    }
}