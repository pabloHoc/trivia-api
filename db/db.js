const 
  mongo = require('mongodb').MongoClient,
  { url, db } = require('../configs/db');

let connection;

class Db {
  async getDb() {
    if (connection) {
      return connection;
    } else {
      try {
        const client = await mongo.connect(url, { useNewUrlParser: true} );
        connection = client.db(db);
        return connection;
      } catch(error) {
        throw error;
      }
    }
  }

  async getCollection(name) {
    try {
      let triviaDb = await this.getDb();
      return triviaDb.collection(name);
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = new Db();