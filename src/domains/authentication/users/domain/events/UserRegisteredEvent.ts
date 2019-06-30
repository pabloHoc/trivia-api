import { IDomainEvent, UniqueEntityID } from "@core";
import { UserId } from "@users/domain/entities/UserId";

export class UserRegisteredEvent implements IDomainEvent {
    dateTimeOccurred: Date;

    constructor (private userId: UserId) {}

    public getAggregateId (): UniqueEntityID {
        return this.userId.id;
    }
}