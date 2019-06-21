import { IEntity } from './Entity';

export interface IRepository<T extends IEntity> {
    create(item: T): Promise<string>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<T>;
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
    getAll(): Promise<T[]>;
}