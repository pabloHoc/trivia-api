import { IRepository } from "@core";
import { User } from "@users/domain/entities/User";
import { Username } from "@users/domain/values";

export interface IUserRepository extends IRepository<User> {
    getById(id: string): Promise<User>;
    getByUsername(username: Username): Promise<User>;
    getAll(): Promise<User[]>;
}