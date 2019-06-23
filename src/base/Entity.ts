import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export abstract class Entity<T> {
    public props: T;
    public readonly id: UniqueEntityID;
  
    constructor (props: T, id?: UniqueEntityID) {
      this.id = id ? id : new UniqueEntityID();
      this.props = props;
    }
  
    // Entities are compared based on their referential
    // equality.
    public equals (object?: Entity<T>) : boolean {
  
      if (!object == null || object == undefined) {
        return false;
      }
  
      if (this === object) {
        return true;
      }
  
      if (!isEntity(object)) {
        return false;
      }
  
      return this.id.equals(object.id);
    }
  }