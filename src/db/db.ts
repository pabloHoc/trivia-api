import { MongoClient, Db, Collection } from 'mongodb';
import { url, db } from '../configs/db';
import { Collections } from './collections';

export class Database {
  private static connection : Db;

  public static async init() : Promise<void> {
    if (!this.connection) {
      try {
        const client : MongoClient = await MongoClient.connect(url, { useNewUrlParser: true} );
        this.connection = client.db(db);
      } catch(error) {
        throw error;
      }
    }
  }

  public static getCollection(collection: Collections): Collection {
    if (!this.connection)
      throw new Error('There is no connection to db');
    return this.connection.collection(collection);
  }
}