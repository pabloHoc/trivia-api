import { Entity, Result } from "@src/base";
import { UniqueEntityID } from "@src/base/UniqueEntityId";

type QuestionProps = {
    readonly title: string,
    readonly answer: string,
    readonly answers: string[],
    readonly likes?: number,
    readonly dislikes?: number,
    readonly date?: Date
}

export class Question extends Entity<QuestionProps> {
    private constructor(props: QuestionProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: QuestionProps, id?: UniqueEntityID): Result<Question> {
        for (const prop in props) {
            if (props[prop] === null || props[prop] === undefined)
                return Result.fail<Question>(`Must provide ${prop} for the user`);
        }
        props = {
            likes: 0,
            dislikes: 0,
            date: new Date(Date.now()),
            ...props
        }
        return Result.ok<Question>(new Question(props, id));
    }
}