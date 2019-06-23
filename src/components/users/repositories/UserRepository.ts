import { MongoRepo } from "@src/base/MongoRepo";
import { User } from "@users/entities/User";
import { UserMapper } from "@users/mappers/UserMapper";
import { Username } from "@users/values";

export class UserRepository extends MongoRepo<User> {
    async getByUsername(username: Username): Promise<User> {
        try {
            const result = await this.collection.findOne({ username: username.getValue() });
            return UserMapper.toDomain(result);  
        } catch(error) {
            throw error;
        }
    }

    async addFollowing(username: Username, following: Username): Promise<boolean> {
        try {
            await this.collection.updateOne({ username: username.getValue() }, {
                $addToSet: { following: following.getValue() }
            });
            return true;  
        } catch(error) {
            throw error;
        }
    }
}