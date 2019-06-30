import { User, UserCollection } from "@users/domain/entities/User";
import { UserMapper } from "@users/application/mappers/UserMapper";
import { Username } from "@users/domain/values";
import { Collection, ObjectId } from "mongodb";
import { IUserRepository } from "@users/infra/repositories/IUserRepository";
import { Database, Collections } from "@src/db";

export class UserRepository implements IUserRepository {
    private collection : Collection;

    public constructor(private collectionName: Collections) {
        this.collection = Database.getCollection(collectionName);
    }

    // * check collection methods with type (eg. findOne<User>)

    public async exists(user: User): Promise<boolean> {
        const result = await this.collection.findOne({
            username: user.props.username.value
        });
        return !!result;
    }

    public async save(user: User): Promise<any> {
        const UserModel = this.collection;
        const exists = await this.exists(user);
        const rawUserData = UserMapper.toPersistence(user);

        if (exists) {
            const mongoUser = await UserModel.findOne({
                _id: new ObjectId(user.id.toString())
            });

            try {
                await mongoUser.update(rawUserData);
            } catch (error) {
                // If it fails, we need to roll everything back this.delete(vinyl);
            }
        } else {
            try {
                await UserModel.insertOne(rawUserData);
            } catch (error) {
                throw error;
            }
        }

        return user;
    }

    // public delete(vinyl: Vinyl): Promise<any> {
    //     const VinylModel = this.models.Vinyl;
    //     return VinylModel.destroy({
    //         where: { vinyl_id: vinyl.id.toString() }
    //     })
    // }

    public async getById(id: string): Promise<User> {
        try {
            const user = await this.collection.findOne({ 
                _id: new ObjectId(id) 
            });
            return UserMapper.toDomain(user);
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<UserCollection> {
        try {
            const users = await this.collection.find().toArray()
            return users.map(u => UserMapper.toDomain(u));
        } catch (error) {
            throw error;
        }
    }

    async getByUsername(username: Username): Promise<User> {
        try {
            const result = await this.collection.findOne({ 
                username: username.value 
            });
            return UserMapper.toDomain(result);
        } catch (error) {
            throw error;
        }
    }

    // async addFollowing(user: User, following: User): Promise<boolean> {
    //     try {
    //         await this.collection.updateOne({ 
    //             _id: new ObjectId(user.id.toString()) 
    //         }, {
    //             $addToSet: { following: new ObjectId(following.id.toString()) }
    //         });
    //         return true;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}