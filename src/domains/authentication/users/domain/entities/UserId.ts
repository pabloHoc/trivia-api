import { Entity, UniqueEntityID, Result } from "@core";

export class UserId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public static create (id?: UniqueEntityID): UserId {
    return new UserId(id);
  }
}