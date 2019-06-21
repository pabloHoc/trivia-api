import { IRepository } from './IRepository';
import { Collection, ObjectId, InsertOneWriteOpResult } from 'mongodb';
import { Collections, Database } from '@src/db';

export class MongoRepo<T> implements IRepository<T> {
    protected collection: Collection;

    public constructor(collectionName: Collections) {
        this.collection = Database.getCollection(collectionName);
    }
    
    public async create(item: T): Promise<string> {
        const result : InsertOneWriteOpResult = await this.collection.insertOne(item);
        return result.insertedId.toString();
    }
    
    public update(id: string, item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
    public delete(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
    public find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    public async findOne(id: string): Promise<T> {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    public async getAll(): Promise<T[]> {
        return await this.collection.find().toArray();
    }
}