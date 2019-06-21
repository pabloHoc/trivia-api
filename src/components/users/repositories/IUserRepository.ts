import { IRepository } from "@src/base/IRepository";
import { User } from "@users/entities/User";

export interface IUserRepository extends IRepository<User> {
    findByUsername(username: string) : Promise<User>
}