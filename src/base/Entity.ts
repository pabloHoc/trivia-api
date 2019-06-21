const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export interface IEntity {

}

export abstract class Entity<T> implements IEntity {
    public props: T;
  
    constructor (props: T) {
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
  
      return false;
    }
  }

  // Agregar Guid